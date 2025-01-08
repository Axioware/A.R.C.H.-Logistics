from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse, HttpResponse
from django.core.serializers import serialize
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth.models import User
from API.models import *
from rest_framework import status, pagination
from django.contrib.auth.hashers import make_password
from django.conf import settings
from django.db.models import Q, Sum, F
from django.db import transaction
from Prep_Prime.helpers import authenticate_client, authenticate_manager, authenticate_owner, authenticate_VA, make_superuser, authenticate_prep
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.utils.dateparse import parse_datetime
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django_tenants.utils import schema_context



# Create your views here.

@api_view(['POST'])
def send_otp(request):
    email = request.data.get('email')
    
    user = settings.AUTH_USER_MODEL.objects.filter(email=email).first()
    if user == None:
        user = UsersExtended.objects.filter(email2=email).first()
    
    if user == None:
        return Response({"error": "User with this email does not exist."}, status=400)

    # Generate OTP and its expiration
    otp_code = OTP.generate_otp()[:5]
    expires_at = timezone.now() + timedelta(minutes=10)

    # Save OTP to database
    OTP.objects.create(user=user, otp=otp_code, expires_at=expires_at)

    # Send OTP via email
    send_mail(
        'Your OTP Code',
        f'Your OTP code is: {otp_code}',
        'prepprime@logistics.com',
        [email],
        fail_silently=False,
    )

    return Response({"message": "OTP sent to email."}, status=200)


@api_view(['POST'])
def verify_otp(request):
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
    try:
        request.user.extended.last_logout = timezone.now()
        request.user.extended.save()
        refresh_token = request.data.get('refresh')
        token = RefreshToken(refresh_token)
        token.blacklist()
    except TokenError as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"message": "Logged out successfully"}, status=status.HTTP_204_NO_CONTENT)

@api_view(['POST']) #TODO TEST
@permission_classes([IsAuthenticated])
def change_password(request):
    password = request.data.get('password')
    if not password:
        return Response({"error": "Password is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Updating the password
        request.user.password = make_password(password)
        request.user.save()
        
        logout(request)

        return Response({"message": "Password updated"}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    


from django_tenants.utils import schema_context
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def check_user_in_testing(request):
    if request.method == 'POST':
        username = request.POST.get('username') or request.GET.get('username')
        password = request.POST.get('password') or request.GET.get('password')

        print(username, password)
        if not username or not password:
            return JsonResponse({'error': 'Username and password are required.'}, status=400)

        try:
            with schema_context('testing'):
                a = TenantUser.objects.get(username=username)
                print(a)
                user = authenticate(request, username=username, password=password)
                if user is not None:
                    return JsonResponse({'exists': True, 'message': 'User authenticated successfully.'})
                else:
                    return JsonResponse({'exists': False, 'message': 'Invalid credentials or user not found.'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)