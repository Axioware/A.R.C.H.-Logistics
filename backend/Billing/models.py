from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from Structures.models import Services
from Inventory.models import Item
from Orders.models import Orders, SubOrders
import os
from datetime import datetime

# Create your models here.

def dynamic_upload_path(instance, filename):
    # Get the file extension
    ext = filename.split('.')[-1]

    # Example: Using instance attributes to determine the path
    # You can access any field of the instance, like instance.title
    # This example saves PDFs under a folder named after the current year/month
    path = f'pdfs/{instance.category}/{datetime.now().strftime("%Y/%m/%d")}'
    
    # Optionally, change the filename to a unique one if needed
    filename = f"{instance.title}_{datetime.now().strftime('%Y%m%d%H%M%S')}.{ext}"
    
    # Return the full path
    return os.path.join(path, filename)


class Invoice(models.Model):
    invoice_id = models.AutoField(primary_key=True)
    order_id = models.ForeignKey(Orders, on_delete=models.DO_NOTHING, null=True)
    invoice_pdf = models.FileField(upload_to=dynamic_upload_path, blank=True, null=True) #TODO
    amount = models.DecimalField(max_digits=20, decimal_places=2)
    paid = models.BooleanField(default=False, null=False)
    date_created = models.DateField(default=timezone.now, blank=True, null=True)
    date_paid = models.DateField(blank=True, null=True)
    due_date = models.DateField(blank=True, null=True)


class Balance(models.Model):
    balance_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="balance_user_id")
    balance = models.DecimalField(max_digits=10, decimal_places=2)

class Transaction(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="transaction_user_id")
    invoice_id = models.ForeignKey(Invoice, on_delete=models.PROTECT)
    date = models.DateTimeField(default=timezone.now)


# Charges Table
class Charges(models.Model):
    charge_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='charges_user_id')
    sub_order_id = models.ForeignKey(SubOrders, on_delete=models.DO_NOTHING, blank=True, null=True, related_name='charges_service_id') #TODO  
    invoice_id = models.ForeignKey(Invoice, on_delete=models.DO_NOTHING, null=True, related_name='charges_invoice_id')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    date_charged = models.DateTimeField(default=timezone.now)
    note = models.CharField(max_length=100, null=True, blank=True)


class CustomRates(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_id_custom_rates")
    service_id = models.ForeignKey(Services, on_delete=models.CASCADE, related_name="service_id_custom_rates")
    custom_charge = models.DecimalField(max_digits=12, decimal_places=2)