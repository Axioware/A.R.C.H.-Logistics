from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework_simplejwt.exceptions import TokenError
from Users.models import UsersExtended
from django.contrib.auth import get_user_model
from django.contrib.auth import logout as django_logout
from .models import OTP
from django_tenants.utils import schema_context


# Create your views here.

@api_view(['POST'])
def send_otp(request):
    with schema_context(request.tenant):

        email = request.data.get('email')

        # Get user model dynamically
        User = get_user_model()
        user = User.objects.filter(email=email).first()

        if user is None:
            user = UsersExtended.objects.filter(email2=email).first()

        if user is None:
            return Response({"error": "User with this email does not exist."}, status=400)

        # Generate OTP and expiration
        otp_code = OTP.generate_otp()[:5]
        expires_at = timezone.now() + timedelta(minutes=10)

        # Save OTP to database
        OTP.objects.create(user=user, otp=otp_code, expires_at=expires_at)

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

        try:
            user = User.objects.get(email=email)
            otp = OTP.objects.filter(user=user, otp=otp_code).latest('created_at')
        except (User.DoesNotExist, OTP.DoesNotExist):
            return Response({"error": "Invalid OTP or user."}, status=400)

        if otp.is_expired():
            return Response({"error": "OTP has expired."}, status=400)

        # Create JWT tokens
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        return Response({
            "access": access_token,
            "refresh": refresh_token
        }, status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    with schema_context(request.tenant):

        try:
            # Store logout timestamp
            request.user.extended.last_logout = timezone.now()
            request.user.extended.save()

            # Get refresh token from request
            refresh_token = request.data.get('refresh_token')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()  # Blacklist the refresh token
            else:
                return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)

        except TokenError:
            return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)

    # Log the user out from Django session
        django_logout(request)

        return Response({"message": "Logged out successfully"}, status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    with schema_context(request.tenant):
        password = request.data.get('password')
    
        if not password:
            return Response({"error": "Password is required"}, status=status.HTTP_400_BAD_REQUEST)
    
        # Update the user's password securely
        user = request.user
        user.set_password(password)
        user.save()
    
        # Blacklist the user's refresh token
        refresh_token = request.data.get("refresh_token")
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()  # Blacklist token to invalidate it
            except TokenError:
                return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)
    
        # Log out the user from Django session
        django_logout(request)
    
        return Response({"message": "Password updated successfully and user logged out"}, status=status.HTTP_200_OK)


# from django_tenants.utils import schema_context
# from django.contrib.auth import authenticate
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework import status
# from django.views.decorators.csrf import csrf_exempt


# @csrf_exempt
# def check_user_in_testing(request):
#     if request.method == 'POST':
#         username = request.POST.get('username') or request.GET.get('username')
#         password = request.POST.get('password') or request.GET.get('password')

#         print(username, password)
#         if not username or not password:
#             return JsonResponse({'error': 'Username and password are required.'}, status=400)

#         try:
#             with schema_context('testing'):
#                 a = TenantUser.objects.get(username=username)
#                 print(a)
#                 user = authenticate(request, username=username, password=password)
#                 if user is not None:
#                     return JsonResponse({'exists': True, 'message': 'User authenticated successfully.'})
#                 else:
#                     return JsonResponse({'exists': False, 'message': 'Invalid credentials or user not found.'})
#         except Exception as e:
#             return JsonResponse({'error': str(e)}, status=500)
#     return JsonResponse({'error': 'Invalid request method'}, status=405)