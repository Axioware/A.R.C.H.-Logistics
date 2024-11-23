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

# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_received(request):
    user = request.user
    inbound_id = request.query_params.get('inbound_id')
    tracking_id = request.query_params.get('tracking_id')
    client_id = request.query_params.get('client_id')

    queryset = Received.objects.all()

    # Access control
    if user.extended.role not in ['Owner', 'Manager', 'Virtual Assistant', 'Prep Team', 'Lower Staff', 'Client']:
        return Response({"error": "Unauthorized - Insufficient permissions"}, status=status.HTTP_403_FORBIDDEN)

    # Filter based on user role
    if user.extended.role == 'Client':
        queryset = queryset.filter(client_id=user.id)

    # Apply additional filters
    if inbound_id:
        queryset = queryset.filter(inbound_id=inbound_id)
    
    if tracking_id:
        queryset = queryset.filter(tracking_id=tracking_id)
    
    if client_id:
        queryset = queryset.filter(client_id=client_id)

    # Manually convert queryset to a list of dictionaries
    received_data = []
    for entry in queryset:
        received_data.append({
            "inbound_id": entry.inbound_id,
            "client_id": entry.client_id.id if entry.client_id else None,
            "tracking_id": entry.tracking_id,
            "picture": entry.picture.url if entry.picture else None,  # Handle image URL
            "date": entry.date
        })

    # Pagination
    paginator = UserPagination()
    page = paginator.paginate_queryset(received_data, request)
    
    if page is not None:
        return paginator.get_paginated_response(page)

    return Response(received_data, status=status.HTTP_200_OK)

# POST /api/received/
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_received(request):
    user = request.user

    # Access control - only employees can create
    if user.extended.role not in ['Owner', 'Manager', 'Virtual Assistant', 'Prep Team', 'Lower Staff']:
        return Response({"error": "Unauthorized - Insufficient permissions"}, status=status.HTTP_403_FORBIDDEN)

    data = request.data
    try:
        received = Received.objects.create(
            inbound_id=data.get('inbound_id'),
            client_id_id=data.get('client_id'),
            tracking_id=data.get('tracking_id'),
            picture=data.get('picture'),
            date=data.get('date')
        )
        return Response({"message": "Received entry created successfully", "received": received.tracking_id}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)