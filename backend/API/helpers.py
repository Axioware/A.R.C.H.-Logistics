# from django.contrib.auth.models import User
# from .models import UsersExtended, Dimension
# import pytz
# from datetime import datetime

# def update_user(username, phone, email2, role, tax_id, address, billing_type, llc_name, state, city, zip):
#     try:
#         user = User.objects.get(username=username)
#         user_extended, created = UsersExtended.objects.get_or_create(username=user)

#         user_extended.phone = phone
#         user_extended.email2 = email2
#         user_extended.role = role
#         user_extended.tax_id = tax_id
#         user_extended.address = address
#         user_extended.billing_type = billing_type
#         user_extended.llc_name = llc_name
#         user_extended.state = state
#         user_extended.city = city
#         user_extended.zip = zip

#         user_extended.save()

#     except User.DoesNotExist:
#         return 404; #code for user not found
#     except Exception as e:
#         # General error handling
#         return 500

#     return 200

# def authenticate_owner(user):
#     return user.extended.role == "Owner"

# def authenticate_manager(user):
#     return user.extended.role == "Manager"

# def authenticate_client(user):
#     return user.extended.role == "Client"

# def authenticate_VA(user):
#     return user.extended.role == "Virtual Assistant"

# def authenticate_prep(user):
#     return user.extended.role == "Prep Team"

# def make_superuser(username):
#     try:
#         user = User.objects.get(username=username)
#         user.is_superuser = True
#         user.save()
#         return True
#     except User.DoesNotExist:
#         return False

# def get_extended_field(user, field_name, default=None):
#     return getattr(user.extended, field_name, default) if hasattr(user, 'extended') else default


# def get_texas_time():
#     tz = pytz.timezone('America/Chicago')  # Texas is generally in the 'America/Chicago' timezone
#     texas_time = datetime.now(tz)
#     return texas_time

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