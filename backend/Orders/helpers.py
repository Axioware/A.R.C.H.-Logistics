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

from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib import colors
import string

def generate_order_id():
    """Generate a unique 8-character alphanumeric order ID."""
    MAX_TRIES = 3
    for _ in range(MAX_TRIES):
        order_id = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
        if not Orders.objects.filter(order_id=order_id).exists():
            return order_id
    return None

def fba_title_label(date, llc_name, boxes, order_id):
    packet = io.BytesIO()
    c = canvas.Canvas(packet, pagesize=(4*inch, 6*inch))
    width, height = (4*inch, 6*inch)  # Define the width and height of the PDF
    
    # Function to draw centered text
    def draw_centered_text(y, text, size, font="Helvetica", bold=False):
        font_type = f"{font}-Bold" if bold else font
        c.setFont(font_type, size)
        text_width = c.stringWidth(text, font_type, size)
        c.drawString((width - text_width) / 2, y, text)

    # Top date box
    box_height = 0.5 * inch
    y_position = height - box_height - 0.5 * inch
    c.setStrokeColor(colors.black)
    c.rect(0.5 * inch, y_position, width - 1 * inch, box_height)

    draw_centered_text(y_position + 0.15 * inch, date, 12)
    draw_centered_text(y_position - 0.5 * inch, llc_name, 16, bold=True)
    draw_centered_text(y_position - 1.5 * inch, "No of Boxes", 12, bold=True)
    draw_centered_text(y_position - 2.2 * inch, str(boxes), 48, bold=True)
    draw_centered_text(y_position - 3 * inch, "Shipment Name", 12, bold=True)
    draw_centered_text(y_position - 3.5 * inch, order_id, 16, bold=True)
    c.save()

    packet.seek(0)

    return packet


def generate_service_id(client):
    llc = client.extended.llc_name
    if llc is None:
        return
    words = llc.split()
    if len(words) > 2:
        service_id = words[0][0] + words[1][0] + words[2][0]
    elif len(words) > 1 and (len(words[0]) > 1):
        service_id = words[0][0] + words[0][1] + words[1][0] 
    elif len(words) > 1 and (len(words[1]) > 1):
        service_id = words[0][0] + words[1][0] + words[1][1]
    else:
        service_id = words[0][0] + words[0][1] + words[0][2]
    service_id += '_' + str(timezone.now().strftime('%d-%m')) + '_'
    # service_id += '_' + str(timezone.now().strftime('%d-%m')) 
    old = ServiceDetail.objects.filter(service_id__startswith=service_id).last() #TODO the program somehow ignores the 10th entry. 
    if not old:
        service_id += '1'
    else:
        service_id += str(int(old.service_id[10:]) + 1)
    

    return service_id
