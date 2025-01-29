from django.contrib.auth.models import User
# from API.models import UsersExtended, Dimension, CustomRates, ServiceCategory
import pytz
from datetime import datetime
from datetime import timezone as time
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from django.utils import timezone
from rest_framework import status, pagination
# from .models import CustomUser  # Ensure this import points to wherever your CustomUser model is defined

class CustomJWTAuthentication(JWTAuthentication):
    def get_validated_token(self, raw_token):
        validated_token = super().get_validated_token(raw_token)
        # Get user and check last logout time
        user_id = validated_token['user_id']
        user = User.objects.get(id=user_id)
        if user.extended.last_logout:
            token_iat = timezone.datetime.fromtimestamp(validated_token['iat'], tz=time.utc)
            if token_iat < user.extended.last_logout:
                raise InvalidToken('Invalid Token.')
        return validated_token


def authenticate_clearance_level(user, levels):
    return user.extended.clearance_level in levels

def authenticate_owner(user):
    return user.extended.clearance_level == "Owner"

def authenticate_manager(user):
    return user.extended.clearance_level == "Manager"

def authenticate_client(user):
    return user.extended.clearance_level == "Client"

def authenticate_VA(user):
    return user.extended.clearance_level == "Virtual Assistant"

def authenticate_prep(user):
    return user.extended.clearance_level == "Prep Team"

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

def get_charges(service):
    try:
        obj = CustomRates.objects.get(
            client_id=service.client_id.id,
            service_code=service.service_code.service_code,
            category_id=service.category_id.category_id
        )
        return obj.charges
    except:
        obj = ServiceCategory.objects.get(
            service_code=service.service_code.service_code
        )
        return obj.charges

class UserPagination(pagination.PageNumberPagination):
    page_size = 50
    page_size_query_param = 'page_size'
    max_page_size = 100
