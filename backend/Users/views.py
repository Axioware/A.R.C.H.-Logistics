from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from .models import *
from rest_framework import status
from .helpers import UserPagination
from django.db.models import Q
from django.db import transaction
from Arch_Logistics.helpers import authenticate_client, authenticate_manager, authenticate_VA, make_superuser, authenticate_prep, get_extended_field
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

# Create your views here.
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def users(request):
    user = request.user
    
    clearance_level = request.query_params.get('clearance_level') 
    
    if authenticate_clearance_level(user, [1, 2]):
        return Response({'errors': "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    if request.method == "GET":
        clearance_level = request.query_params.get('clearance_level')
        billing_type = request.query_params.get('billing_type')
        search = request.query_params.get('search')
        active = request.query_params.get('is_active')
        warehouses = request.query_params.get('warehouses')
        all_data = request.query_params.get('all', 'false').lower() == 'true'

        # Access control
        try:
            queryset = User.objects.all().select_related('extended')

            if clearance_level:
                queryset = queryset.filter(extended__clearance_level=int(clearance_level))
            if billing_type:
                queryset = queryset.filter(extended__billing_type=billing_type)
            if warehouses:
                queryset = queryset.filter(extended__warehouses=warehouses)
            if active:
                queryset = queryset.filter(is_active=bool(active))
            if search:
                queryset = queryset.filter(
                    Q(first_name__icontains=search) | 
                    Q(last_name__icontains=search)
                )

            # Manual data construction
            result = [
                {
                    'id': user.id,
                    'username': user.username,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'email': user.email,
                    'is_active': user.is_active,
                    'tax_id': getattr(user.extended, 'tax_id', None),
                    'phone': getattr(user.extended, 'phone', None),
                    'state': getattr(user.extended, 'state', None),
                    'city': getattr(user.extended, 'city', None),
                    'zip': getattr(user.extended, 'zip', None),
                    'clearance_level': getattr(user.extended, 'clearance_level', None),
                    'email2': getattr(user.extended, 'email2', None),
                    'address': getattr(user.extended, 'address', None),
                    'llc_name': getattr(user.extended, 'llc_name', None),
                    'billing_type': getattr(user.extended, 'billing_type', None),
                    'warehouses': list(getattr(user.extended, 'warehouses', []).values_list('id', flat=True))
                }
                for user in queryset
            ]

            if all_data:
                return Response({"results": result, "count": len(result)}, status=status.HTTP_200_OK)
        
        
            # Pagination
            paginator = UserPagination()
            page = paginator.paginate_queryset(result, request)
            if page is not None:
                return paginator.get_paginated_response(page)
            return Response({'user_data': result}, status=status.HTTP_200_OK)

        except Exception as e:
            # General exception handling
            return Response({"error": str(e), "status": "error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    if request.method == "POST":
        data = request.data
        clearance_level = data.get('clearance_level')

        if authenticate_clearance_level(user, [1, 2]):
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

            

        #------------------------------------------------------------ Validation ---------------------------------------------------------
        errors = {}
        warehouses = data.get('warehouses', [])

        if authenticate_clearance_level(user, 4) and not warehouses:
            errors['warehouses'] = "warehouses are required for clients."    
        
        username = data.get('username', '')
        first_name = data.get('first_name', '')
        last_name = data.get('last_name', '')
        email = data.get('email', '')
        phone = data.get('phone', '')
        llc_name = data.get('llc_name', '')
        tax_id = data.get('tax_id', '')
        email2 = data.get('email2', '')
        password = data.get('password', '')

        if not username:
            errors['username'] = "Username is required.')"
            
        if not password:
            errors['password'] = "password is required." 
        
        if not first_name:
            errors['first_name'] = "First name is required."
            
        if not clearance_level:
            errors['clearance_level'] = "Clearance level is required."
        
        if email:
            try:
                validate_email(email)
            except ValidationError:
                errors['email'] = "Invalid email format."
        
        if phone and (not phone.isdigit() or not (6 <= len(phone) <= 15)):
            errors['phone'] = "Phone number must be between 6 and 15 digits."
        # LLC name validation: non-empty
        if authenticate_clearance_level(user, [4]) and not llc_name:
            errors['llc_name'] = "LLC name is required."
        
        if data.get('zip', ''):
            if not data.get('zip', '').isdigit() or len(data.get('zip', '')) > 5:
                errors['zip'] = "ZIP must be atleast 5 digits long."
        # Tax ID validation: specific format or length checks as required
        if tax_id:
            if not tax_id.isdigit() or len(tax_id) < 8:
                errors['tax_id'] = "Tax ID must be 8 digits long."
        elif clearance_level == 4:
            errors['tax_id'] = "Tax ID is required."
        # Secondary email validation
        if email2:
            try:
                validate_email(email2)
            except ValidationError:
                errors['email2'] = "Invalid secondary email format."
        if errors:
            return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)
            
        #------------------------------------------------------------ Validation ---------------------------------------------------------

        try:
            with transaction.atomic():
                new_user = User.objects.create_user(
                    username=username,
                    first_name=first_name,
                    last_name=last_name,
                    email=email,
                    password=password
                )
                new_user.set_password(password)  # Properly handle password setting
                new_user.save()
                target_extended = new_user.extended
                if clearance_level != None:
                    if authenticate_clearance_level(user, [1]):
                        make_superuser(username)
                # Create UsersExtended
                extended = new_user.extended
                extended.phone = phone
                extended.clearance_level = clearance_level
                extended.tax_id = tax_id
                extended.email2 = email2
                extended.llc_name = llc_name
                extended.address = data.get('address', '')
                extended.city = data.get('city', '')
                extended.state = data.get('state', '')
                extended.zip = data.get('zip', '')
                extended.billing_type = data.get('billing_type', UsersExtended.BillingTypeChoices.MONTHLY)
                # target_extended.clearance_level = ClearanceLevel.objects.get(id=clearance_level)
                if warehouses:
                    target_extended.warehouses.set(warehouses)
                target_extended.save()
                return Response({"success": "New user created successfully"}, status=status.HTTP_201_CREATED)
            # If anything goes wrong in the transaction block, this will be executed
            return Response({"error": "Failed to create user"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response({"error": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticated])
def user_by_id(request, id):
    user = request.user

    if request.method == "GET":
        try:
            main_user = User.objects.get(id=id)
            target_user = UsersExtended.objects.get(id=id)
        except UsersExtended.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        if user.extended.role not in ['Owner', 'Manager', 'Virtual Assistants']:
            return Response({"error": "Unauthorized - Insufficient permissions"}, status=status.HTTP_403_FORBIDDEN)
        
        
        
        user_data = {
            'id': main_user.id,
            'username': main_user.username,
            'first_name': main_user.first_name,
            'last_name': main_user.last_name,
            'email': main_user.email,
            'is_active': main_user.is_active,
            'tax_id': get_extended_field(main_user, 'tax_id'),
            'address': get_extended_field(main_user, 'address'),
            'llc_name': get_extended_field(main_user, 'llc_name'),
            'billing_type': get_extended_field(main_user, 'billing_type'),
            'role': get_extended_field(main_user, 'role'),
            'email2': get_extended_field(main_user, 'email2'),
            'city': get_extended_field(main_user, 'city'),
            'state': get_extended_field(main_user, 'state'),
            'zip': get_extended_field(main_user, 'zip'),
            'phone': get_extended_field(main_user, 'phone'),
            'warehouses': get_extended_field(main_user, 'warehouses')
        }

        return Response({'user_data': user_data}, status=status.HTTP_200_OK)
    
    elif request.method == "PUT":
        data = request.data
        role = data.get('role')

        if authenticate_VA(user) and (role == "Owner" or role == "Manager"):
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        if authenticate_manager(user) and role == "Owner":
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        if authenticate_client(user):
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        if authenticate_prep(user):
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
            

        #------------------------------------------------------------ Validation ---------------------------------------------------------
        errors = {}

        first_name = data.get('first_name', '')
        last_name = data.get('last_name', '')
        email = data.get('email', '')
        phone = data.get('phone', '')
        llc_name = data.get('llc_name', '')
        tax_id = data.get('tax_id', '')
        email2 = data.get('email2', '')
        is_active = data.get('is_active', '')
        
        
        if not is_active:
            errors['is_active'] = "is_active is required.')"
        
        if not first_name:
            errors['first_name'] = "First name is required."
        # if not last_name:
        #     errors['last_name'] = "Last name is required."
        
        if email:
            try:
                validate_email(email)
            except ValidationError:
                errors['email'] = "Invalid email format."
        # Phone number validation: basic length check
        if phone and not phone.isdigit():
            errors['phone'] = "Phone number must contain only digits."
        elif len(phone) > 15 or len(phone) < 8:
            errors['phone'] = "Phone number must be between 15 and 8 digits long."
        if role == "Client" and not llc_name:
            errors['llc_name'] = "LLC name is required."
        if not data.get('zip', '').isdigit() or len(data.get('zip', '')) != 5:
            errors['zip'] = "ZIP must be exactly 5 digits long."
        if tax_id:
            if not (len(tax_id) > 5 and len(tax_id) < 20):
                errors['tax_id'] = "Tax ID must be greater than 5, and less than 20 digits long."
        elif role == "Client":    
            errors['tax_id'] = "Tax ID is required."
        # Secondary email validation
        if email2:
            try:
                validate_email(email2)
            except ValidationError:
                errors['email2'] = "Invalid secondary email format."
        if errors:
            return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

        #------------------------------------------------------------ Validation ---------------------------------------------------------


        try:
            target_user = User.objects.get(pk=id)
            target_extended = target_user.extended
            target_extended.warehouses = data.get('warehouses', target_extended.warehouses)
            if data.get('password'):
                target_user.set_password(data.get('password'))
            # Data from request

            # Update core user fields
            with transaction.atomic():

                # target_user.username = data.get('username', target_user.username)
                target_user.first_name = data.get('first_name', target_user.first_name)
                target_user.last_name = data.get('last_name', target_user.last_name)
                target_user.email = data.get('email', target_user.email)
                target_user.is_active = data.get('is_active', target_user.is_active)
                # target_user.password = data.get('password', target_user.password)
                target_user.save()

                # Update extended fields
                if data.get('address') is not None:
                    target_extended.address = data.get('address')
                if llc_name is not None:
                    target_extended.llc_name = llc_name
                if data.get('billing_type') is not None:
                    target_extended.billing_type = data.get('billing_type')
                if data.get('phone') is not None:
                    target_extended.phone = data.get('phone')
                if data.get('city') is not None:
                    target_extended.city = data.get('city')
                if data.get('state') is not None:
                    target_extended.state = data.get('state')
                if data.get('zip') is not None:
                    target_extended.zip = data.get('zip')
                if data.get('tax_id') is not None:
                    target_extended.tax_id = data.get('tax_id')
                if data.get('email2') is not None:
                    target_extended.email2 = data.get('email2')
                if data.get('warehouses') is not None:
                    target_extended.warehouses = data.get('warehouses')
                return Response({"success": "User updated successfully"}, status=status.HTTP_202_ACCEPTED)
            return Response({"error": "failed"}, status=status.HTTP_400_BAD_REQUEST)

        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    if request.method == "DELETE":
        data = request.data
        role = data.get('role')

        if authenticate_VA(user) and (role == "Owner" or role == "Manager"):
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        if authenticate_manager(user) and role == "Owner":
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        if authenticate_client(user):
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        if authenticate_prep(user):
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            target_user = User.objects.get(id=id)
            target_user.delete()
            return Response({'success': "user deleted"}, status=status.HTTP_200_OK)
        except UsersExtended.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reset_password(request):
    user = request.user
    data = request.data

    current_password = data.get('current_password')
    new_password = data.get('new_password')

    # Validate input
    if not current_password or not new_password:
        return Response({"error": "Both current and new passwords are required."}, status=status.HTTP_400_BAD_REQUEST)

    # Verify current password
    if not user.check_password(current_password):
        return Response({"error": "Current password is incorrect."}, status=status.HTTP_400_BAD_REQUEST)

    # Set the new password
    try:
        user.set_password(new_password)
        user.save()
        return Response({"success": "Password has been updated successfully."}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)