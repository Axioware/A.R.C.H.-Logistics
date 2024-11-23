from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from API.models import *
from Prep_Prime.helpers import *
import json

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def bins(request):
    if request.method == 'GET':
        # Get all bins
        bins = Bin.objects.all()
        # Serialize the data
        bin_data = [{'bin_id': bin.bin_id, 'bin_name': bin.bin_name} for bin in bins]
        return Response(bin_data, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        # Create a new bin
        bin_name = request.data.get('bin_name')
        if not bin_name:
            return Response({'error': 'bin_name is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create and save the bin
        new_bin = Bin(bin_name=bin_name)
        new_bin.save()
        return Response({'message': 'Bin created successfully', 'bin_id': new_bin.bin_id}, status=status.HTTP_201_CREATED)
    

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def single_bin(request, bin_id):
    try:
        # Fetch the bin by ID
        bin = Bin.objects.get(pk=bin_id)
    except Bin.DoesNotExist:
        return Response({'error': 'Bin not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # Return the bin details
        bin_data = {'bin_id': bin.bin_id, 'bin_name': bin.bin_name}
        return Response(bin_data, status=status.HTTP_200_OK)
    
    elif request.method == 'PUT':
        # Update the bin name
        bin_name = request.data.get('bin_name')
        if not bin_name:
            return Response({'error': 'bin_name is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        bin.bin_name = bin_name
        bin.save()
        return Response({'message': 'Bin updated successfully'}, status=status.HTTP_200_OK)
    
    elif request.method == 'DELETE':
        # Delete the bin
        bin.delete()
        return Response({'message': 'Bin deleted successfully'}, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def order_category(request):
    user = request.user

    if request.method == 'GET':
        # Handle GET request to list all categories
        categories = OrderCategory.objects.all().values('category_id', 'category_name')
        categories_list = list(categories)
        return Response(categories_list, status=status.HTTP_200_OK)

    elif request.method == 'POST':

        if authenticate_prep(user) or authenticate_client(user):
                return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        # Handle POST request to create a new category
        try:
            data = request.data  # Use request.data from DRF
            category_name = data.get('category_name')

            if not category_name:
                return Response({"error": "category_name is required"}, status=status.HTTP_400_BAD_REQUEST)

            # Create the new category
            new_category = OrderCategory.objects.create(category_name=category_name)
            return Response({
                'category_id': new_category.category_id,
                'category_name': new_category.category_name
            }, status=status.HTTP_201_CREATED)

        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def order_category_detail(request, pk):
    user = request.user

    try:
        # Fetch the specific category instance
        category = OrderCategory.objects.get(pk=pk)
    except OrderCategory.DoesNotExist:
        return Response({"error": "OrderCategory not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # Return the details of the specific category
        return Response({
            'category_id': category.category_id,
            'category_name': category.category_name
        }, status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        # Ensure the user is authorized to make changes
        if authenticate_prep(user) or authenticate_client(user):
            return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

        # Update the specific category
        try:
            data = request.data  # Use request.data from DRF
            category_name = data.get('category_name')

            if not category_name:
                return Response({"error": "category_name is required"}, status=status.HTTP_400_BAD_REQUEST)

            # Update the category's name
            category.category_name = category_name
            category.save()

            return Response({
                'category_id': category.category_id,
                'category_name': category.category_name
            }, status=status.HTTP_200_OK)

        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'DELETE':
        # Ensure the user is authorized to delete the category
        if authenticate_prep(user) or authenticate_client(user):
            return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

        # Delete the category
        category.delete()
        return Response({"message": "OrderCategory deleted successfully."}, status=status.HTTP_204_NO_CONTENT)



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def service_category(request):
    user = request.user
    if request.method == 'GET':
        params = request.query_params.get('category')
        if params:
            service_categories = ServiceCategory.objects.filter(category_id=params).values('service_code', 'category_id', 'name', 'charges')
        else:
            service_categories = ServiceCategory.objects.all().values('service_code', 'category_id', 'name', 'charges')

        # Convert queryset to a list of dictionaries and return it
        service_category_list = list(service_categories)
        return Response(service_category_list, status=status.HTTP_200_OK)


    elif request.method == 'POST':
        if authenticate_prep(user) or authenticate_client(user):
                return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        # Handle POST request to create a new ServiceCategory
        try:
            data = request.data  # Use request.data from DRF
            category_id = data.get('category_id')
            name = data.get('name')
            charges = data.get('charges')

            if not category_id or not name or not charges:
                return Response({"error": "All fields (category_id, name, charges) are required"}, status=status.HTTP_400_BAD_REQUEST)

            # Ensure the category exists
            try:
                category = OrderCategory.objects.get(category_id=category_id)
            except OrderCategory.DoesNotExist:
                return Response({"error": "Invalid category_id, OrderCategory not found"}, status=status.HTTP_400_BAD_REQUEST)

            # Create the new service category
            new_service_category = ServiceCategory.objects.create(
                category_id=category,
                name=name,
                charges=charges
            )
            return Response({
                'message': 'success'
            }, status=status.HTTP_201_CREATED)

        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON"}, status=status.HTTP_400_BAD_REQUEST)
        # except Exception as e:
        #     return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def service_category_detail(request, pk):
    user = request.user

    try:
        # Fetch the specific service category instance
        service_category = ServiceCategory.objects.get(service_code=pk)
    except ServiceCategory.DoesNotExist:
        return Response({"error": "ServiceCategory not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # Return the details of the specific service category
        return Response({
            'service_code': service_category.service_code,
            'category_id': service_category.category_id.category_id,
            'name': service_category.name,
            'charges': service_category.charges
        }, status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        # Ensure the user is authorized to make changes
        if authenticate_prep(user) or authenticate_client(user):
            return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

        # Update the specific service category
        try:
            data = request.data  # Use request.data from DRF
            # category_id = data.get('category_id')
            name = data.get('name')
            charges = data.get('charges')

            if not charges:
                return Response({"error": "All fields (name, charges) are required"}, status=status.HTTP_400_BAD_REQUEST)

            # Ensure the OrderCategory exists
            

            # Update the service category
            service_category.name = name if name else service_category.name
            service_category.charges = charges
            service_category.save()

            return Response({'message':'success'
            }, status=status.HTTP_200_OK)

        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'DELETE':
        # Ensure the user is authorized to delete the service category
        if authenticate_prep(user) or authenticate_client(user):
            return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

        # Delete the service category
        service_category.delete()
        return Response({"message": "ServiceCategory deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
