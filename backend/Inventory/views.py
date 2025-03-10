from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from .models import *
from rest_framework import status, pagination
from django.db.models import Q
from django.db import transaction
from Arch_Logistics.helpers import *
from Orders.models import Box
from django.core.exceptions import ValidationError, ObjectDoesNotExist
import logging
from django.core import serializers
from .helpers import authenticate_client


logger = logging.getLogger(__name__)

@api_view(['GET', 'POST']) 
@permission_classes([IsAuthenticated])
def items(request):
    user = request.user

    if request.method == 'GET':
        try:
            
            user_id = request.GET.get('user_id')  # Retrieve user_id from the query parameters
            if authenticate_clearance_level(user, [4]):
                items = Item.objects.filter(user_id=user)
            if authenticate_clearance_level(user, [1, 2, 3]):
                if user_id:
                    items = Item.objects.filter(user_id=user_id)  # Retrieve items for the specific user
                else:
                    items = Item.objects.all()

            data = serializers.serialize('json', items)
            return JsonResponse(data, safe=False)

        except ObjectDoesNotExist:
            return Response({'error': 'No items found.'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            logger.error(f"Error in GET /items: {str(e)}")
            return Response({'error': 'Something went wrong.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'POST':
        if authenticate_clearance_level(user, [1, 2, 3]):
            try:
                # Load data from request body assuming JSON
                data = request.json()

                new_item = Item.objects.create(
                    item_sku=data['item_sku'],
                    item_name=data['item_name'],
                    user_id=data['user_id'],  # Assume user_id is directly provided; adjust based on your auth system
                    item_description=data.get('item_description', '')  # Optional field with default
                )
                return JsonResponse({'status': 'success', 'message': 'Item created successfully.', 'item_id': new_item.pk}, status=201)
            except Exception as e:
                return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    else:
        return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def single_item(request, pk):
    try:
        # Retrieve the item, or return a 404 if it doesn't exist
        item = Item.objects.get(pk=pk)
        user = request.user


        if request.method == 'GET':
            if authenticate_clearance_level(user, [4]):
                if user != item.user_id.id:
                    return Response({'error': 'Unauthorized to access this item'}, status=status.HTTP_403_FORBIDDEN)

            # Return a simplified item representation
            return Response({
                'item_id': item.id,  # Assuming `item_id` is just the primary key
                'item_sku': item.item_sku,
                'item_name': item.item_name,
                'item_description': item.item_description,
                'user_id': item.user_id.id  # Assuming `user_id` is a foreign key to User
            }, status=status.HTTP_200_OK)


        elif request.method == 'PUT':
            if not authenticate_clearance_level(user, [1, 2, 3]):
                return Response({'error': 'Unauthorized to access this item'}, status=status.HTTP_403_FORBIDDEN)

            data = request.data
            item.item_name = data.get('item_name', item.item_name)
            item.item_description = data.get('item_description', item.item_description)
            item.save()

            return Response({'message': 'Item updated successfully'}, status=status.HTTP_200_OK)

        elif request.method == 'DELETE':
            if not authenticate_clearance_level(user, [1, 2, 3]):
                return Response({'error': 'Unauthorized to delete this item'}, status=status.HTTP_403_FORBIDDEN)

            item.delete()
            return Response({'message': 'Item deleted successfully'}, status=status.HTTP_200_OK)

    except Item.DoesNotExist:
        return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({'error': 'Something went wrong', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def inventory(request):
    user = request.user

    if request.method == "GET":
        # Extract query parameters
        user_id = request.GET.get('user_id')
        date_from = request.GET.get('date_from')
        date_to = request.GET.get('date_to')
        quantity_filter = request.GET.get('quantity_filter')
        search = request.GET.get('search')  # Unified search parameter
        # Start building the query
        query = Q()
        # Filter by user_id if provided
        if authenticate_clearance_level(user, [4]):
            query &= Q(user_id=user)
        elif authenticate_clearance_level(user, [1, 2, 3]):
            if user_id:
                query &= Q(user_id=user_id)
        # Filter by date range if both dates are provided
        if date_from and date_to:
            date_from = datetime.datetime.strptime(date_from, '%Y-%m-%d')
            date_to = datetime.datetime.strptime(date_to, '%Y-%m-%d')
            query &= Q(date_added__range=(date_from, date_to))
        # Filter by quantity ranges
        if quantity_filter:
            if quantity_filter == 'less10':
                query &= Q(quantity__lt=10)
            elif quantity_filter == 'less50':
                query &= Q(quantity__lt=50)
            elif quantity_filter == 'less100':
                query &= Q(quantity__lt=100)
            elif quantity_filter == 'less500':
                query &= Q(quantity__lt=500)
            elif quantity_filter == 'more500':
                query &= Q(quantity__gt=500)
        # Filter by item SKU or name through related InventoryItem using a unified search parameter
        if search:
            item_query = Q(item_id__item_sku__icontains=search) | Q(item_id__item_name__icontains=search)
            query &= Q(inventory_id_inventory_item__in=InventoryItem.objects.filter(item_query))
        # Execute the query
        inventory_list = Inventory.objects.filter(query).distinct()
        # Serialize the queryset
        data = serializers.serialize('json', inventory_list)
        return JsonResponse(data, safe=False)

    if request.method == 'POST':
        if authenticate_clearance_level(user, [1, 2]):
            return Response({'errors': "Unauthorized - Insufficient clearance level"}, status=status.HTTP_403_FORBIDDEN)
        try:
            data = request.json()
            
            user_id = data.get('user_id')
            category = data.get('category')
            charge_by = data.get('charge_by')
            custom_charge = data.get('custom_charge')
            custom_charge_value = data.get('custom_charge_value')
            date_added = datetime.datetime.strptime(data.get('date_added'), '%m/%d/%Y')
            warehouse_id = data.get('warehouse_id')
            locations = data.get('locations')
            bundle_quantity = data.get('bundle_quantity')
            warehouse = Warehouse.objects.get(pk=warehouse_id)

            with transaction.atomic():

                inventory = Inventory.objects.create(
                    user_id=user_id,
                    category=category,
                    charge_by=charge_by,
                    date_added=date_added,
                    warehouse_id=warehouse,
                    bundle_quantity=bundle_quantity,
                    custom_charge=custom_charge,
                    custom_charge_value=custom_charge_value
                )

                # Create InventoryItem records for each product
                product_data = data.get('products')
                inventory_items = []
                total_quantity = 0
                for product in product_data:
                    total_quantity += product['quantity']
                    item = Item.objects.get(pk=product['id'])  # Ensure item exists
                    inventory_items.append(InventoryItem(
                        inventory_id=inventory,
                        item_id=item,
                        quantity=product['quantity']
                    ))
                InventoryItem.objects.bulk_create(inventory_items)

                
                inventory_locations = []
                for location in locations:
                    location = Locations.objects.get(pk=location['id'])  # Ensure item exists
                    inventory_locations.append(InventoryLocation(
                        inventory_id=inventory,
                        location_id=location,
                    ))
                InventoryLocation.objects.bulk_create(inventory_locations)

                # Create Box records
                dimension_data = data.get('dimensions')
                boxes = []
                for dimension in dimension_data:
                    no_boxes += dimension['quantity']
                    boxes.append(Box(
                        inventory_id=inventory,
                        length=dimension['length'],
                        width=dimension['width'],
                        height=dimension['height'],
                        weight=dimension['weight'],
                        box_quantity=dimension['quantity'],  
                        # item_quantity=sum(product['quantity'] for product in product_data)  # Total quantity of items across all boxes
                    ))
                Box.objects.bulk_create(boxes)

                

                if bundle_quantity:
                    record_quantity = bundle_quantity
                else:
                    record_quantity = total_quantity


                inventory_record = InventoryRecord.objects.create(
                    inventory_id=inventory,
                    charge_from=date_added,
                    quantity=record_quantity
                )

                boxes = []
                for dimension in dimension_data:
                    boxes.append(BoxRecord(
                        inventory_id=inventory_record,
                        length=dimension['length'],
                        width=dimension['width'],
                        height=dimension['height'],
                        weight=dimension['weight'],
                        box_quantity=dimension['quantity'],  
                        # item_quantity=sum(product['quantity'] for product in product_data)  # Total quantity of items across all boxes
                    ))
                BoxRecord.objects.bulk_create(boxes)



            return JsonResponse({'status': 'success', 'message': 'Inventory and related entities created successfully.'}, status=201)

        except Warehouse.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Warehouse not found.'}, status=404)
        except Item.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'One or more items not found.'}, status=404)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def single_inventory(request, inventory_id):
    user = request.user

    # Check if the user has access
    try:
        inventory = Inventory.objects.get(pk=inventory_id)
    except Inventory.DoesNotExist:
        return JsonResponse({'error': 'Inventory not found'}, status=404)


    if request.method == 'GET':
        # Assuming InventoryItem has a relation to a Product model through item_id
        products_data = [
            {
                "product_id": item.item_id.item_sku,  # or any identifier
                "quantity": item.quantity
            }
            for item in InventoryItem.objects.filter(inventory_id=inventory)
        ]

        locations_data = [
            {
                "location": location.location_id  # Example field from the Locations model
            }
            for location in InventoryLocation.objects.filter(inventory_id=inventory)
        ]

        dimensions_data = [
            {
                "length": dimension.length,
                "width": dimension.width,
                "height": dimension.height,
                "weight": dimension.weight,
                "quantity": dimension.quantity
            }
            # Assuming you have a dimensions model or similar; adjust as necessary
            for dimension in inventory.dimensions.all()  # This line depends on your model relations
        ]

        data = {
            "user_id": inventory.user_id.id if inventory.user_id else None,  # Update based on your user relationship
            "products": products_data,
            "category": inventory.category,
            "charge_by": inventory.charge_by,
            "date_added": inventory.date_added.strftime("%m/%d/%Y"),  # Format date
            "warehouse_id": inventory.warehouse_id.id if inventory.warehouse_id else None,
            "locations": locations_data,
            "dimensions": dimensions_data
        }
        return JsonResponse(data)


    # PUT method: Update single inventory record
    elif request.method == 'PUT':
        if authenticate_clearance_level(user, [1, 2]):
            return Response({'errors': "Unauthorized - Insufficient clearance level"}, status=status.HTTP_403_FORBIDDEN)
        try:
            data = request.json()
            inventory = Inventory.objects.get(pk=inventory_id)
            inventory_record = InventoryRecord.objects.filter(inventory_id=inventory, charge_to__isnull=True).first()

            
            category = data.get('category', inventory.category)
            charge_by = data.get('charge_by', inventory.charge_by)
            custom_charge = data.get('custom_charge', inventory.custom_charge)
            custom_charge_value = data.get('custom_charge_value', inventory.custom_charge_value)
            date_added = datetime.datetime.strptime(data.get('date_added', inventory.date_added.strftime('%m/%d/%Y')), '%m/%d/%Y')
            warehouse_id = data.get('warehouse_id', inventory.warehouse_id.id)
            locations = data.get('locations')
            bundle_quantity = data.get('bundle_quantity', inventory.bundle_quantity)
            warehouse = Warehouse.objects.get(pk=warehouse_id)

            with transaction.atomic():
                inventory.category = category
                inventory.charge_by = charge_by
                inventory.custom_charge = custom_charge
                inventory.custom_charge_value = custom_charge_value
                inventory.date_added = date_added
                inventory.warehouse_id = warehouse
                inventory.no_bundles = bundle_quantity
                inventory.save()

                # Update InventoryItem records for each product
                InventoryItem.objects.filter(inventory_id=inventory).delete()
                product_data = data.get('products')
                inventory_items = []
                total_quantity = 0
                for product in product_data:
                    total_quantity += product['quantity']
                    item = Item.objects.get(pk=product['id'])  # Ensure item exists
                    inventory_items.append(InventoryItem(
                        inventory_id=inventory,
                        item_id=item,
                        quantity=product['quantity']
                    ))
                InventoryItem.objects.bulk_create(inventory_items)

                # Update InventoryLocation records
                InventoryLocation.objects.filter(inventory_id=inventory).delete()
                inventory_locations = []
                for location in locations:
                    location = Locations.objects.get(pk=location['id'])  # Ensure location exists
                    inventory_locations.append(InventoryLocation(
                        inventory_id=inventory,
                        location_id=location,
                    ))
                InventoryLocation.objects.bulk_create(inventory_locations)

                # Update Box records
                Box.objects.filter(inventory_id=inventory).delete()
                dimension_data = data.get('dimensions')
                boxes = []
                for dimension in dimension_data:
                    boxes.append(Box(
                        inventory_id=inventory,
                        length=dimension['length'],
                        width=dimension['width'],
                        height=dimension['height'],
                        weight=dimension['weight'],
                        box_quantity=dimension['quantity'],
                    ))
                Box.objects.bulk_create(boxes)

                if bundle_quantity:
                    record_quantity = bundle_quantity
                else:
                    record_quantity = total_quantity

                inventory_record.charge_from = date_added
                inventory_record.quantity = record_quantity
                inventory_record.save()

                BoxRecord.objects.filter(inventory_record_id=inventory_record).delete()

                boxes = []
                for dimension in dimension_data:
                    boxes.append(BoxRecord(
                        inventory_id=inventory_record,
                        length=dimension['length'],
                        width=dimension['width'],
                        height=dimension['height'],
                        weight=dimension['weight'],
                        box_quantity=dimension['quantity'],
                    ))
                BoxRecord.objects.bulk_create(boxes)

            return JsonResponse({'status': 'success', 'message': 'Inventory updated successfully.'}, status=200)

        except Warehouse.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Warehouse not found.'}, status=404)
        except Item.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'One or more items not found.'}, status=404)
        except Inventory.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Inventory record not found.'}, status=404)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


    # DELETE method: Delete single inventory record
    elif request.method == 'DELETE':
        if authenticate_clearance_level(user, [1, 2]):
            return Response({'errors': "Unauthorized - Insufficient clearance level"}, status=status.HTTP_403_FORBIDDEN)
        try:


            with transaction.atomic():
                # Retrieve the inventory to delete
                inventory = Inventory.objects.get(pk=inventory_id)

                # Delete related InventoryItem records
                InventoryItem.objects.filter(inventory_id=inventory).delete()

                # Delete related InventoryLocation records
                InventoryLocation.objects.filter(inventory_id=inventory).delete()

                # Delete related Box records
                Box.objects.filter(inventory_id=inventory).delete()

                # Delete related BoxRecord records via InventoryRecord
                inventory_records = InventoryRecord.objects.filter(inventory_id=inventory, charge_to__isnull=True).first()
                for ir in inventory_records:
                    BoxRecord.objects.filter(inventory_id=ir).delete()
                inventory_records.delete()

                # Finally, delete the inventory record itself
                inventory.delete()

                return JsonResponse({'status': 'success', 'message': 'Inventory and related entities deleted successfully.'}, status=200)

        except Inventory.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Inventory not found.'}, status=404)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def modify_inventory(request, inventory_id):
    user = request.user

    # Check if the user has access
    try:
        inventory = Inventory.objects.get(pk=inventory_id)
    except Inventory.DoesNotExist:
        return JsonResponse({'error': 'Inventory not found'}, status=404)


    
    if request.method == 'PUT':
        if authenticate_clearance_level(user, [1, 2]):
            return Response({'errors': "Unauthorized - Insufficient clearance level"}, status=status.HTTP_403_FORBIDDEN)
        try:
            data = request.json()
            inventory = Inventory.objects.get(pk=inventory_id)
            inventory_record = InventoryRecord.objects.filter(inventory_id=inventory, charge_to__isnull=True).first()

            
            # ONLY THESE FIELDS ARE EDITABLE IN MODIFY (PRDUCTS, DIMENSIONS AS WELL SEE BELOW)
            date_added = datetime.datetime.strptime(data.get('date_added', inventory.date_added.strftime('%m/%d/%Y')), '%m/%d/%Y')
            locations = data.get('locations')
            bundle_quantity = data.get('bundle_quantity', inventory.bundle_quantity)


            with transaction.atomic():
                inventory.date_added = date_added
                inventory.no_bundles = bundle_quantity
                inventory.save()

                # Update InventoryItem records for each product
                InventoryItem.objects.filter(inventory_id=inventory).delete()
                product_data = data.get('products')
                inventory_items = []
                total_quantity = 0
                for product in product_data:
                    total_quantity += product['quantity']
                    item = Item.objects.get(pk=product['id'])  
                    inventory_items.append(InventoryItem(
                        inventory_id=inventory,
                        item_id=item,
                        quantity=product['quantity']
                    ))
                InventoryItem.objects.bulk_create(inventory_items)

                # Update InventoryLocation records
                InventoryLocation.objects.filter(inventory_id=inventory).delete()
                inventory_locations = []
                for location in locations:
                    location = Locations.objects.get(pk=location['id']) 
                    inventory_locations.append(InventoryLocation(
                        inventory_id=inventory,
                        location_id=location,
                    ))
                InventoryLocation.objects.bulk_create(inventory_locations)

                # Update Box records
                Box.objects.filter(inventory_id=inventory).delete()
                dimension_data = data.get('dimensions')
                boxes = []
                for dimension in dimension_data:
                    boxes.append(Box(
                        inventory_id=inventory,
                        length=dimension['length'],
                        width=dimension['width'],
                        height=dimension['height'],
                        weight=dimension['weight'],
                        box_quantity=dimension['quantity'],
                    ))
                Box.objects.bulk_create(boxes)

                if bundle_quantity:
                    record_quantity = bundle_quantity
                else:
                    record_quantity = total_quantity

                inventory_record.charge_to = date_added
                inventory_record.save()


                new_inventory_record = InventoryRecord.objects.create(
                    inventory_id=inventory,
                    charge_from=date_added,
                    quantity=record_quantity
                )

                boxes = []
                for dimension in dimension_data:
                    boxes.append(BoxRecord(
                        inventory_id=new_inventory_record,
                        length=dimension['length'],
                        width=dimension['width'],
                        height=dimension['height'],
                        weight=dimension['weight'],
                        box_quantity=dimension['quantity'],  
                    ))
                BoxRecord.objects.bulk_create(boxes)

            return JsonResponse({'status': 'success', 'message': 'Inventory updated successfully.'}, status=200)

        except Warehouse.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Warehouse not found.'}, status=404)
        except Item.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'One or more items not found.'}, status=404)
        except Inventory.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Inventory record not found.'}, status=404)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


    