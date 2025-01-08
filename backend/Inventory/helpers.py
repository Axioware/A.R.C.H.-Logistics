from django.contrib.auth.models import User
from Users.models import UsersExtended 
# from Inventory.models import Dimension
import pytz
from datetime import datetime
from rest_framework import pagination

# def dimensions_get(id):
#     dimensions = Dimension.objects.filter(dimension_id=id)
#     lis = []
#     for i in dimensions:
#         d = str(dimensions[i].length) + "X" + str(dimensions[i].width) + str(dimensions[i].height) + str(dimensions[i].weight)
#         lis.append(d)
#     return lis

# def dimensions_add(dimensions):
#     new_dimension = Dimension.objects.order_by('-dimension_id').first() + 1
#     try:
#         for i in dimensions:
#             seperate = i.split('x')
#             # Create a new Dimensions instance and save it to the database
#             new_dimension = Dimension.objects.create(
#                 dimension_id = new_dimension,
#                 length=seperate[0],
#                 width=seperate[1],
#                 height=seperate[2],  # Note the typo in your model field should ideally be corrected to 'height'
#                 weight=seperate[3]
#             )
#         return True
#     except Exception as e:
#         return None
    
class UserPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

def authenticate_client(user):
    try:
        # Check if the user's role is 'Client'
        return user.extended.role == UsersExtended.RoleChoices.CLIENT
    except UsersExtended.DoesNotExist:
        # If the user does not have an extended profile, return False
        return False
    
def authenticate_owner(user):
    try:
        return user.extended.role == UsersExtended.RoleChoices.OWNER
    except UsersExtended.DoesNotExist:
        return False
    
