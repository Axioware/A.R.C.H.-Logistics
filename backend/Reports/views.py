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

# Create your views here.

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def report_users_view(request):
#     # Extract filters from query params
#     date_start = request.query_params.get('date_start')
#     date_end = request.query_params.get('date_end')
#     bill_type = request.query_params.get('bill_type')
#     amount_due = request.query_params.get('amount_due')  # Can be True or False
#     user_id = request.query_params.get('user_id')
#     role = request.query_params.get('role')
    
#     # Filtering logic
#     users_qs = UsersExtended.objects.all()

#     # Filter by date range if provided
#     if date_start and date_end:
#         users_qs = users_qs.filter(user__logrecord__date__range=[date_start, date_end])
    
#     # Filter by billing type if provided
#     if bill_type:
#         users_qs = users_qs.filter(billing_type=bill_type)

#     # Filter by amount due if specified
#     if amount_due is not None:
#         # Add logic to filter users based on their outstanding balance, e.g., using Invoice or Charges model.
#         users_qs = users_qs.filter(user__balance_client_id__balance__gt=0) if amount_due == 'true' else users_qs.filter(user__balance_client_id__balance__lte=0)
    
#     # Filter by specific user_id if provided
#     if user_id:
#         users_qs = users_qs.filter(username__id=user_id)
    
#     # Role-based filtering and response structure
#     if role == 'Client':
#         result = users_qs.values(
#             'username_id', 'llc_name', 'item_client_id__item_name', 
#             'item_client_id__inventory_item_id__quantity', 
#             'item_client_id__inventory_item_id__bin_id__bin_name', 
#             'item_client_id__inventory_item_id__category_id__category_name'
#         )
#     elif role in ['Prep Team', 'Virtual Assistant']:
#         result = users_qs.values(
#             'username_id', 'username__first_name', 'username__last_name'
#         ).annotate(
#             hours_worked=Sum('username__logrecord_user_id__check_out_time') - F('username__logrecord_user_id__check_in_time'),
#             tasks_completed=Sum('username__assigned_to_user__task_id__completed')
#         )
#     else:
#         result = users_qs.values('username_id', 'username__first_name', 'username__last_name', 'role')

#     # Return the JSON response
#     return JsonResponse(list(result), safe=False)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def report_inventory(request):
    # Get filters from query parameters
    user_id = request.GET.get('user_id')
    date_start = request.GET.get('date_start')
    date_end = request.GET.get('date_end')
    amount_due = request.GET.get('amount_due')
    bill_type = request.GET.get('bill_type')
    is_active = request.GET.get('is_active')
    bin_no = request.GET.get('bin')

    # Start with all inventory records
    inventory_query = Inventory.objects.all()

    # Filter by user_id (if provided, show inventory of that user only)
    if user_id:
        inventory_query = inventory_query.filter(client_id=user_id)

    # Filter by date range (date_added)
    if date_start and date_end:
        inventory_query = inventory_query.filter(date_added__range=[date_start, date_end])

    # Filter where user's balance is greater than 0 if amount_due is true
    if amount_due == 'true':
        inventory_query = inventory_query.filter(client_id__balance_client_id__balance__gt=0)

    # Filter by billing type (monthly, daily, bi_monthly)
    if bill_type:
        inventory_query = inventory_query.filter(client_id__extended__billing_type=bill_type)

    # Filter active clients if is_active is true
    if is_active == 'true':
        inventory_query = inventory_query.filter(client_id__is_active=True)

    # Filter by bin number
    if bin_no:
        inventory_query = inventory_query.filter(bin_id__bin_name=bin_no)

    # Select the relevant fields to return
    result = inventory_query.values(
        'client_id',  # user_id
        'client_id__extended__llc_name',  # llc_name
        'boxes',  # number of boxes
        'bin_id__bin_name',  # bin
        'date_added',  # date_added to inventory
        'category_id__category_name',  # category
        'dimension'  # dimension
    )

    # Return the result as JSON
    return JsonResponse(list(result), safe=False)