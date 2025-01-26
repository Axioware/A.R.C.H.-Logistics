from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse, HttpResponse
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth.models import User
from .models import *
from rest_framework import status, pagination
from django.contrib.auth.hashers import make_password
from django.db.models import Q, Sum, F
from django.db import transaction
from Arch_Logistics.helpers import *
from django.core.validators import validate_email
from django.core.exceptions import ValidationError, ObjectDoesNotExist
from django.utils.dateparse import parse_datetime
import pytz, logging, random
from .helpers import authenticate_client
import re

from django.db.models import Sum, F
from django.db.models.functions import Concat

logger = logging.getLogger(__name__)

@api_view(['GET', 'POST']) 
@permission_classes([IsAuthenticated])
def items(request):
    user = request.user

    if request.method == 'GET':
        try:
            # Get request parameters for filtering and searching
            all_data = request.query_params.get('all', 'false').lower() == 'true'
            client_id = request.query_params.get('client_id')
            search = request.query_params.get('search')

            # Retrieve items based on the authenticated user
            if authenticate_client(user):
                items = Item.objects.filter(client_id=user)
            else:
                items = Item.objects.all()

            # Apply filtering by client_id if provided
            if client_id:
                items = items.filter(client_id=client_id)

            # Apply search filtering if a search term is provided
            if search:
                items = items.filter(
                    Q(item_name__icontains=search) |
                    Q(description__icontains=search) |
                    Q(client_id__extended__llc_name__icontains=search)
                )


            # Prepare the response data
            items_data = [{
                'item_id': item.item_id,
                'item_name': item.item_name,
                'user_id': item.client_id.id,
                'llc_name': item.client_id.extended.llc_name, 
                'description': item.description
            } for item in items]
            
            if all_data:
                return Response({'user_data': items_data, 'count': len(items_data)}, status=status.HTTP_200_OK)

            paginator = UserPagination()
            page = paginator.paginate_queryset(items_data, request)
            if page is not None:
                return paginator.get_paginated_response(page)
            return Response({'user_data': items_data}, status=status.HTTP_200_OK)

        except ObjectDoesNotExist:
            return Response({'error': 'No items found.'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            logger.error(f"Error in GET /items: {str(e)}")
            return Response({'error': 'Something went wrong.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'POST':
        try:
            error = {}
            data = request.data
            item_name = data.get('item_name', '')
            description = data.get('description', '')

            if not item_name:
                error['item_name'] = "item name is required"

            if authenticate_client(user):
                client = user
            else:
                client_id = data.get('client_id')
                try:
                    client = User.objects.get(id=client_id)
                except ObjectDoesNotExist:
                    return Response({'error': 'Invalid client_id'}, status=status.HTTP_400_BAD_REQUEST)

            # Ensure that extended and llc_name are not None
            if client.extended and client.extended.llc_name: #TODO add condition and only users with client role can have items
                item_id_prefix = client.extended.llc_name[:3].lower()
            else:
                return Response({'error': 'Client does not have an LLC name or extended profile.'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Auto-generate the item_id
            items = Item.objects.filter(client_id=client)

            # Extract the numeric peaart from each item_id, sort by it, and find the largest number
            max_number = max([int(re.search(r'\d+', item.item_id).group()) for item in items], 
                default=0  # Use 0 as the default if the list is empty
            )
            next_id = max_number + 1
            # next_id = 1 if not last_item else str(int(last_item.item_id.split('_')[1]) + 1)
            item_id = f"{item_id_prefix}_{next_id}"

            # Create and save the item
            item = Item.objects.create(
                item_id=item_id,
                item_name=item_name,
                client_id=client,
                description=description
            )
            return Response({'message': 'Item created successfully.', 'item_id': item.item_id}, status=status.HTTP_201_CREATED)

        except ValidationError as e:
            logger.error(f"Validation error in POST /items: {str(e)}")
            return Response({'error': 'Validation error', 'details': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            logger.error(f"Error in POST /items: {str(e)}")
            return Response({'error': 'Failed to create item.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    else:
        return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def single_item(request, pk):
    try:
        item = Item.objects.get(pk=pk)
        print(item.item_id)

        if request.method == 'GET':
            if authenticate_client(request.user) and item.client_id != request.user:
                return Response({'error': 'Unauthorized to view this item'}, status=status.HTTP_403_FORBIDDEN)

            return Response({
                'item_id': item.item_id,
                'item_name': item.item_name,
                'item_description': item.description,
                'client_id': item.client_id.id,
                'llc_name': item.client_id.extended.llc_name
            }, status=status.HTTP_200_OK)

        elif request.method == 'PUT':
            if authenticate_client(request.user) and item.client_id != request.user:
                return Response({'error': 'Unauthorized to edit this item'}, status=status.HTTP_403_FORBIDDEN)
            if authenticate_prep(request.user):
                return Response({'error': 'Unauthorized to edit this item'}, status=status.HTTP_403_FORBIDDEN)

            data = request.data
            client_id = data.get('client_id')
            if client_id:
                try:
                    client = User.objects.get(id=client_id)
                except User.DoesNotExist:
                    return Response({'error': 'Invalid client_id'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                client = item.client_id

            
            item_id = data.get('item_id', None)
            item_name = data.get('item_name', item.item_name)
            description = data.get('item_description', item.description)

            if item_id is None:
                item.client_id = client
                item.item_name = item_name
                item.description = description
                item.save()
            else:
                item.item_id = item_id
                item.client_id = client
                item.item_name = item_name
                item.description = description
                item.save()
                item = Item.objects.get(pk=pk)
                item.delete()
            

            
            return Response({'message': 'Item updated successfully'}, status=status.HTTP_200_OK)

        elif request.method == 'DELETE':
            if authenticate_client(request.user) and item.client_id != request.user:
                return Response({'error': 'Unauthorized to delete this item'}, status=status.HTTP_403_FORBIDDEN)

            item.delete()
            return Response({'message': 'Item deleted successfully'}, status=status.HTTP_200_OK)

    except ObjectDoesNotExist:
        return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)

    except ValidationError as e:
        logger.error(f"Validation error in single_item {pk}: {str(e)}")
        return Response({'error': 'Validation error', 'details': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        logger.error(f"Error in single_item {pk}: {str(e)}")
        return Response({'error': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def inventory(request):
    user = request.user

    if request.method == "GET":

        # Filter and search parameters
        user_param = request.query_params.get('user')
        qty = request.query_params.get('qty')
        bin = request.query_params.get('bin')
        category = request.query_params.get('category')
        date_start = request.query_params.get('date_start')  # Start of date range
        date_end = request.query_params.get('date_end')      # End of date range
        search = request.query_params.get('search')

        try:
            # If the requester is a client, return only their inventory
            if authenticate_client(user):
                queryset = Inventory.objects.filter(user_id=user.id).select_related('item_id')
            else:
                queryset = Inventory.objects.all().select_related('item_id')

            if user_param:
                queryset = queryset.filter(user_id=user_param)
            if qty:
                queryset = queryset.filter(quantity__gte=qty)
            if bin:
                queryset = queryset.filter(bin_id=bin)
            if category:
                queryset = queryset.filter(category_id=category)
            if date_start and date_end:
                queryset = queryset.filter(date_added__range=[date_start, date_end])

            if search:
                queryset = queryset.filter(
                    Q(item__name__icontains=search) |
                    Q(item__description__icontains=search) |
                    Q(user__extended__llc_name__icontains=search)
                )

            # Construct result data
            result = []
            for inventory in queryset:
                # dimensions = Dimension.objects.filter(inventory_id=inventory.id)
                result.append({
                    'id': inventory.id,
                    'item_name': inventory.item_id.item_name,
                    'item_description': inventory.item_id.description,
                    'client_name': inventory.item_id.client_id.extended.llc_name if inventory.item_id.client_id else "N/A",
                    'quantity': inventory.quantity,
                    'bin': inventory.bin_id.bin_name if inventory.bin_id else 'N/A',
                    'category': inventory.category_id.category_name if inventory.category_id else 'N/A',
                    'date_added': inventory.date_added,
                    'boxes': inventory.boxes,
                    'charge_by': inventory.charge_by,
                    # 'dimensions': list(dimensions.values())  # Fetch dimensions related to the inventory
                })
                

            # Pagination
            paginator = UserPagination()
            page = paginator.paginate_queryset(result, request)
            if page is not None:
                return paginator.get_paginated_response(page)
            return Response({'data': result}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e), "status": "error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    if request.method == 'POST':
        if authenticate_owner(user) or authenticate_manager(user) or authenticate_VA(user):
            try:
                data = request.data
                # client_id = data.get('client_id', None)
                item_ids = data.get('item_ids', None)
                print(item_ids)
                category_id = data.get('category_id', None)
                bin_no = data.get('bin_no', None)
                quantities = data.get('quantities', None)
                pack_size = data.get('pack_size', None)
                no_bundles = data.get('no_bundles', None)
                pallet = data.get('pallet', False)
                charge_by = data.get('charge_by', None)
                boxes = data.get('boxes', None)
                dims = data.get('physics', None)
                date_added = data.get('date_added', None)

                # Input Validation
                if not (len(item_ids) == len(quantities)):
                    return Response({'error': 'Length of item_ids must match quantities'}, status=status.HTTP_400_BAD_REQUEST)
                if not (len(dims) == boxes):
                    return Response({'error': 'Length of physics must match boxes'}, status=status.HTTP_400_BAD_REQUEST)

                with transaction.atomic():
                    # Create the first Inventory entry
                    first_item_id = item_ids[0]
                    item = Item.objects.get(pk=first_item_id)
                    first_quantity = quantities[0]
                    inventory = Inventory.objects.create(
                        item_id_id=item,
                        bin_id_id=bin_no,
                        quantity=first_quantity,
                        category_id_id=category_id,
                        pack_size=pack_size,
                        no_bundles=no_bundles,
                        date_added=date_added,
                        boxes=boxes,
                        charge_by=charge_by,
                        pallet=pallet
                    )

                    # Add remaining items to BundleInventory
                    for i in range(1, len(item_ids)):
                        item = Item.objects.get(pk=item_ids[i])
                        BundleInventory.objects.create(
                            other_item_id=item,
                            quantity=quantities[i],
                            inventory_id=inventory
                        )
                    print('done')
                    # Create PalletDimension or Dimension based on pallet value
                    for dimension in dims:
                        if pallet:
                            PalletDimension.objects.create(
                                service_id=None,
                                item_id=None,
                                service_code=None,
                                category_id=None,
                                length=dimension['length'],
                                width=dimension['width'],
                                height=dimension['height'],
                                weight=dimension['weight'],
                                shipped=False,
                                shipped_date=None,
                                pallet_label=None,
                                inventory_id=inventory
                            )
                        else:
                            Dimension.objects.create(
                                service_id=None,
                                item_id=None,
                                service_code=None,
                                category_id=None,
                                length=dimension['length'],
                                width=dimension['width'],
                                height=dimension['height'],
                                weight=dimension['weight'],
                                quantity=dimension['quantity'],
                                shipped=False,
                                shipped_date=None,
                                box_label=None,
                                pallet=None,
                                inventory_id=inventory
                            )

                return Response({'message': 'Inventory and associated records created successfully'}, status=status.HTTP_201_CREATED)

            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def single_inventory(request, inventory_id):
    user = request.user

    # Check if the user has access
    try:
        # Fetch the inventory item
        inventory = Inventory.objects.select_related('item_id', 'bin_id', 'category_id').get(id=inventory_id)

        # Check access permissions for the client user
        if user.extended.role == UsersExtended.RoleChoices.CLIENT and inventory.item_id.client_id != user.id:
            return Response({'errors': "Unauthorized to access this inventory"}, status=status.HTTP_401_UNAUTHORIZED)

    except Inventory.DoesNotExist:
        return Response({'error': 'Inventory not found'}, status=status.HTTP_404_NOT_FOUND)

    # GET method: Retrieve single inventory details
    if request.method == "GET":
        dimensions = Dimension.objects.filter(inventory_id=inventory_id)
        inventory_data = {
            'id': inventory.id,
            'item_name': inventory.item_id.item_name if inventory.item_id else 'Item does not exist',
            'item_description': inventory.item_id.description if inventory.item_id else 'Item does not exist',
            'client_name': inventory.item_id.client_id.extended.llc_name if inventory.item_id.client_id else 'User does not exist',
            'quantity': inventory.quantity,
            'bin': inventory.bin_id.bin_name if inventory.bin_id else 'Bin does not exist',
            'category': inventory.category_id.category_name if inventory.category_id else 'Category does not exist',
            'date_added': inventory.date_added,
            'boxes': inventory.boxes,
            'charge_by': inventory.charge_by,
            'dimensions': dimensions
        }
        return Response({'data': inventory_data}, status=status.HTTP_200_OK)

    # PUT method: Update single inventory record
    elif request.method == "PUT":
        if authenticate_prep(user) or authenticate_client(user):
            return Response({'errors': "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        
        if authenticate_owner(user) or authenticate_manager(user) or authenticate_VA(user):
            data = request.data
            errors = {}

            # Retrieve updated data
            item_id = data.get('item_id', inventory.item_id if inventory.item_id else '')
            item_name = data.get('item_name', inventory.item_id.item_name if inventory.item_id else '')
            description = data.get('description', inventory.item_id.description if inventory.item_id else '')
            bin_id = data.get('bin_id', inventory.bin_id.id if inventory.bin_id else '')
            quantity = data.get('quantity', inventory.quantity)
            category_id = data.get('category_id', inventory.category_id.id if inventory.category_id else '')
            boxes = data.get('boxes', inventory.boxes)
            charge_by = data.get('charge_by', inventory.charge_by)
            date_added = data.get('date_added', inventory.date_added)
            dimensions_record = Dimension.objects.filter(inventory_id=inventory_id)
            dimensions = data.get('dimensions', '')


            if dimensions:
                with transaction.atomic():
                    for x in dimensions:
                        pass



            # Validation checks
            if not bin_id:
                errors['bin'] = "Bin is required."
            if not quantity:
                errors['quantity'] = "Quantity is required."
            if not category_id:
                errors['category'] = "Category is required."
            if not charge_by:
                errors['charge_by'] = "Charge by is required."

            if errors:
                return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

            try:
                with transaction.atomic():
                    # Update the inventory object
                    inventory.item_id.item_name = item_name
                    inventory.item_id.description = description
                    inventory.item_id.save()

                    inventory.bin_id = bin_id
                    inventory.quantity = quantity
                    inventory.category_id = category_id
                    inventory.boxes = boxes
                    inventory.charge_by = charge_by
                    inventory.dimensions = dimensions
                    inventory.date_added = date_added

                    inventory.save()

                    return Response({"success": "Inventory updated successfully"}, status=status.HTTP_200_OK)

            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"error": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    # DELETE method: Delete single inventory record
    elif request.method == "DELETE":
        if authenticate_prep(user) or authenticate_client(user):
            return Response({'errors': "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        
        if authenticate_owner(user) or authenticate_manager(user) or authenticate_VA(user):
            try:
                with transaction.atomic():
                    inventory.delete()
                    return Response({"success": "Inventory deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"error": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET']) #TODO test after dummy data
@permission_classes([IsAuthenticated])
def aggregated_inventory_list(request):
    user = request.user

    try:
        # Filter inventory based on user authentication
        if authenticate_client(user):
            inventories = Inventory.objects.filter(item_id__client_id=user)
            bundle_inventories = BundleInventory.objects.filter(other_item__client_id=user)
        else:
            inventories = Inventory.objects.all()
            bundle_inventories = BundleInventory.objects.all()


        # Aggregate data for each item
        inventory_data = {}
        for inventory in inventories:
            item_id = inventory.item_id.item_id
            llc_name = inventory.item_id.client_id.extended.llc_name
            print(item_id)

            # Check if the item already exists in the dictionary
            if item_id not in inventory_data:
                inventory_data[item_id] = {
                    'inventory_id': inventory.id,
                    'item_id': item_id,
                    'item_name': inventory.item_id.item_name,
                    'llc_name': llc_name,
                    'quantity': inventory.quantity,
                    'bins': [inventory.bin_id.bin_name] if inventory.bin_id else []
                }
            else:
                # Update the existing item entry
                inventory_data[item_id]['quantity'] += inventory.quantity
                if inventory.bin_id and inventory.bin_id.bin_number not in inventory_data[item_id]['bins']:
                    inventory_data[item_id]['bins'].append(inventory.bin_id.bin_number)

        # Add quantities from the BundleInventory table
        # bundle_inventories = BundleInventory.objects.filter(inventory_id__in=inventories)
        for bundle in bundle_inventories:
            item_id = bundle.other_item.item_id
            if item_id in inventory_data:
                inventory_data[item_id]['quantity'] += bundle.quantity
            else:
                inventory_data[item_id] = {
                    'inventory_id': None,
                    'item_id': item_id,
                    'item_name': bundle.other_item.item_name,
                    'llc_name': bundle.other_item.client_id.extended.llc_name,
                    'quantity': bundle.quantity,
                    # 'bins': [inventory.bin_id.bin_number] if inventory.bin_id else []
                }

        # Convert the dictionary to a list
        inventory_list = list(inventory_data.values())

        return Response({'inventories': inventory_list}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def inventory_details(request, id):

    user = request.user
    if request.method == 'GET':
        try:
            # Fetch the main inventory record
            inventory = Inventory.objects.get(pk=id)
            if authenticate_client(user) and inventory.item_id.client_id != user:
                return Response({'error': "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

            # Fetch related bundle inventory records
            bundle_inventory = BundleInventory.objects.filter(inventory_id=inventory).order_by('id')

            # Fetch related dimensions
            dimensions = Dimension.objects.filter(inventory_id=inventory).order_by('id')

            # Prepare response data for the main inventory
            inventory_data = {
                'inventory_id': inventory.id,
                'item_id': inventory.item_id.item_id,
                'item_name': inventory.item_id.item_name,
                'category': inventory.category_id.category_name,
                'quantity': inventory.quantity,
                'pack_size': inventory.pack_size,
                'no_bundles': inventory.no_bundles,
                'boxes': inventory.boxes,
                'charge_by': inventory.charge_by,
                'pallet': inventory.pallet,
                'date_added': inventory.date_added,
                'bin': inventory.bin_id.bin_name if inventory.bin_id else None,
            }

            # Prepare bundle inventory data
            bundle_inventory_data = [
                {
                    'other_item_id': bundle.other_item.item_id,
                    'other_item_name': bundle.other_item.item_name,
                    'quantity': bundle.quantity
                }
                for bundle in bundle_inventory
            ]

            # Prepare dimensions data
            dimensions_data = [
                {
                    'length': dimension.length,
                    'width': dimension.width,
                    'height': dimension.height,
                    'weight': dimension.weight,
                    'quantity': dimension.quantity,
                    'shipped': dimension.shipped,
                    'shipped_date': dimension.shipped_date,
                    'fba_label': dimension.box_label.url if dimension.box_label else None
                }
                for dimension in dimensions
            ]

            # Combine all the data in the response
            response_data = {
                'inventory': inventory_data,
                'bundle_inventory': bundle_inventory_data,
                'dimensions': dimensions_data
            }

            return Response(response_data, status=200)

        except Inventory.DoesNotExist:
            return Response({'error': 'Inventory not found.'}, status=404)

        except Exception as e:
            return Response({'error': str(e)}, status=500)

    if request.method == "PUT":
        try:
            with transaction.atomic():
                # Fetch the main inventory record
                inventory = Inventory.objects.get(pk=id)

                # If the user is a client, ensure they can only update their own inventory
                if authenticate_client(request.user):
                    if inventory.item_id.client_id != request.user:
                        return Response({'error': 'Unauthorized to update this inventory.'}, status=403)

                data = request.data

                # Update the main inventory fields
                inventory.quantity = data.get('quantity', inventory.quantity)
                bin_id = data.get('bin')
                if bin_id:
                    try:
                        inventory.bin_id = Bin.objects.get(pk=bin_id)
                    except Bin.DoesNotExist:
                        return Response({'error': 'Invalid bin ID.'}, status=400)

                inventory.save()

                # Update dimensions
                dimensions = Dimension.objects.filter(inventory_id=inventory).order_by('id')

                dimensions_data = data.get('dimensions', [])
                for index, dimension in enumerate(dimensions_data):
                    # Update existing dimension records
                    dimensions[index].length = dimensions_data[index][0] if dimension else dimensions[index].length
                    dimensions[index].width = dimensions_data[index][1] if dimension else dimensions[index].width
                    dimensions[index].height = dimensions_data[index][2] if dimension else dimensions[index].length
                    dimensions[index].weight = dimensions_data[index][3] if dimension else dimensions[index].length
                    dimensions[index].quantity = dimensions_data[index][4] if dimension else dimensions[index].length
                    dimensions[index].save()

                bundle_data = data.get('bundles', [])
                bundle_inventory = BundleInventory.objects.filter(inventory_id=inventory).order_by('id')
                for bundle in bundle_inventory:
                    bundle.quantity = bundle_data[0] if bundle_data else bundle.quantity
                    bundle.save()
                return Response({'message': 'Inventory updated successfully.'}, status=200)
                
        except Inventory.DoesNotExist:
            return Response({'error': 'Inventory not found.'}, status=404)

        except Exception as e:
            return Response({'error': str(e)}, status=500)
        
    if request.method == "DELETE":
        try:
            # Fetch the main inventory record
            inventory = Inventory.objects.all(pk=id)

            # If the user is a client, ensure they can only delete their own inventory
            if authenticate_client(request.user):
                if inventory.item_id.client_id != request.user:
                    return Response({'error': 'Unauthorized to delete this inventory.'}, status=403)

            # Delete all dimensions associated with this inventory
            Dimension.objects.filter(inventory_id=inventory).delete()

            # Delete all bundle inventory records associated with this inventory
            BundleInventory.objects.filter(inventory_id=inventory).delete()

            # Delete the main inventory record
            inventory.delete()

            return Response({'message': 'Inventory and associated records deleted successfully.'}, status=200)

        except Inventory.DoesNotExist:
            return Response({'error': 'Inventory not found.'}, status=404)

    else:
        return Response({'error': str(e)}, status=500)

#TODO add functionality so that a single inventory can be on mutiple bins 