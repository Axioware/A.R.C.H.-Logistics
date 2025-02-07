from django.contrib.auth.models import User
from Users.models import UsersExtended
from Billing.models import  CustomRates
import pytz
from datetime import datetime
from datetime import timezone as time, UTC
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from django.utils import timezone
from rest_framework import status, pagination
from django.contrib.auth.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from django_tenants.utils import schema_context
from django_tenants.models import TenantMixin
from django.core.exceptions import ObjectDoesNotExist
from rest_framework_simplejwt.authentication import JWTAuthentication
from django_tenants.utils import schema_context
from django.contrib.auth import get_user_model
from django.utils import timezone
from jwt.exceptions import InvalidTokenError
from django.core.exceptions import ObjectDoesNotExist
from rest_framework_simplejwt.exceptions import InvalidToken
import time

# User = get_user_model()

# class CustomJWTAuthentication(JWTAuthentication):
#     def get_validated_token(self, raw_token):
#         validated_token = super().get_validated_token(raw_token)

#         # Extract tenant schema from token payload
#         tenant_schema = validated_token.get('schema_name')
#         user_id = validated_token['user_id']

#         if not tenant_schema:
#             raise InvalidToken('Tenant schema is missing from the token.')

#         try:
#             # Switch schema dynamically to the correct tenant
#             with schema_context(tenant_schema):
#                 from Users.models import TenantUser
#                 user = TenantUser.objects.get(id=user_id)

#                 # Check token issued-at (iat) against user's last logout time
#                 if user.extended.last_logout:
#                     token_iat = timezone.datetime.fromtimestamp(validated_token['iat'], tz=timezone.utc)
#                     if token_iat < user.extended.last_logout:
#                         raise InvalidToken('Token is invalid. User has logged out.')

#         except ObjectDoesNotExist:
#             raise InvalidToken('User not found in the specified tenant schema.')
        
#         return validated_token

class CustomJWTAuthentication(JWTAuthentication):
    def get_validated_token(self, raw_token):
        validated_token = super().get_validated_token(raw_token)
        # Get user and check last logout time
        user_id = validated_token['user_id']
        user = User.objects.get(id=user_id)
        if user.extended.last_logout:
            token_iat = timezone.datetime.fromtimestamp(validated_token['iat'], tz=UTC)
            if token_iat < user.extended.last_logout:
                raise InvalidToken('Invalid Token.')
        return validated_token

def make_superuser(username):
    try:
        user = User.objects.get(username=username)
        user.is_superuser = True
        user.save()
        return True
    except User.DoesNotExist:
        return False

def get_extended_field(user, field_name, default=None):
    return getattr(user.extended, field_name, default) if hasattr(user, 'extended') else default


def get_texas_time():
    tz = pytz.timezone('America/Chicago')  # Texas is generally in the 'America/Chicago' timezone
    texas_time = datetime.now(tz)
    return texas_time

# def get_charges(service):
#     try:
#         obj = CustomRates.objects.get(
#             client_id=service.client_id.id,
#             service_code=service.service_code.service_code,
#             category_id=service.category_id.category_id
#         )
#         return obj.charges
#     except:
#         obj = ServiceCategory.objects.get(
#             service_code=service.service_code.service_code
#         )
#         return obj.charges

class UserPagination(pagination.PageNumberPagination):
    page_size = 50
    page_size_query_param = 'page_size'
    max_page_size = 100
    
def authenticate_clearance_level(user, levels):
    return user.extended.clearance_level not in levels