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
# from  import *
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

def get_charges_for_invoice(service_id):
    charges = Charges.objects.filter(service_id=service_id, invoice_id=None)
    if charges is not None:
        for charge in charges:
            print(charge.amount)

def get_service_obj(service_id):
    service = ServiceDetail.objects.filter(service_id=service_id).first()
    if service is None:
        service = ShipmentDetails.objects.filter(service_id=service_id).first()
        if service is None:
            service = ServiceDetailHistory.objects.filter(service_id=service_id).first()
            if service is None:
                return Response({"error": "order does not exist"}, status=status.HTTP_400_BAD_REQUEST)
    return service