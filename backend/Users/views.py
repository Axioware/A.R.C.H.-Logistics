from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from .models import *
from rest_framework import status
from .helpers import UserPagination
from django.db.models import Q
from django.db import transaction, OperationalError
from Arch_Logistics.helpers import get_extended_field, authenticate_clearance_level
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django_tenants.utils import schema_context
from django.core.cache import cache

import json

# Create your views here.
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def users(request):
    user = request.user
    tenant = request.tenant

    if authenticate_clearance_level(user, [1, 2]):
        return Response({'errors': "Unauthorized - Insufficient clearance level"}, status=status.HTTP_403_FORBIDDEN)

    with schema_context(tenant.schema_name):
        if request.method == "GET":
            # Generate a cache key based on request parameters
            print('1234', request.query_params.urlencode()) 
            cache_key = f"users_{request.query_params.urlencode()}"

            cached_data = cache.get(cache_key)

            if cached_data:
                print('c', cached_data)
                return Response(cached_data, status=status.HTTP_200_OK)

            clearance_level = request.query_params.get('clearance_level')
            billing_type = request.query_params.get('billing_type')
            search = request.query_params.get('search')
            active = request.query_params.get('is_active')
            warehouses = request.query_params.get('warehouses')
            all_data = request.query_params.get('all', 'false').lower() == 'true'

            if clearance_level:
                try:
                    clearance_level = int(clearance_level)
                    if clearance_level not in [1, 2, 3, 4]:
                        return Response({"error": "Invalid clearance level"}, status=status.HTTP_400_BAD_REQUEST)
                except ValueError:
                    return Response({"error": "Clearance level must be an integer"}, status=status.HTTP_400_BAD_REQUEST)

            try:
                queryset = User.objects.all().select_related('extended')
                if clearance_level:
                    queryset = queryset.filter(extended__clearance_level=int(clearance_level))
                if billing_type:
                    queryset = queryset.filter(extended__billing_type=billing_type)
                if warehouses:
                    queryset = queryset.filter(extended__warehouses__id=warehouses)
                if active:
                    queryset = queryset.filter(is_active=bool(active))
                if search:
                    queryset = queryset.filter(
                        Q(first_name__icontains=search) | 
                        Q(last_name__icontains=search)
                    )

                if not queryset.exists():
                    return Response({"error": "No users found matching the criteria"}, status=status.HTTP_404_NOT_FOUND)

                # Convert queryset to a list for JSON serialization
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
                        'last_logout': getattr(user.extended, 'last_logout', None),
                        'date_created': getattr(user.extended, 'date_created', None),
                        'email2': getattr(user.extended, 'email2', None),
                        'address': getattr(user.extended, 'address', None),
                        'llc_name': getattr(user.extended, 'llc_name', None),
                        'billing_type': getattr(user.extended, 'billing_type', None),
                        'warehouses': list(getattr(user.extended, 'warehouses', []).values_list('warehouse_id', flat=True))
                    }
                    for user in queryset
                ]

                if all_data:
                    response_data = {"results": result, "count": len(result)}
                    cache.set(cache_key, response_data, timeout=120)  # Cache for 60 seconds
                    return Response(response_data, status=status.HTTP_200_OK)

                # Apply Pagination
                paginator = UserPagination()
                page = paginator.paginate_queryset(result, request)
                if page is not None:
                    response_data = paginator.get_paginated_response(page).data
                    cache.set(cache_key, response_data, timeout=120)  # Cache paginated data
                    return Response(response_data, status=status.HTTP_200_OK)

                response_data = {'user_data': result}
                cache.set(cache_key, response_data, timeout=120)  # Cache response
                return Response(response_data, status=status.HTTP_200_OK)

            except OperationalError as e:
                return Response({"error": "Database connection error", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except Exception as e:
                return Response({"error": "An unexpected error occurred", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if request.method == "POST":
            # Invalidate the cache when a new user is created
            cache.clear()
            
            data = request.data
            clearance_level = data.get('clearance_level')

            if authenticate_clearance_level(user, [1, 2]):
                return Response({'errors': "Unauthorized - Insufficient clearance level"}, status=status.HTTP_403_FORBIDDEN)

            errors = {}
            warehouses = data.get('warehouses', [])

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
                errors['username'] = "Username is required."
            else:
                if User.objects.filter(username=username).exists():
                    errors['username'] = "Username already exists."

            if not password:
                errors['password'] = "Password is required." 

            if not first_name:
                errors['first_name'] = "First name is required."

            if not clearance_level:
                errors['clearance_level'] = "Clearance level is required."

            if email:
                try:
                    validate_email(email)
                except ValidationError:
                    errors['email'] = "Invalid email format."

            if errors:
                print(errors)
                return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

            try:
                with transaction.atomic():
                    new_user = User.objects.create_user(
                        username=username,
                        first_name=first_name,
                        last_name=last_name,
                        email=email,
                        password=password
                    )
                    new_user.set_password(password)
                    new_user.save()

                    extended = new_user.extended
                    extended.phone = phone
                    extended.clearance_level = clearance_level
                    extended.tax_id = tax_id
                    extended.email2 = email2
                    extended.llc_name = llc_name
                    extended.date_created = timezone.now()
                    extended.last_logout = None
                    extended.address = data.get('address', '')
                    extended.city = data.get('city', '')
                    extended.state = data.get('state', '')
                    extended.zip = data.get('zip', '')
                    extended.billing_type = data.get('billing_type', UsersExtended.BillingTypeChoices.MONTHLY)
                    if warehouses:
                        extended.warehouses.set(Warehouse.objects.filter(warehouse_id__in=warehouses))
                    extended.save()

                    return Response({"success": "New user created successfully"}, status=status.HTTP_201_CREATED)

            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticated])
def user_by_id(request, id):
    user = request.user
    tenant = request.tenant
    cache_key = f"user_{tenant.schema_name}_{id}"  # Unique cache key for each tenant-user combo

    with schema_context(tenant.schema_name):
        if request.method == "GET":
            
            cached_user = cache.get(cache_key)
            if cached_user:
                return Response({'user_data': cached_user}, status=status.HTTP_200_OK)

            try:
                main_user = User.objects.get(id=id)
                # target_user = UsersExtended.objects.get(username=main_user.username)
                # print("fsdklfjsdlfjsdl")
            except (UsersExtended.DoesNotExist, User.DoesNotExist):
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

            if authenticate_clearance_level(user, [1, 2, 3]):
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
                'clearance_level': get_extended_field(main_user, 'clearance_level'),
                'last_logout': get_extended_field(main_user, 'last_logout'),
                'date_created': get_extended_field(main_user, 'date_created'),
                'email2': get_extended_field(main_user, 'email2'),
                'city': get_extended_field(main_user, 'city'),
                'state': get_extended_field(main_user, 'state'),
                'zip': get_extended_field(main_user, 'zip'),
                'phone': get_extended_field(main_user, 'phone'),
                'warehouses': list(main_user.extended.warehouses.all().values_list('warehouse_id', flat=True))

            }

            cache.set(cache_key, user_data, timeout=600)

            return Response({'user_data': user_data}, status=status.HTTP_200_OK)
    
        elif request.method == "PUT":
            data = request.data

            # Authorization checks based on clearance_level and tenant context
            if authenticate_clearance_level(user, [1, 2]):
                return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

            #------------------------------------------------------------ Validation ---------------------------------------------------------
            errors = {}

            first_name = data.get('first_name', '')
            email = data.get('email', '')
            phone = data.get('phone', '')
            llc_name = data.get('llc_name', '')
            tax_id = data.get('tax_id', '')
            email2 = data.get('email2', '')
        
            if not first_name:
                errors['first_name'] = "First name is required."

            if email:
                try:
                    validate_email(email)
                except ValidationError:
                    errors['email'] = "Invalid email format."

            if phone and not phone.isdigit():
                errors['phone'] = "Phone number must contain only digits."

            if authenticate_clearance_level(user, [1, 2, 3]) and not llc_name:
                errors['llc_name'] = "LLC name is required."

            if not data.get('zip', '').isdigit():
                errors['zip'] = "ZIP must be digits"

            if not tax_id and  authenticate_clearance_level(user, [1, 2, 3]):
                errors['tax_id'] = "Tax ID is required."

            if email2:
                try:
                    validate_email(email2)
                except ValidationError:
                    errors['email2'] = "Invalid secondary email format."

            if errors:
                return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

            #------------------------------------------------------------ Validation ---------------------------------------------------------

            try:
                target_user = User.objects.get(id=id)  # Ensure tenant-specific query
                target_extended = target_user.extended

                # Update user and extended fields
                with transaction.atomic():
                    target_user.first_name = data.get('first_name', target_user.first_name)
                    target_user.last_name = data.get('last_name', target_user.last_name)
                    target_user.email = data.get('email', target_user.email)
                    target_user.is_active = data.get('is_active', target_user.is_active)

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
                        target_extended.warehouses.set(data.get('warehouses'))

                    # Save changes
                    target_user.save()
                    target_extended.save()
                    
                    cache.delete(cache_key)

                    return Response({"success": "User updated successfully"}, status=status.HTTP_202_ACCEPTED)
        
            except User.DoesNotExist:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        elif request.method == "DELETE":
            data = request.data

            # Authorization checks based on clearance_level and tenant context
            if authenticate_clearance_level(user, [1, 2, 3]):
                return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

            try:
                target_user = User.objects.get(id=id)
                target_user.delete()
                
                cache.delete(cache_key)
                
                return Response({'success': "User deleted"}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
