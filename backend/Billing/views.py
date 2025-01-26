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
from .models import *
from rest_framework import status, pagination
from django.contrib.auth.hashers import make_password
from django.db.models import Q, Sum, F
from django.db import transaction
from Arch_Logistics.helpers import *
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.utils.dateparse import parse_datetime
import random
import pytz
import ast
from rest_framework.parsers import JSONParser
# from API.helpers import *
import json
from itertools import groupby
from operator import itemgetter
from Arch_Logistics import settings, helpers
from django.db.models import Q
from itertools import groupby
from operator import itemgetter
from rest_framework.response import Response
from rest_framework import status
from .helpers import *
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from io import BytesIO
from django.core.files.base import ContentFile
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from io import BytesIO
from django.core.files.base import ContentFile



from django.shortcuts import get_object_or_404

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def custom_rates_list(request):
    user = request.user
    if authenticate_prep(user):
        return Response()
    if request.method == 'GET':
        try:
            # Fetch all records from CustomRates
            custom_rates = CustomRates.objects.all().select_related('client_id', 'service_code', 'category_id')

            print(custom_rates)
            
            # Prepare the response data
            response_data = [
                {
                    'id': rate.id,
                    'client_id': rate.client_id.id,
                    'llc_name': rate.client_id.extended.llc_name if hasattr(rate.client_id, 'extended') else None,
                    'first_name': rate.client_id.first_name,
                    'last_name': rate.client_id.last_name,
                    'service_code': rate.service_code.service_code,
                    'category_id': rate.category_id.category_id,
                    'service_name': rate.service_code.name,
                    'category_name': rate.category_id.category_name,
                    'charges': rate.charges
                }
                for rate in custom_rates
            ]
            

            paginator = UserPagination()
            page = paginator.paginate_queryset(response_data, request)
            if page is not None:
                return paginator.get_paginated_response(page)
            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'POST':
        if authenticate_client(user) or authenticate_prep(user):
            return Response({"error": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)
        try:
            # Extract data from request
            data = request.data
            client_id = data.get('client_id')
            service_code = data.get('service_code')
            category_id = data.get('category_id')
            charges = data.get('charges')

            # Validate the required fields
            if not client_id or not service_code or not category_id or not charges:
                return Response({'error': 'All fields (client_id, service_code, category_id, charges) are required.'},
                                status=status.HTTP_400_BAD_REQUEST)

            # Fetch the related objects
            client = get_object_or_404(User, pk=client_id)
            service_category = get_object_or_404(ServiceCategory, pk=service_code)
            order_category = get_object_or_404(OrderCategory, pk=category_id)

            # Create a new CustomRates entry
            custom_rate = CustomRates.objects.create(
                client_id=client,
                service_code=service_category,
                category_id=order_category,
                charges=charges
            )

            # Return the created record
            return Response({
                "message": "success"
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def custom_rate_detail(request, rate_id):
    try:
        # Fetch the specific CustomRates record
        custom_rate = get_object_or_404(CustomRates, pk=rate_id)

        if request.method == 'GET':
            # Return the custom rate details
            data = {
                'id': custom_rate.id,
                'client_id': custom_rate.client_id.id,
                'llc_name': custom_rate.client_id.extended.llc_name if hasattr(custom_rate.client_id, 'extended') else None,
                'first_name': custom_rate.client_id.first_name,
                'last_name': custom_rate.client_id.last_name,
                'address': custom_rate.client_id.extended.address if hasattr(custom_rate.client_id, 'extended') else None,
                'service_code': custom_rate.service_code.service_code,
                'category_id': custom_rate.category_id.category_id,
                'service_name': custom_rate.service_code.name,
                'category_name': custom_rate.category_id.category_name,
                'charges': custom_rate.charges
            }
            return Response(data, status=status.HTTP_200_OK)

        elif request.method == 'PUT':
            # Update the custom rate details
            data = request.data
            custom_rate.charges = data.get('charges', custom_rate.charges)
            custom_rate.save()

            # Return the updated custom rate details
            updated_data = {
                'id': custom_rate.id,
                'client_id': custom_rate.client_id.id,
                'llc_name': custom_rate.client_id.extended.llc_name if hasattr(custom_rate.client_id, 'extended') else None,
                'first_name': custom_rate.client_id.first_name,
                'last_name': custom_rate.client_id.last_name,
                'address': custom_rate.client_id.extended.address if hasattr(custom_rate.client_id, 'extended') else None,
                'service_code': custom_rate.service_code.service_code,
                'category_id': custom_rate.category_id.category_id,
                'charges': custom_rate.charges
            }
            return Response(updated_data, status=status.HTTP_200_OK)

        elif request.method == 'DELETE':
            # Delete the custom rate record
            custom_rate.delete()
            return Response({'message': 'Custom rate deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def custom_user_rate_detail(request, service_code):
    client_id = request.query_params.get('client_id', '')
    if client_id is None:
        return Response({"error":"client id is required"}, status=status.HTTP_400_BAD_REQUEST)
    client = get_object_or_404(User, pk=client_id)
    try:
        custom_rate = CustomRates.objects.get(service_code=service_code, client_id=client)
    except:
        custom_rate = None
    service = get_object_or_404(ServiceCategory, service_code=service_code)

    try:
        if request.method == 'GET':
            # Return the custom rate details
            if custom_rate is None:
                # print("hello world")
                # return Response(None, status=status.HTTP_200_OK)
                return Response({"error":"record does not exist"}, status=status.HTTP_400_BAD_REQUEST)
            
            data = {
                'service_code': custom_rate.service_code.service_code,
                'category_id': custom_rate.category_id.category_id,
                'charges': custom_rate.charges
            }
            print(data)
            return Response(data, status=status.HTTP_200_OK)

        elif request.method == 'PUT':
            charges = request.data.get('charges', '')
            if charges is None:
                return Response({"error":"charge is required"}, status=status.HTTP_400_BAD_REQUEST)
            
            if custom_rate is None:
                category = service.category_id
                new = CustomRates.objects.create(
                    client_id = client,
                    service_code = service,
                    category_id = category,
                    charges = charges
                )
            else:
                custom_rate.charges = charges
                custom_rate.save()

            return Response({'message': 'rates updated.'}, status=status.HTTP_202_ACCEPTED)            

        elif request.method == 'DELETE':
            # Delete the custom rate record
            custom_rate.delete()
            return Response({'message': 'Custom rate deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'POST']) 
@permission_classes([IsAuthenticated])
def charges_by_service_id(request, service_id):
    user = request.user
    if request.method == 'GET':
        try:
            # Fetch all charges with the given service_id
            service = get_service_obj(service_id)
            charges = Charges.objects.filter(service_id=service).values(
                'charge_id', 'client_id', 'service_id', 'item_id', 'service_code', 'category_id', 
                'invoice_id', 'amount', 'date_charged', 'note'
            )

            
            if authenticate_client(user):
                if charges[0].client_id == user:
                    return Response({"error": "unauthorized"}, status=status.HTTP_403_FORBIDDEN)

            charges_list = list(charges)
            return Response({"data": charges_list}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'POST':
        if authenticate_client(user) or authenticate_prep(user) or authenticate_VA(user):
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)
        try:
            service = ServiceDetail.objects.filter(service_id=service_id).first()
            if service is None:
                service = ShipmentDetails.objects.filter(service_id=service_id).first()
                if service is None:
                    service = ServiceDetailHistory.objects.filter(service_id=service_id).first()
                    if service is None:
                        return Response({"error": "order does not exist"}, status=status.HTTP_400_BAD_REQUEST)
                    
            data = request.data
            client_id = service.client_id
            item_id = data.get('item_id', '')
            service_code = data.get('service_code', '')
            category_id = data.get('category_id', '')
            amount = data.get('amount')
            note = data.get('note', '')

            try:
                item_id = Item.objects.get(User, pk=item_id)
            except:
                item_id = None
            
            try:
                service_code = get_object_or_404(ServiceCategory, pk=service_code)
            except:
                service_code = None
            try:
                category_id = get_object_or_404(OrderCategory, pk=category_id)
            except:
                category_id = None


            # Validate the required fields
            if not (amount):
                return Response({"error": "amount is required."}, status=status.HTTP_400_BAD_REQUEST)

            # Create a new charge record
            charge = Charges.objects.create(
                client_id=client_id,
                service_id=service,
                item_id=item_id,
                service_code=service_code,
                category_id=category_id,
                invoice_id=None,
                amount=amount,
                note=note,
            )

            # Response with the created charge details
            return Response({
                "success": "charge created"}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

@api_view(['GET', 'DELETE', 'PUT']) 
@permission_classes([IsAuthenticated])
def single_charge(request, charge_id):
    user = request.user

    try:
        # Fetch the specific charge record by charge_id
        if authenticate_client(user):
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)
        charge = Charges.objects.get(charge_id=charge_id)

        # Handle GET request to retrieve charge details
        if request.method == 'GET':
            charge_data = {
                'charge_id': charge.charge_id,
                'client_id': charge.client_id.id,
                'service_id': charge.service_id.id if charge.service_id else None,
                'item_id': charge.item_id.id if charge.item_id else None,
                'service_code': charge.service_code.id if charge.service_code else None,
                'category_id': charge.category_id.id if charge.category_id else None,
                'invoice_id': charge.invoice_id.id if charge.invoice_id else None,
                'amount': charge.amount,
                'date_charged': charge.date_charged,
                'note': charge.note
            }
            return Response(charge_data, status=status.HTTP_200_OK)

        # Handle DELETE request to delete the charge
        elif request.method == 'DELETE':
            charge.delete()
            return Response({"success": "Charge deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

        # Handle PUT request to update the charge
        elif request.method == 'PUT':
            data = request.data
            charge.amount = data.get('amount', charge.amount)
            charge.note = data.get('note', charge.note)
            charge.service_code_id = data.get('service_code', charge.service_code_id)
            charge.category_id_id = data.get('category_id', charge.category_id_id)
            charge.item_id_id = data.get('item_id', charge.item_id_id)
            charge.invoice_id_id = data.get('invoice_id', charge.invoice_id_id)

            # Save updated charge
            charge.save()
            return Response({"success": "Charge updated successfully"}, status=status.HTTP_200_OK)

    except Charges.DoesNotExist:
        return Response({"error": "Charge not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
from django.core.files.storage import default_storage
from django.conf import settings
import os
from io import BytesIO
from datetime import datetime

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_invoice(request, service_id):
    try:
        service = get_service_obj(service_id)
        # Fetch charges for the given service_id that have not been invoiced yet
        charges = Charges.objects.filter(service_id=service, invoice_id=None)

        if not charges.exists():
            return Response({"error": "No charges available for this service_id or all have been invoiced."}, status=status.HTTP_404_NOT_FOUND)

        # Prepare PDF in memory
        buffer = BytesIO()
        p = canvas.Canvas(buffer, pagesize=A4)
        width, height = A4
        y_position = height - 50  # Start position for text

        # Add header to PDF
        p.setFont("Helvetica-Bold", 14)
        p.drawString(100, y_position, f"Invoice for Order: {service_id}")
        y_position -= 40

        # Iterate through charges and add details to PDF
        p.setFont("Helvetica", 12)
        for charge in charges:
            note = charge.note if charge.note else "N/A"
            service_name = charge.service_code.name if charge.service_code else "N/A"
            category_name = charge.category_id.category_name if charge.category_id else "N/A"
            amount = charge.amount

            charge_text = f"Note: {note}, Service: {service_name}, Category: {category_name}, Amount: {amount}"
            p.drawString(50, y_position, charge_text)
            y_position -= 20  # Move down for the next line

            if y_position < 40:  # New page if we're out of space
                p.showPage()
                y_position = height - 50

        p.save()  # Finalize the PDF

        # Save PDF to `static/invoices` directory
        buffer.seek(0)
        pdf_filename = f"invoice_{service_id}_{datetime.now().strftime('%Y%m%d%H%M%S')}.pdf"
        pdf_path = os.path.join(settings.BASE_DIR, 'static', 'invoices', pdf_filename)

        # Ensure the directory exists
        os.makedirs(os.path.dirname(pdf_path), exist_ok=True)

        with open(pdf_path, 'wb') as pdf_file:
            pdf_file.write(buffer.read())

        # Save Invoice entry in the Invoice table
        with transaction.atomic():
            invoice = Invoice.objects.create(
                amount=charges.aggregate(total_amount=Sum('amount'))['total_amount'],
                invoice_pdf=f'media/invoices/{pdf_filename}',  # Store relative path for the model
                date_created=timezone.now()
            )

            # Update all charges to set invoiced=True
            charges.update(invoice_id=invoice)

        return Response({"message": "Invoice created successfully.", "invoice_id": invoice.invoice_id}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
