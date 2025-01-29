from rest_framework import status, pagination
from django.contrib.auth.models import User
from Users.models import UsersExtended
# Dimension
import pytz
from datetime import datetime


def update_user(username, phone, email2, role, tax_id, address, billing_type, llc_name, state, city, zip):
    try:
        user = User.objects.get(username=username)
        user_extended, created = UsersExtended.objects.get_or_create(username=user)

        user_extended.phone = phone
        user_extended.email2 = email2
        user_extended.role = role
        user_extended.tax_id = tax_id
        user_extended.address = address
        user_extended.billing_type = billing_type
        user_extended.llc_name = llc_name
        user_extended.state = state
        user_extended.city = city
        user_extended.zip = zip

        user_extended.save()

    except User.DoesNotExist:
        return 404; #code for user not found
    except Exception as e:
        # General error handling
        return 500
    
class UserPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

# def get_extended_field(user, field_name):
#     """
#     Helper function to get a field from the user's extended profile safely.
#     Returns None if the extended profile or field is not available.
#     """
#     if hasattr(user, 'extended') and getattr(user.extended, field_name, None) is not None:
#         return getattr(user.extended, field_name)
#     return None
def authenticate_clearance_level(user, levels):
    return user.extended.clearance_level in levels