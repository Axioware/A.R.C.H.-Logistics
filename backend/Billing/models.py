from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from Structures.models import Services
from Inventory.models import Item
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
    invoice_pdf = models.FileField(upload_to=dynamic_upload_path, blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    paid = models.BooleanField(default=False)
    date_created = models.DateField(default=timezone.now, blank=True, null=True)
    date_paid = models.DateField(blank=True, null=True)
    due_date = models.DateField(blank=True, null=True)


class Balance(models.Model):
    balance_id = models.AutoField(primary_key=True)
    client_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="balance_client_id")
    balance = models.DecimalField(max_digits=10, decimal_places=2)

class Transaction(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    client_id = models.IntegerField()
    invoice_id = models.ForeignKey(Invoice, on_delete=models.PROTECT)
    date = models.DateTimeField(default=timezone.now)
