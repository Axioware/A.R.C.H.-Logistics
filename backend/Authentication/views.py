from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth import get_user_model, logout as django_logout
from rest_framework import status
from rest_framework_simplejwt.exceptions import TokenError
from django_tenants.utils import schema_context
from django.core.cache import cache
from .models import OTP

# Generate cache keys
OTP_CACHE_KEY = "otp_{email}"
USER_CACHE_KEY = "user_{email}"
FAILED_ATTEMPTS_KEY = "failed_attempts_{email}"

@api_view(['POST'])
def send_otp(request):
    with schema_context(request.tenant):
        email = request.data.get('email')
        User = get_user_model()
        user = User.objects.filter(email=email).first()
        
        if user is None:
            return Response({"error": "User with this email does not exist."}, status=400)

        # Check if OTP is already cached
        cached_otp = cache.get(OTP_CACHE_KEY.format(email=email))
        if cached_otp:
            return Response({"message": "OTP has already been sent. Please wait before requesting a new one."}, status=429)
        
        # Generate OTP and cache it in Redis
        otp_code = OTP.generate_otp()[:5]
        cache.set(OTP_CACHE_KEY.format(email=email), otp_code, timeout=600)

        # Send OTP via email
        send_mail(
            'Your OTP Code',
            f'Your OTP code is: {otp_code}',
            'ulhaqhassan2@gmail.com',
            [email],
            fail_silently=False,
        )
        return Response({"message": "OTP sent to email."}, status=200)

@api_view(['POST'])
def verify_otp(request):
    with schema_context(request.tenant):
        email = request.data.get('email')
        otp_code = request.data.get('otp')

        # Get OTP from cache
        cached_otp = cache.get(OTP_CACHE_KEY.format(email=email))
        if cached_otp is None or cached_otp != otp_code:
            return Response({"error": "Invalid or expired OTP."}, status=400)

        # Remove OTP from cache after successful verification
        cache.delete(OTP_CACHE_KEY.format(email=email))
        
        # Retrieve user and generate tokens
        user = get_user_model().objects.get(email=email)
        refresh = RefreshToken.for_user(user)
        return Response({"access": str(refresh.access_token), "refresh": str(refresh)}, status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    with schema_context(request.tenant):
        try:
            request.user.extended.last_logout = timezone.now()
            request.user.extended.save()
            
            refresh_token = request.data.get('refresh_token')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            else:
                return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)
        except TokenError:
            return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Remove user cache
        cache.delete(USER_CACHE_KEY.format(email=request.user.email))
        
        django_logout(request)
        return Response({"message": "Logged out successfully"}, status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    with schema_context(request.tenant):
        password = request.data.get('password')
        if not password:
            return Response({"error": "Password is required"}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user
        user.set_password(password)
        user.save()

        refresh_token = request.data.get("refresh_token")
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except TokenError:
                return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Remove user cache after password change
        cache.delete(USER_CACHE_KEY.format(email=user.email))
        django_logout(request)

        return Response({"message": "Password updated successfully and user logged out"}, status=status.HTTP_200_OK)
