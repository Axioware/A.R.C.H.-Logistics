from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse, HttpResponse
from django.core.serializers import serialize
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth.models import User
from API.models import *
from rest_framework import status, pagination
from django.contrib.auth.hashers import make_password
from django.db.models import Q, Sum, F
from django.db import transaction
from Prep_Prime.helpers import *
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.utils.dateparse import parse_datetime
import random
import pytz
import ast
from rest_framework.parsers import JSONParser
from .helpers import *
import json
from itertools import groupby
from operator import itemgetter
from Prep_Prime import settings
from django.db.models import Q
from itertools import groupby
from operator import itemgetter
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def orders(request):
    user = request.userUserExtended_FieldUpdate

    if request.method == "GET":
        try:
            # Get query parameters
            client_id = request.query_params.get('client_id')
            active = request.query_params.get('active')
            date_start = request.query_params.get('date_start')
            date_end = request.query_params.get('date_end')
            completed = request.query_params.get('completed')
            search = request.query_params.get('search')

            # Filter the queryset based on provided query parameters
            filters = Q()
            if client_id:
                filters &= Q(client_id=client_id)
            if active is not None:
                filters &= Q(active=(active.lower() == 'true'))
            # if completed is not None:
            #     filters &= Q(completed=(completed.lower() == 'true'))
            if date_start and date_end:
                filters &= Q(placed_date__range=[date_start, date_end])
            elif date_start:
                filters &= Q(placed_date__gte=date_start)
            elif date_end:
                filters &= Q(placed_date__lte=date_end)
            if search:
                filters &= Q(service_id__icontains=search) | Q(client_id__extended__llc_name__icontains=search)

            # Apply filters and get distinct records by service_id (with only the first occurrence)

            if completed is not None:
                service_details = (ServiceDetail.objects
                           .filter(filters)
                           .order_by('service_id')
                           .select_related('client_id')
                           .values('service_id', 'item_id', 'service_code', 'category_id', 'placed_date'))

                # Fetch records from ShipmentDetails
                shipment_details = (ShipmentDetails.objects
                                    .filter(filters)
                                    .order_by('service_id')
                                    .select_related('client_id')
                                    .values('service_id', 'item_id', 'service_code', 'category_id', 'placed_date'))
                                        # Combine the records based on unique service_id
                all_services = list(service_details) + list(shipment_details)
            else:
                all_services = (ServiceDetailHistory.objects
                                .filter(filters)
                                .order_by('service_id')
                                .select_related('client_id')
                                .values('service_id', 'item_id', 'service_code', 'category_id', 'placed_date'))
            # Convert the QuerySet to a list of dictionaries with distinct service_ids
            unique_services = []
            for key, group in groupby(all_services, key=itemgetter('service_id')):
                first_service = next(group)  # Get the first service in the group
                unique_services.append(first_service)
            service_list = list(unique_services)

            # Return the filtered results
            return Response(service_list, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    if request.method == 'POST':
        try:
            errors = {}
            data = request.data
            # print(body_data)
            if authenticate_prep(user):
                return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
            if not authenticate_client(user):
                client_id = data.get('client_id')
                client = User.objects.get(id=client_id)
                if not client_id:
                    return Response({'error': 'client id is required'}, status=status.HTTP_400_BAD_REQUEST)
                print('ASSDHFJHGHGJHGJHGJHGH')
            else:
                client = user
            fnsku_files = request.FILES.getlist('fnsku_files[]')
            box_label_files = request.FILES.getlist('box_label_files[]')
            trackings = data.get('trackings')
            # trackings = ast.literal_eval(trackings)
            print(trackings)
            service_id = generate_service_id(client)
            body_data = data.get('body_data')
            body_data = json.loads(body_data)
            # print(service_id)
            for index, service_details in enumerate(body_data):
                
                # Extract fields from request data
                item_ids = service_details.get('item_id')
                service_code = service_details.get('service_code')
                category_id = service_details.get('category_id')
    
                additional_service = service_details.get('additional_service', '')
                additional_format = service_details.get('additional_format', '')
                additional_format_text = service_details.get('additional_format_text', '')
                additional_format_file = service_details.get('additional_format_file', None)
                quantities = service_details.get('quantity', [])
                fnsku = fnsku_files[index] if index < len(fnsku_files) else None
                box_label = box_label_files[index] if index < len(box_label_files) else None
                placed_date = timezone.now()
                packing_instructions = service_details.get('packing_instructions', '')
                pallet = service_details.get('pallet', False)
                bundle_quantity = service_details.get('bundle_quantity', [])        
                no_bundles = service_details.get('no_bundles')    
    
    
                #-----------------------------------------------------------------------------------------------------------------------
                if not (len(item_ids) == len(quantities)):
                    return Response({'error': 'items and quantities do not match'}, status=status.HTTP_400_BAD_REQUEST)
                if len(bundle_quantity) > 0:
                    if not (len(bundle_quantity) == len(item_ids)):
                            return Response({'error': 'items and bundle quantities do not match'}, status=status.HTTP_400_BAD_REQUEST)
    
                if not service_code:
                    errors['service_code'] = 'service id is required'
                if not category_id:
                    errors['category_id'] = 'category id is required'
                if not fnsku:
                    errors['fnsku'] = 'fnsku is required'
                if not len(item_ids) > 0:
                    errors['item_id'] = 'atleast one item id is required'

                if errors:
                    return Response({'error': errors}, status=status.HTTP_400_BAD_REQUEST)
                
                for number in range(len(item_ids)):
                    item_id = item_ids[number]
                    item = Item.objects.get(item_id=item_id) if item_id else None
                    service_category = ServiceCategory.objects.get(service_code=service_code) if service_code else None
                    category = OrderCategory.objects.get(category_id=category_id) if category_id else None
                    quantity = quantities[number]
                    
                    if item is None:
                        errors['item'] = 'Item does not exist'
                    if service_category is None:
                        errors['service_id'] = 'service id does not exist'
                    if category is None:
                        errors['category'] = 'category does not exist'
                    if len(quantity) != 3:
                        errors['quantity'] = 'source quantity in wrong format'    
                    
                    if errors:
                        return Response({'error': errors}, status=status.HTTP_400_BAD_REQUEST)
                    b_quantity = None
                    if bundle_quantity:
                        if len(bundle_quantity) > 0:
                            b_quantity = bundle_quantity[number]
                    with transaction.atomic():
                        if number == 0:
                            service_detail = ServiceDetail.objects.create(
                                service_id=service_id,
                                item_id=item,
                                service_code=service_category,
                                category_id=category,
                                client_id=client,
                                no_bundles=no_bundles,
                                bundle_quantity=b_quantity if b_quantity else None,
                                additional_service=additional_service,
                                additional_format=additional_format,
                                additional_format_text=additional_format_text,
                                additional_format_file=additional_format_file,
                                quantity_from_inventory=quantity[0],
                                quantity_from_recent_received=quantity[1],
                                quantity_from_new_shipment=quantity[2],
                                fnsku=fnsku,
                                box_label=box_label,
                                placed_date=placed_date,
                                packing_instructions=packing_instructions,
                                pallet=pallet
                            )
                        else:
                            bundle_order = BundleOrder.objects.create(
                                service_id=service_id,
                                item_id=service_detail.item_id,
                                service_code=service_code,
                                category_id=category_id,
                                other_item=item,
                                quantity_from_inventory=quantity[0],
                                quantity_from_recent_received=quantity[1],
                                quantity_from_new_shipment=quantity[2],
                            )
            with transaction.atomic():
                for track in trackings:
                    print(track)
                    received_item = Received.objects.create(
                                tracking_id=track,
                                client_id=client,
                                tracking_type='Box',
                                date_received=None,
                                completed=False,
                                assigned=True
                            )
                    assigned = Received_Service.objects.create(
                        tracking_id=received_item,
                        service_id=service_id
                    )
            # Return successful response
            return Response({"message": "Order created successfully!", "service_id": service_detail.service_id}, status=status.HTTP_201_CREATED)
        
        except Item.DoesNotExist:
            return Response({"error": "Item not found."}, status=status.HTTP_400_BAD_REQUEST)
        except ServiceCategory.DoesNotExist:
            return Response({"error": "Service category not found."}, status=status.HTTP_400_BAD_REQUEST)
        except OrderCategory.DoesNotExist:
            return Response({"error": "Order category not found."}, status=status.HTTP_400_BAD_REQUEST)
        except Bin.DoesNotExist:
            return Response({"error": "Bin not found."}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "Client not found."}, status=status.HTTP_400_BAD_REQUEST)
        # except Exception as e:
            # return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({"error": "Invalid HTTP method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_dimensions(request):
    try:
        # Extract the main data
        data = request.data
        service_id = data.get('service_id')
        client_id = data.get('client_id')
        data_list = data.get('data')

        # Ensure service_id, client_id, and data are present
        if not service_id or not client_id or not data_list:
            return Response({'error': 'service_id, client_id, and data are required.'}, status=400)

        # Validate if the client exists
        try:
            client = User.objects.get(id=client_id)
        except User.DoesNotExist:
            return Response({'error': 'Invalid client_id. Client does not exist.'}, status=400)
        
        unique_service_set = set()  # To track unique service objects
        unique_service_list = []

        # Start a database transaction
        with transaction.atomic():
            # Loop over each item in the data list
            for entry in data_list:
                service_codes = entry.get('service_code', [])
                category_ids = entry.get('category_id', [])
                item_ids = entry.get('item_ids', [])
                boxes = entry.get('boxes', [])
                units = entry.get('unit', [])
                dimensions_list = entry.get('dimensions', [])

                wrong_format = data.get('wrong_format', False)
                box_charge_small = data.get('box_charge_small', [])
                box_charge_small_service = data.get('box_charge_small_service', [])
                box_charge_medium = data.get('box_charge_medium', [])
                box_charge_medium_service = data.get('box_charge_medium_service', [])
                box_charge_large = data.get('box_charge_large', [])
                box_charge_large_service = data.get('box_charge_large_service', [])
                pallet_charge = data.get('pallet_charge', None)
                picture_charge = data.get('picture_charge', None)
                trackings = data.get('trackings', [])

                # Validate lengths of the lists
                if len(box_charge_small) != len(box_charge_small_service):
                    return Response({"error": "The length of box_charge_small does not match the length of box_charge_small_service"}, status=status.HTTP_400_BAD_REQUEST)

                if len(box_charge_medium) != len(box_charge_medium_service):
                    return Response({"error": "The length of box_charge_medium does not match the length of box_charge_medium_service"}, status=status.HTTP_400_BAD_REQUEST)

                if len(box_charge_large) != len(box_charge_large_service):
                    return Response({"error": "The length of box_charge_large does not match the length of box_charge_large_service"}, status=status.HTTP_400_BAD_REQUEST)

                
                # Validate the required fields
                if not service_codes or not category_ids or not item_ids or boxes is None:
                    return Response({'error': 'Each entry must have service_code, category_id, item ids, and boxes.'}, status=400)
                
                # Check if boxes length matches dimensions length
                if len(dimensions_list) != len(boxes):
                    return Response({'error': 'The length of dimensions must match the number of boxes.'}, status=400)
                
                # Create Dimension and ServiceBox objects
                dimension_objects = []
                for index, dimension_data in enumerate(dimensions_list):
                    # Create the Dimension object
                    dimension_obj = Dimension.objects.create(
                        service_id=service_id,
                        item_id=item_ids[index] if index < len(item_ids) else None,
                        service_code=service_codes[index] if index < len(service_codes) else None,
                        category_id=category_ids[index] if index < len(category_ids) else None,
                        length=dimension_data.get('length'),
                        width=dimension_data.get('width'),
                        height=dimension_data.get('height'),
                        weight=dimension_data.get('weight'),
                        quantity=boxes[index] if index < len(boxes) else 1,
                        shipped=False
                    )


                    #append service detail objects 
                    service_obj = ServiceDetail.objects.get(
                        service_id=service_id, 
                        item_id=item_ids[index], 
                        service_code=service_codes[index], 
                        category_id=category_ids[index])
                    
                    if service_obj.id not in unique_service_set:  # Use the primary key or a unique field
                        unique_service_list.append(service_obj)
                        unique_service_set.add(service_obj.id)  # Add the unique identifier to the set

                    
                    dimension_objects.append(dimension_obj)

                    # Create ServiceBox objects for each item id
                    for item_index, item_id in enumerate(item_ids):
                        # print(service_id, item_ids[item_index], service_codes[item_index], category_ids[item_index])
                        ServiceBox.objects.create(
                            service_id=service_id,
                            item_id=item_ids[item_index],  # Assuming you have an Item model
                            service_code=service_codes[item_index] if item_index < len(service_codes) else None,
                            category_id=category_ids[item_index] if item_index < len(category_ids) else None,
                            quantity=units[item_index] if item_index < len(units) else None,
                            box=dimension_obj
                        )

                        service_obj = ServiceDetail.objects.get(
                                        service_id=service_id, 
                                        item_id=item_ids[item_index], 
                                        service_code=service_codes[item_index], 
                                        category_id=category_ids[item_index])
                        
                        
                    
                        if service_obj.id not in unique_service_set:  # Use the primary key or a unique field
                            unique_service_list.append(service_obj)
                            unique_service_set.add(service_obj.id) 


                #----------------------------- Move records to ShipmentDetails ----------------------
            unique_shipment_set = set()
            for i in unique_service_set:
                service_obj = ServiceDetail.objects.get(pk=i)
                # Create a corresponding ShipmentDetails record
                obj = ShipmentDetails.objects.create(
                    service_id=service_id,
                    item_id=service_obj.item_id,
                    service_code=service_obj.service_code,
                    category_id=service_obj.category_id,
                    bin_id=service_obj.bin_id,
                    client_id=client,
                    no_bundles=service_obj.no_bundles,
                    bundle_quantity=service_obj.bundle_quantity,
                    additional_service=service_obj.additional_service,
                    additional_format=service_obj.additional_format,
                    additional_format_text=service_obj.additional_format_text,
                    additional_format_file=service_obj.additional_format_file,
                    quantity_from_inventory=service_obj.quantity_from_inventory,
                    quantity_from_recent_received=service_obj.quantity_from_recent_received,
                    quantity_from_new_shipment=service_obj.quantity_from_new_shipment,
                    fnsku=service_obj.fnsku,
                    box_label=service_obj.box_label,
                    placed_date=service_obj.placed_date,
                    active_service_start_date=service_obj.active_service_start_date,
                    state=service_obj.state,
                    pallet=service_obj.pallet,
                    packing_instructions=service_obj.packing_instructions,
                    service_provided_date=timezone.now()  # Set the current date for service_provided_date
                )


                unique_shipment_set.add(obj.id) 


                # Delete the original record from ServiceDetail
                service_obj.delete()

                #-----------------------------charges----------------------
            shipment = ShipmentDetails.objects.filter(service_id=service_id).first()
            
            for id in unique_shipment_set:
                service = ShipmentDetails.objects.get(pk=id)
                charge = get_charges(service)
                Charges.objects.create(
                    client_id=client,
                    service_id=shipment,
                    item_id=service.item_id,
                    service_code=service.service_code,
                    category_id=service.category_id,
                    amount=charge
                )
            
            
            if wrong_format:
                Charges.objects.create(
                    client_id=client,
                    service_id=shipment,
                    amount=1.99,
                    note='wrong_format'
                )
            if picture_charge:
                Charges.objects.create(
                    client_id=client,
                    service_id=shipment,
                    amount=1.99*int(picture_charge),
                    note='pallet charge * {}'.format(picture_charge)
                )
            if pallet_charge:
                Charges.objects.create(
                    client_id=client,
                    service_id=shipment,
                    amount=1.99*int(pallet_charge),
                    note='wrong_format * {}'.format(pallet_charge)
                )
            
            
            for i in range(len(box_charge_small)):
                obj = box_charge_small_service[i]
                Charges.objects.create(
                    client_id=client,
                    service_id=shipment,
                    item_id=Item.objects.get(item_id=obj.get('item_id')) if obj.get('item_id') else None,
                    service_code=ServiceCategory.objects.get(service_code=obj.get('service_code')) if obj.get('service_code') else None,
                    category_id=OrderCategory.objects.get(category_id=obj.get('category_id')) if obj.get('category_id') else None,
                    amount=1.99*box_charge_small[i],
                    note='small box charge 1.99 x {}'.format(box_charge_small[i])
                )

            for i in range(len(box_charge_medium)):
                obj = box_charge_medium_service[i]

                Charges.objects.create(
                    client_id=client,
                    service_id=shipment,
                    item_id=Item.objects.get(item_id=obj.get('item_id')) if obj.get('item_id') else None,
                    service_code=ServiceCategory.objects.get(service_code=obj.get('service_code')) if obj.get('service_code') else None,
                    category_id=OrderCategory.objects.get(category_id=obj.get('category_id')) if obj.get('category_id') else None,
                    amount=2.49*box_charge_medium[i],
                    note='small box charge 1.99 x {}'.format(box_charge_medium[i])
                )
            for i in range(len(box_charge_large)):
                obj = box_charge_large_service[i]
                Charges.objects.create(
                    client_id=client,
                    service_id=shipment,
                    item_id=Item.objects.get(item_id=obj.get('item_id')) if obj.get('item_id') else None,
                    service_code=ServiceCategory.objects.get(service_code=obj.get('service_code')) if obj.get('service_code') else None,
                    category_id=OrderCategory.objects.get(category_id=obj.get('category_id')) if obj.get('category_id') else None,
                    amount=2.99*box_charge_large[i],
                    note='small box charge 1.99 x {}'.format(box_charge_large[i])
                )
            #---------------------- Trackings ------------------------
            for i in trackings:
                track_obj = Received.objects.get(tracking_id=i)
                Received_Service.objects.create(
                    tracking_id = track_obj,
                    service_id = service_id,
                )
        # Return a success response
        return Response({'message': 'Service boxes created successfully.'}, status=201)

    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def trackings(request):
    user = request.user

    # Handle GET request to list all received records with their images #TODO
    if request.method == 'GET':
        try:
            # Get query parameters for filtering
            client_id = request.query_params.get('client_id', None)
            completed = request.query_params.get('completed', None)
            date_start = request.query_params.get('date_start', None)
            date_end = request.query_params.get('date_end', None)
            search_query = request.query_params.get('search', None)

            # Start with all records
            received_items = Received.objects.all()

            # Apply filters based on the query parameters
            if client_id:
                received_items = received_items.filter(client_id=client_id)
            
            if completed is not None:
                if type(completed) == bool:
                    received_items = received_items.filter(completed=completed)

            if date_start:
                date_start_parsed = parse_datetime(date_start)
                if date_start_parsed:
                    received_items = received_items.filter(date_received__gte=date_start_parsed)

            if date_end:
                date_end_parsed = parse_datetime(date_end)
                if date_end_parsed:
                    received_items = received_items.filter(date_received__lte=date_end_parsed)

            if search_query:
                # Filter by tracking_id or LLC name in the related UsersExtended model
                received_items = received_items.filter(
                Q(tracking_id__icontains=search_query) |
                Q(client_id__extended__llc_name__icontains=search_query)  # 'extended' is the related_name used in UsersExtended
    )

            # Select specific fields
            received_items = received_items.values('tracking_id', 'client_id', 'date_received', 'completed', 'assigned')

            # Prepare response data
            received_list = []
            for received in received_items:
                # Fetch all related images for each received item
                images = ReceivedImage.objects.filter(received_id=received['tracking_id']).values('id', 'image')

                # Convert each image URL to its full URL
                full_images = []
                for image in images:
                    dic = {
                            'id': image['id'],
                            'image': request.build_absolute_uri(f"{settings.MEDIA_URL}{image['image']}")  # Create full URL for the image
                        }
                    full_images.append(dic)
                # Add images list with full URLs to each received item
                received['images'] = full_images
                received_list.append(received)

            return Response(received_list, status=200)


        except Exception as e:
            return Response({"error": str(e)}, status=500)

    # Handle POST request to create a new record and upload associated images
    if request.method == 'POST':
        try:
            data_list = request.data  # Expecting a list of dictionaries
            data_list = json.loads(data_list)
            
            if not isinstance(data_list, list):
                return Response({"error": "Expected a list of objects"}, status=400)

            results = []  # To store the response for each item
            with transaction.atomic():  # Ensure atomicity across the entire operation
                for data in data_list:
                    tracking_id = data.get('tracking_id')
                    tracking_type = data.get("tracking_type")
                    client_id = data.get('client_id')  # Ensure client_id exists in User model
                    date_received = data.get('date_received', None)  # Optional
                    completed = data.get('completed', False)
                    assigned = data.get('assigned', False)

                    # Validate mandatory fields
                    if not tracking_id:
                        results.append({"error": "tracking_id is required"})
                        continue
                    
                    # Check if the user is authenticated and is a client
                    if authenticate_client(request.user):
                        client = request.user
                    else:
                        if not client_id:
                            results.append({"error": "client_id is required"})
                            continue
                        try:
                            client = User.objects.get(id=client_id)  # Ensure only valid clients are accepted
                        except User.DoesNotExist:
                            results.append({"error": f"Invalid client_id, User not found for tracking_id {tracking_id}"})
                            continue

                    # Process tracking information
                    try:
                        tracking = Received.objects.get(tracking_id=tracking_id)
                        tracking.date_received = timezone.now() if date_received is None else date_received
                        tracking.client_id = client
                        tracking.tracking_type = tracking_type
                        tracking.completed = completed
                        tracking.assigned = assigned
                        tracking.save()
                        results.append({"message": f"Success. Updated existing record for tracking_id {tracking_id}"})
                    except Received.DoesNotExist:
                        # Create a new tracking record if it does not exist
                        received_item = Received.objects.create(
                            tracking_id=tracking_id,
                            client_id=client,
                            tracking_type=tracking_type if tracking_type else None,
                            date_received=date_received if date_received else None,
                            completed=completed,
                            assigned=assigned
                        )
                        # Handle image uploads if any
                images = request.FILES.getlist('images')
                if images:
                    for image in images:
                        ReceivedImage.objects.create(received=received_item, image=image)

                        results.append({"message": f"Success. Created new record for tracking_id {tracking_id}"})

            return Response(results, status=201)

        except Exception as e:
            return Response({"error": str(e)}, status=500)

    # If not GET or POST method
    return Response({"error": "Invalid HTTP method"}, status=405)



@api_view(['GET', 'DELETE'])
@permission_classes([IsAuthenticated])
def order_tracking(request, order_id):
    if request.method == 'GET':
        try:
            # Filter Received_Service records where service_id matches the given order_id
            received_services = Received_Service.objects.filter(service_id=order_id)

            # Prepare the response data with tracking_id and date_received from related Received table
            response_data = [
                {
                    'tracking_id': received_service.tracking_id.tracking_id,
                    'date_received': received_service.tracking_id.date_received
                }
                for received_service in received_services
                if received_service.tracking_id  # Ensure related tracking_id exists
            ]

            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    if request.method == 'DELETE':
        errors = {}
        data = request.data
        tracking_ids = data.get('tracking_ids')
        for tracking in tracking_ids:
            try:
                t1 = Received.objects.get(tracking)
                t2 = Received_Service.objects.get(tracking_id=t1)
                t2.delete()
            except:
                errors['key'] = "tracking does not exist"

    return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_service_details(request, order_id):
    try:
        # Fetch records from ServiceDetail, ShipmentDetails, and ServiceDetailHistory
        service_details = ServiceDetail.objects.filter(service_id=order_id)
        shipment_details = ShipmentDetails.objects.filter(service_id=order_id)
        service_detail_history = ServiceDetailHistory.objects.filter(service_id=order_id)

        # Combine all the records
        all_records = list(service_details) + list(shipment_details) + list(service_detail_history)

        # Prepare response data
        response_data = []

        for record in all_records:
            # Base data for all records
            data = {
                'item_id': record.item_id.item_id if isinstance(record, ServiceDetail) or isinstance(record, ServiceDetailHistory) else record.item_id.item_id,
                'item_name': record.item_id.item_name if isinstance(record, ServiceDetail) or isinstance(record, ServiceDetailHistory) else record.item_id.item_name,
                'service_code': record.service_code.service_code if isinstance(record, ServiceDetail) or isinstance(record, ServiceDetailHistory) else record.service_code.id,
                'category_id': record.category_id.category_id if isinstance(record, ServiceDetail) or isinstance(record, ServiceDetailHistory) else record.category_id.category_id,
                'service_name': record.service_code.name if isinstance(record, ServiceDetail) or isinstance(record, ServiceDetailHistory) else record.service_code.name,
                'category_name': record.category_id.category_name if isinstance(record, ServiceDetail) or isinstance(record, ServiceDetailHistory) else record.category_id.category_name,
                'quantity_from_inventory': record.quantity_from_inventory,
                'quantity_from_recent_received': record.quantity_from_recent_received,
                'quantity_from_new_shipment': record.quantity_from_new_shipment,
                'active_service_start_date': record.active_service_start_date,
                'service_provided_date': getattr(record, 'service_provided_date', None),  # Might not be present in ServiceDetailHistory
                'fnsku_file': record.fnsku.url if record.fnsku else None,
                'state': record.state,
            } 

            # If the bundle field is True, fetch the related BundleOrder records
            try:
                bundle_orders = BundleOrder.objects.filter(
                    service_id=record.service_id,
                    item_id=data['item_id'],
                    service_code=data['service_code'],
                    category_id=data['category_id']
                )
                # Add bundle information to the data
                data['bundle_orders'] = [{
                    'other_item': bundle_order.other_item.item_name,
                    'quantity_from_inventory': bundle_order.quantity_from_inventory,
                    'quantity_from_recent_received': bundle_order.quantity_from_recent_received,
                    'quantity_from_new_shipment': bundle_order.quantity_from_new_shipment
                } for bundle_order in bundle_orders]

                # Append the prepared data to the response list
                response_data.append(data)
            except:
                pass

        return Response(response_data, status=200)

    except Exception as e:
        return Response({'error': str(e)}, status=500)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_shipment_and_history_details(request, order_id):
    try:
        # Fetch records from ShipmentDetails and ServiceDetailHistory
        shipment_details = ShipmentDetails.objects.filter(service_id=order_id)
        service_detail_history = ServiceDetailHistory.objects.filter(service_id=order_id)

        # Combine all the records
        all_records = list(shipment_details) + list(service_detail_history)

        # Prepare response data
        response_data = []

        for record in all_records:
            # Fetch item name and category details
            # item_name = record.item_id.item_name if isinstance(record, ShipmentDetails) else record.item_id.item_name
            # category = record.category_id.category_name if record.category_id else None

            data = {
                'item_id': record.item_id.item_id if isinstance(record, ShipmentDetails) or isinstance(record, ServiceDetailHistory) else record.item_id.item_id,
                'item_name': record.item_id.item_name if isinstance(record, ShipmentDetails) or isinstance(record, ServiceDetailHistory) else record.item_id.item_name,
                'service_code': record.service_code.service_code if isinstance(record, ShipmentDetails) or isinstance(record, ServiceDetailHistory) else record.service_code.id,
                'category_id': record.category_id.category_id if isinstance(record, ShipmentDetails) or isinstance(record, ServiceDetailHistory) else record.category_id.category_id,
                # 'service_name': record.service_code.name if isinstance(record, ShipmentDetails) or isinstance(record, ServiceDetailHistory) else record.service_code.name,
                # 'category_name': record.category_id.category_name if isinstance(record, ShipmentDetails) or isinstance(record, ServiceDetailHistory) else record.category_id.category_name,
                'quantity_from_inventory': record.quantity_from_inventory,
                'quantity_from_recent_received': record.quantity_from_recent_received,
                'quantity_from_new_shipment': record.quantity_from_new_shipment,
                # 'active_service_start_date': record.active_service_start_date,
                # 'service_provided_date': getattr(record, 'service_provided_date', None),  # Might not be present in ServiceDetailHistory
                'fba_file': record.box_label.url if record.box_label else None,
                'state': record.state,
            } 

            try:
                bundle_orders = BundleOrder.objects.filter(
                    service_id=record.service_id,
                    item_id=data['item_id'],
                    service_code=data['service_code'],
                    category_id=data['category_id']
                )
                # Add bundle information to the data
                data['bundle_orders'] = [{
                    'other_item': bundle_order.other_item.item_name,
                    'quantity_from_inventory': bundle_order.quantity_from_inventory,
                    'quantity_from_recent_received': bundle_order.quantity_from_recent_received,
                    'quantity_from_new_shipment': bundle_order.quantity_from_new_shipment
                } for bundle_order in bundle_orders]

                # Append the prepared data to the response list
            except:
                pass

            try:
                dimensions = Dimension.objects.filter(
                    service_id=record.service_id,
                    item_id=data['item_id'],
                    service_code=data['service_code'],
                    category_id=data['category_id']
                )
                # Add bundle information to the data
                data['dimensions'] = [{
                    {
                        'quantity': dimension.quantity,
                        'weight': dimension.weight,
                        'height': dimension.height,
                        'length': dimension.length,
                        'width': dimension.width
                    }
                } for dimension in dimensions]

                # Append the prepared data to the response list
            except:
                pass
            
            response_data.append(data)

        return Response(response_data, status=200)

    except Exception as e:
        return Response({'error': str(e)}, status=500)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_pallet_details(request, order_id): #TODO Not properly implemented
    try:
        # Fetch records from PalletDimension
        pallet_details = PalletDimension.objects.filter(service_id=order_id)

        # Prepare response data
        response_data = []

        for pallet in pallet_details:
            # Base data for PalletDimension
            data = {
                'item_id': pallet.item_id,
                'service_code': pallet.service_code,
                'category_id': pallet.category_id,
                'length': pallet.length,
                'width': pallet.width,
                'height': pallet.height,
                'weight': pallet.weight,
                'shipped': pallet.shipped,
                'shipped_date': pallet.shipped_date,
                'pallet_label': pallet.pallet_label.url if pallet.pallet_label else None,
            }

            # Fetch related bundle orders if they exist
            try:
                bundle_orders = BundleOrder.objects.filter(
                    service_id=pallet.service_id,
                    item_id=pallet.item_id,
                    service_code=pallet.service_code,
                    category_id=pallet.category_id
                )
                # Add bundle information to the data
                data['bundle_orders'] = [{
                    'other_item': bundle_order.other_item.item_name,
                    'quantity_from_inventory': bundle_order.quantity_from_inventory,
                    'quantity_from_recent_received': bundle_order.quantity_from_recent_received,
                    'quantity_from_new_shipment': bundle_order.quantity_from_new_shipment
                } for bundle_order in bundle_orders]
            except Exception as e:
                pass  # Optionally handle or log the exception

            # Fetch related dimensions if they exist
            try:
                dimensions = Dimension.objects.filter(
                    service_id=pallet.service_id,
                    item_id=pallet.item_id,
                    service_code=pallet.service_code,
                    category_id=pallet.category_id
                )
                # Add dimension information to the data
                data['dimensions'] = [{
                    'quantity': dimension.quantity,
                    'weight': dimension.weight,
                    'height': dimension.height,
                    'length': dimension.length,
                    'width': dimension.width
                } for dimension in dimensions]
            except Exception as e:
                pass  # Optionally handle or log the exception

            # Append the prepared data to the response list
            response_data.append(data)

        return Response(response_data, status=200)

    except Exception as e:
        return Response({'error': str(e)}, status=500)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_service_details_by_service_id(request, service_id):
    try:
        # Fetch all records from ServiceDetail with the specified service_id
        service_details = ServiceDetail.objects.filter(service_id=service_id)

        # If no records found, return a 404 response
        if not service_details.exists():
            return Response({'error': 'No service details found for the specified service ID.'}, status=404)

        # Prepare the response data
        response_data = []

        for detail in service_details:
            # Basic service detail data
            data = {
                'service_id': detail.service_id,
                'item_id': detail.item_id.item_id if detail.item_id else None,
                'service_code': detail.service_code.id if detail.service_code else None,
                'category_id': detail.category_id.id if detail.category_id else None,
                'bin_id': detail.bin_id.id if detail.bin_id else None,
                'client_id': detail.client_id.id,
                'no_bundles': detail.no_bundles,
                'bundle_quantity': detail.bundle_quantity,
                'additional_service': detail.additional_service,
                'additional_format': detail.additional_format,
                'additional_format_text': detail.additional_format_text,
                'quantity_from_inventory': detail.quantity_from_inventory,
                'quantity_from_recent_received': detail.quantity_from_recent_received,
                'quantity_from_new_shipment': detail.quantity_from_new_shipment,
                'placed_date': detail.placed_date,
                'active_service_start_date': detail.active_service_start_date,
                'state': detail.state,
                'pallet': detail.pallet,
                'packing_instructions': detail.packing_instructions,
            }

            # Fetch related BundleOrder records if they exist
            bundle_orders = BundleOrder.objects.filter(
                service_id=detail.service_id,
                item_id=detail.item_id.item_id if detail.item_id else None,
                service_code=detail.service_code.id if detail.service_code else None,
                category_id=detail.category_id.id if detail.category_id else None
            )
            if bundle_orders.exists():
                data['bundle_orders'] = [
                    {
                        'other_item': bundle.other_item.item_id,
                        'quantity_from_inventory': bundle.quantity_from_inventory,
                        'quantity_from_recent_received': bundle.quantity_from_recent_received,
                        'quantity_from_new_shipment': bundle.quantity_from_new_shipment
                    }
                    for bundle in bundle_orders
                ]

            # Fetch related Dimension records if they exist
            dimensions = Dimension.objects.filter(
                service_id=detail.service_id,
                item_id=detail.item_id.item_id if detail.item_id else None,
                service_code=detail.service_code.id if detail.service_code else None,
                category_id=detail.category_id.id if detail.category_id else None
            )
            if dimensions.exists():
                data['dimensions'] = [
                    {
                        'length': dimension.length,
                        'width': dimension.width,
                        'height': dimension.height,
                        'weight': dimension.weight,
                        'quantity': dimension.quantity
                    }
                    for dimension in dimensions
                ]

            # Add the prepared data to the response list
            response_data.append(data)

        # Return the response data
        return Response(response_data, status=200)

    except Exception as e:
        # Handle any other exceptions
        return Response({'error': str(e)}, status=500)
    


