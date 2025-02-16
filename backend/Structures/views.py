from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import *
from Arch_Logistics.helpers import *
from django.db import OperationalError, transaction
from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt
from django.core.cache import cache
from django.conf import settings


@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def locations(request):
    user = request.user
    tenant = request.tenant

    if authenticate_clearance_level(user, [1, 2]):
        return Response({'errors': "Unauthorized - Insufficient clearance level"}, status=status.HTTP_403_FORBIDDEN)

    with schema_context(tenant.schema_name):
        if request.method == "GET":
            # Generate a cache key based on request parameters
            cache_key = f"locations_{request.query_params.urlencode()}"
            cached_data = cache.get(cache_key)

            if cached_data:
                return Response(cached_data, status=status.HTTP_200_OK)

            location_type = request.query_params.get('location_type')
            warehouse_id = request.query_params.get('warehouse_id')
            search = request.query_params.get('search')
            all_data = request.query_params.get('all', 'false').lower() == 'true'

            try:
                queryset = Locations.objects.all()
                if location_type:
                    queryset = queryset.filter(location_type=location_type)
                if warehouse_id:
                    queryset = queryset.filter(warehouse_id=warehouse_id)
                if search:
                    queryset = queryset.filter(Q(location_name__icontains=search))

                if not queryset.exists():
                    return Response({"error": "No locations found matching the criteria"}, status=status.HTTP_404_NOT_FOUND)

                result = [
                    {
                        'location_id': loc.location_id,
                        'location_type': loc.location_type,
                        'location_name': loc.location_name,
                        'warehouse_id': loc.warehouse_id.id,
                    }
                    for loc in queryset
                ]

                if all_data:
                    response_data = {"results": result, "count": len(result)}
                    cache.set(cache_key, response_data, timeout=settings.CACHE_TIMEOUT_MID)
                    return Response(response_data, status=status.HTTP_200_OK)

                # Apply Pagination
                paginator = UserPagination()
                page = paginator.paginate_queryset(result, request)
                if page is not None:
                    response_data = paginator.get_paginated_response(page).data
                    cache.set(cache_key, response_data, timeout=settings.CACHE_TIMEOUT_SHORT)
                    return Response(response_data, status=status.HTTP_200_OK)

                response_data = {'locations': result}
                cache.set(cache_key, response_data, timeout=settings.CACHE_TIMEOUT_SHORT)
                return Response(response_data, status=status.HTTP_200_OK)

            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        elif request.method == "POST":
            location_name = request.data.get('location_name')
            location_type = request.data.get('location_type')
            warehouse_id = request.data.get('warehouse_id')

            errors = {}
            if not location_name:
                errors['location_name'] = 'This field is required.'
            if location_type not in ['Bin', 'Other']:
                errors['location_type'] = 'Invalid location type. Must be "Bin" or "Other".'
            if not warehouse_id:
                errors['warehouse_id'] = 'This field is required.'
            else:
                try:
                    warehouse = Warehouse.objects.get(id=warehouse_id)
                except Warehouse.DoesNotExist:
                    errors['warehouse_id'] = 'Warehouse not found.'

            if errors:
                return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

            # Create new location
            new_location = Locations(
                location_name=location_name,
                location_type=location_type,
                warehouse_id=warehouse
            )
            new_location.save()

            # Clear cache after inserting new location
            cache.delete_pattern("locations_*")

            return Response(
                {'message': 'Location created successfully', 'location_id': new_location.location_id},
                status=status.HTTP_201_CREATED
            )

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def single_location(request, location_id):
    user = request.user
    tenant = request.tenant

    if authenticate_clearance_level(user, [1, 2]):
        return Response({'errors': "Unauthorized - Insufficient clearance level"}, status=status.HTTP_403_FORBIDDEN)

    try:
        with schema_context(tenant.schema_name):

            if request.method == 'GET':

                # Fetch the Location by ID
                location = Locations.objects.get(pk=location_id)

                location_data = {
                    'location_id': location.location_id,
                    'location_name': location.location_name,
                    'location_type': location.location_type,
                    'warehouse_id': location.warehouse_id.id  # Foreign key serialization
                }

                return Response(location_data, status=status.HTTP_200_OK)

            elif request.method == 'PUT':
                # Fetch the Location by ID
                location = Locations.objects.get(pk=location_id)

                location_name = request.data.get('location_name')
                location_type = request.data.get('location_type')

                errors = {}

                if not location_name:
                    errors['location_name'] = 'This field is required.'
                if location_type and location_type not in ['Bin', 'Other']:
                    errors['location_type'] = 'Invalid location type. Must be "Bin" or "Other".'

                if errors:
                    return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

                # Update fields
                location.location_name = location_name
                if location_type:
                    location.location_type = location_type

                location.save()

                # Invalidate cache after update

                return Response({'message': 'Location updated successfully'}, status=status.HTTP_200_OK)

            elif request.method == 'DELETE':
                # Fetch the Location by ID
                location = Locations.objects.get(pk=location_id)

                if location.warehouse_id:
                    # Check if any user is assigned to this location
                    if location.users.exists():  # If users are assigned
                        return Response({"error": "Location cannot be deleted while users are assigned to it."}, status=status.HTTP_400_BAD_REQUEST)

                # Delete the Location
                location.delete()

                return Response({'message': 'Location deleted successfully'}, status=status.HTTP_200_OK)

    except Locations.DoesNotExist:
        return Response({'error': 'Location not found'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def services(request):
    """API for retrieving and creating services"""
    tenant = request.tenant

    try:
        with schema_context(tenant.schema_name):
            if request.method == 'GET':
                service_category = request.GET.get('service_category')  # Get category from request
                all_data = request.query_params.get('all', 'false').lower() == 'true'
                cache_key = f"services_{request.query_params.urlencode()}"
                cached_services = cache.get(cache_key)

                if cached_services:
                    return Response(cached_services, status=status.HTTP_200_OK)
                
            

                # Filtering by service_category if provided
                services_list = Services.objects.values('service_id', 'service_name', 'service_charge')
                if service_category:
                    services_list = services_list.filter(service_category=service_category)

                if all_data:
                    response_data = {"results": services_list, "count": len(services_list)}
                    cache.set(cache_key, response_data, timeout=settings.CACHE_TIMEOUT_LONG)
                    return Response(response_data, status=status.HTTP_200_OK)

                paginator = UserPagination()
                result_page = paginator.paginate_queryset(services_list, request)

                response_data = paginator.get_paginated_response(result_page).data

                cache.set(cache_key, response_data, timeout=settings.CACHE_TIMEOUT_SHORT)
                return Response(response_data, status=status.HTTP_200_OK)

            elif request.method == 'POST':
                if authenticate_clearance_level(request.user, [1, 2]):
                    return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

                data = request.data
                service_name = data.get('service_name')
                service_charge = data.get('service_charge', 0.0)
                service_category = data.get('service_category', 'FBA')

                if not service_name:
                    return Response({"error": "Service name is required"}, status=status.HTTP_400_BAD_REQUEST)

                new_service = Services.objects.create(service_name=service_name, service_charge=service_charge, service_category=service_category)

                # Invalidate all cached pages
                for key in cache.keys("services_*"):
                    cache.delete(key)

                return Response({"message": "Service created", "service_id": new_service.service_id}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def single_service(request, service_id):
    """API for retrieving, updating, and deleting a single service"""
    tenant = request.tenant

    try:
        with schema_context(tenant.schema_name):
            # Check if service exists
            try:
                service = Services.objects.get(service_id=service_id)
            except Services.DoesNotExist:
                return Response({"error": "Service not found"}, status=status.HTTP_404_NOT_FOUND)

            if request.method == 'GET':

                # Retrieve service details
                service_data = {
                    "service_id": service.service_id,
                    "service_name": service.service_name,
                    "service_charge": service.service_charge,
                    "service_category": service.service_category,
                }

                return Response(service_data, status=status.HTTP_200_OK)

            elif request.method == 'PUT':
                # Ensure user has the required permissions
                if authenticate_clearance_level(request.user, [1, 2]):
                    return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

                data = request.data
                service.service_name = data.get("service_name", service.service_name)
                service.service_charge = data.get("service_charge", service.service_charge)
                service.service_category = data.get("service_category", service.service_category)
                service.save()

                # Invalidate cached data
                cache.delete(f"service_{service_id}")
                for key in cache.keys("services_*"):
                    cache.delete(key)

                return Response({"message": "Service updated successfully"}, status=status.HTTP_200_OK)

            elif request.method == 'DELETE':
                # Ensure user has the required permissions
                if authenticate_clearance_level(request.user, [1, 2]):
                    return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

                service.delete()

                # Invalidate cached data
                cache.delete(f"service_{service_id}")
                for key in cache.keys("services_*"):
                    cache.delete(key)

                return Response({"message": "Service deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def warehouse(request):
    """API for retrieving and creating warehouses"""
    user = request.user
    tenant = request.tenant

    if authenticate_clearance_level(user, [1, 2]):
        return Response({'errors': "Unauthorized - Insufficient clearance level"}, status=status.HTTP_403_FORBIDDEN)

    try:
        with schema_context(tenant.schema_name):
            if request.method == "GET":
                search = request.query_params.get('search', None)
                all_data = request.query_params.get('all', 'false').lower() == 'true'

                cache_key = f"warehouses_{request.query_params.urlencode()}"
                cached_data = cache.get(cache_key)

                if cached_data:
                    return Response(cached_data, status=status.HTTP_200_OK)

                queryset = Warehouse.objects.all()

                if search:
                    queryset = queryset.filter(Q(warehouse_name__icontains=search))

                if not queryset.exists():
                    return Response({"error": "No warehouses found matching the criteria"}, status=status.HTTP_404_NOT_FOUND)
                
                if all_data:
                    response_data = {"results": queryset, "count": len(queryset)}
                    cache.set(cache_key, response_data, timeout=settings.CACHE_TIMEOUT_MID)
                    return Response(response_data, status=status.HTTP_200_OK)

                paginator = UserPagination()
                result_page = paginator.paginate_queryset(queryset, request)

                response_data = paginator.get_paginated_response([
                    {
                        'warehouse_id': warehouse.warehouse_id,
                        'warehouse_name': warehouse.warehouse_name,
                        'address': warehouse.address,
                        'city': warehouse.city,
                        'state': warehouse.state,
                        'country': warehouse.country,
                        'zip_code': warehouse.zip_code,
                        'phone': warehouse.phone,
                        'email': warehouse.email
                    }
                    for warehouse in result_page
                ]).data

                return Response(response_data, status=status.HTTP_200_OK)

            elif request.method == "POST":
                data = request.data

                required_fields = ["warehouse_name", "address", "city", "state", "country", "zip_code", "phone", "email"]
                for field in required_fields:
                    if not data.get(field):
                        return Response({"error": f"'{field}' is required"}, status=status.HTTP_400_BAD_REQUEST)

                if not data["phone"].isdigit() or len(data["phone"]) < 8 or len(data["phone"]) > 15:
                    return Response({"error": "Phone number must contain only digits and be 8-15 characters long."}, status=status.HTTP_400_BAD_REQUEST)

                if not data["zip_code"].isdigit():
                    return Response({"error": "ZIP code must contain only digits."}, status=status.HTTP_400_BAD_REQUEST)

                warehouse = Warehouse.objects.create(
                    warehouse_name=data["warehouse_name"],
                    address=data["address"],
                    city=data["city"],
                    state=data["state"],
                    country=data["country"],
                    zip_code=data["zip_code"],
                    phone=data["phone"],
                    email=data["email"]
                )

                # Invalidate all cached pages when a new warehouse is added
                for key in cache.keys("warehouses_*"):
                    cache.delete(key)

                return Response({
                    "message": "Warehouse created successfully",
                    "warehouse_id": warehouse.warehouse_id
                }, status=status.HTTP_201_CREATED)

    except OperationalError as e:
        return Response({"error": "Database connection error", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as e:
        return Response({"error": "An unexpected error occurred", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

def warehouse_detail(request, id):
    user = request.user
    tenant = request.tenant

    if authenticate_clearance_level(user, [1, 2]):
        return Response({'error': "Unauthorized - Insufficient clearance level"}, status=status.HTTP_403_FORBIDDEN)

    try:
        with schema_context(tenant.schema_name):

            if not warehouse_data:
                try:
                    warehouse = Warehouse.objects.get(warehouse_id=id)
                    warehouse_data = {
                        "warehouse_id": warehouse.warehouse_id,
                        "warehouse_name": warehouse.warehouse_name,
                        "address": warehouse.address,
                        "city": warehouse.city,
                        "state": warehouse.state,
                        "country": warehouse.country,
                        "zip_code": warehouse.zip_code,
                        "phone": warehouse.phone,
                        "email": warehouse.email,
                    }
                except Warehouse.DoesNotExist:
                    return Response({"error": "Warehouse not found"}, status=status.HTTP_404_NOT_FOUND)

            if request.method == "GET":
                return Response(warehouse_data, status=status.HTTP_200_OK)
                
            if request.method == "PUT":
                data = request.data

                # Validate phone number
                phone = data.get("phone", "")
                if phone and (not phone.isdigit() or len(phone) < 8 or len(phone) > 15):
                    return Response({"error": "Phone number must contain only digits and be 8-15 characters long."}, status=status.HTTP_400_BAD_REQUEST)

                # Validate ZIP code
                zip_code = data.get("zip_code", "")
                if zip_code and not zip_code.isdigit():
                    return Response({"error": "ZIP code must contain only digits."}, status=status.HTTP_400_BAD_REQUEST)

                # Update fields
                with transaction.atomic():
                    warehouse.warehouse_name = data.get("warehouse_name", warehouse.warehouse_name)
                    warehouse.address = data.get("address", warehouse.address)
                    warehouse.city = data.get("city", warehouse.city)
                    warehouse.state = data.get("state", warehouse.state)
                    warehouse.country = data.get("country", warehouse.country)
                    warehouse.zip_code = data.get("zip_code", warehouse.zip_code)
                    warehouse.phone = data.get("phone", warehouse.phone)
                    warehouse.email = data.get("email", warehouse.email)
                    warehouse.save()

                # Invalidate cache

                return Response({"message": "Warehouse updated successfully"}, status=status.HTTP_200_OK)

            elif request.method == "DELETE":
                # Check if any users are assigned to this warehouse
                if warehouse.users.exists():  # Adjust based on your model relationship
                    return Response({"error": "Cannot delete warehouse. Users are assigned to it."}, status=status.HTTP_400_BAD_REQUEST)

                # Proceed with deletion
                with transaction.atomic():
                    warehouse.delete()

                # Invalidate cache

                return Response({"message": "Warehouse deleted successfully"}, status=status.HTTP_200_OK)
                    
    except OperationalError as e:
        return Response({"error": "Database connection error", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as e:
        return Response({"error": "An unexpected error occurred", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)