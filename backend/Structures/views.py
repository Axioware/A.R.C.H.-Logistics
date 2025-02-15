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
                    cache.set(cache_key, response_data, timeout=60)
                    return Response(response_data, status=status.HTTP_200_OK)

                # Apply Pagination
                paginator = UserPagination()
                page = paginator.paginate_queryset(result, request)
                if page is not None:
                    response_data = paginator.get_paginated_response(page).data
                    cache.set(cache_key, response_data, timeout=60)
                    return Response(response_data, status=status.HTTP_200_OK)

                response_data = {'locations': result}
                cache.set(cache_key, response_data, timeout=60)
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
            # Fetch the Location by ID
            location = Locations.objects.get(pk=location_id)

            if request.method == 'GET':
                # Return the Location details
                location_data = {
                    'location_id': location.location_id,
                    'location_name': location.location_name,
                    'location_type': location.location_type,
                    'warehouse_id': location.warehouse_id.id  # Foreign key serialization
                }
                return Response(location_data, status=status.HTTP_200_OK)

            elif request.method == 'PUT':
                # Update the Location's name and other fields if required
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
                return Response({'message': 'Location updated successfully'}, status=status.HTTP_200_OK)

            elif request.method == 'DELETE':
                # Ensure the Location can be deleted
                if location.warehouse_id:
                    # Check if any user is assigned to this location
                    # Assuming you have a related User model that references Locations
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
    tenant=request.tenant
    try:
        with schema_context(tenant.schema_name):
            if request.method == 'GET':
                services_list = Services.objects.values('service_id', 'service_name', 'service_charge')
                return Response(list(services_list), status=status.HTTP_200_OK)

            elif request.method == 'POST':
                if authenticate_clearance_level(request.user, [1, 2]):
                    return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

                data = request.data
                service_name = data.get('service_name')
                service_charge = data.get('service_charge', 0.0)

                if not service_name:
                    return Response({"error": "Service name is required"}, status=status.HTTP_400_BAD_REQUEST)

                new_service = Services.objects.create(service_name=service_name, service_charge=service_charge)
                return Response({"message": "Service created", "service_id": new_service.service_id}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def warehouse(request):
    user = request.user
    tenant = request.tenant

    if authenticate_clearance_level(user, [1, 2]):
        return Response({'errors': "Unauthorized - Insufficient clearance level"}, status=status.HTTP_403_FORBIDDEN)

    try:
        with schema_context(tenant.schema_name):
            if request.method == "GET":
                search = request.query_params.get('search', None)

                queryset = Warehouse.objects.all()

                if search:
                    queryset = queryset.filter(Q(warehouse_name__icontains=search))

                if not queryset.exists():
                    return Response({"error": "No warehouses found matching the criteria"}, status=status.HTTP_404_NOT_FOUND)

                result = [
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
                    for warehouse in queryset
                ]

                return Response({"warehouses": result, "count": len(result)}, status=status.HTTP_200_OK)

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

                return Response({
                    "message": "Warehouse created successfully",
                    "warehouse_id": warehouse.warehouse_id
                }, status=status.HTTP_200_OK)

    except OperationalError as e:
        return Response({"error": "DaItabase connection error", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as e:
        return Response({"error": "An unexpected error occurred", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def warehouse_detail(request, id):
    user = request.user
    tenant = request.tenant

    if authenticate_clearance_level(user, [1, 2]):
        return Response({'error': "Unauthorized - Insufficient clearance level"}, status=status.HTTP_403_FORBIDDEN)

    try:
        with schema_context(tenant.schema_name):
            try:
                warehouse = Warehouse.objects.get(warehouse_id=id)
            except Warehouse.DoesNotExist:
                return Response({"error": "Warehouse not found"}, status=status.HTTP_404_NOT_FOUND)

            if request.method == "GET":
                return Response({
                    "warehouse_id": warehouse.warehouse_id,
                    "warehouse_name": warehouse.warehouse_name,
                    "address": warehouse.address,
                    "city": warehouse.city,
                    "state": warehouse.state,
                    "country": warehouse.country,
                    "zip_code": warehouse.zip_code,
                    "phone": warehouse.phone,
                    "email": warehouse.email,
                }, status=status.HTTP_200_OK)
                
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

                return Response({"message": "Warehouse updated successfully"}, status=status.HTTP_200_OK)

            elif request.method == "DELETE":
                with schema_context(tenant.schema_name):
                    try:
                        warehouse = Warehouse.objects.get(warehouse_id=id)

            # Check if any users are assigned to this warehouse
                        if warehouse.users.exists():  # Adjust this based on your model relationship
                            return Response({"error": "Cannot delete warehouse. Users are assigned to it."}, status=status.HTTP_400_BAD_REQUEST)

            # If no users are assigned, proceed with deletion
                        with transaction.atomic():
                            warehouse.delete()

                        return Response({"message": "Warehouse deleted successfully"}, status=status.HTTP_200_OK)

                    except Warehouse.DoesNotExist:
                        return Response({"error": "Warehouse not found"}, status=status.HTTP_404_NOT_FOUND)
                    except Exception as e:
                        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                    
    except OperationalError as e:
        return Response({"error": "Database connection error", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as e:
        return Response({"error": "An unexpected error occurred", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
