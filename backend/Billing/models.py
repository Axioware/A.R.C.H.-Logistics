from django.db import models
from django.utils import timezone
# from Inventory.models import Item
from Orders.models import Orders, SubOrders
from Structures.models import Services
import os
from datetime import datetime
from django.conf import settings
# Create your models here.

class Invoice(models.Model):
    invoice_id = models.AutoField(primary_key=True)
    order_id = models.ForeignKey(Orders, on_delete=models.DO_NOTHING, null=True, related_name='invoices_order_id')
    invoice_pdf = models.FileField(upload_to="invoices/", blank=True, null=True) #TODO
    amount = models.DecimalField(max_digits=20, decimal_places=4)
    paid = models.BooleanField(default=False, null=False)
    date_created = models.DateField(default=timezone.now, blank=True, null=True)
    date_paid = models.DateField(blank=True, null=True)
    due_date = models.DateField(blank=True, null=True)


class Balance(models.Model):
    balance_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="balance_user_id")
    balance = models.DecimalField(max_digits=20, decimal_places=4)

class Transaction(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="transaction_user_id")
    invoice_id = models.ForeignKey(Invoice, on_delete=models.PROTECT)
    date = models.DateTimeField(default=timezone.now)
    amount = models.DecimalField(max_digits=20, decimal_places=4)


# Charges Table
class Charges(models.Model):
    charge_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, related_name='charges_user_id')
    order_id = models.ForeignKey(Orders, on_delete=models.DO_NOTHING, blank=True, null=True, related_name='charges_order_id')
    sub_order_id = models.ForeignKey(SubOrders, on_delete=models.DO_NOTHING, blank=True, null=True, related_name='charges_sub_order_id') #TODO  
    service_id = models.ForeignKey(Services, on_delete=models.DO_NOTHING, null = True, related_name='charges_service_id')
    invoice_id = models.ForeignKey(Invoice, on_delete=models.DO_NOTHING, null=True, related_name='charges_invoice_id')
    amount = models.DecimalField(max_digits=12, decimal_places=4)
    date_charged = models.DateTimeField(default=timezone.now)
    note = models.CharField(max_length=100, null=True, blank=True)
    void = models.BooleanField(default=False)


class CustomRates(models.Model):
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="custom_rates_user_id")
    service_id = models.ForeignKey(Orders, on_delete=models.CASCADE, related_name="custom_rates_service_id")
    custom_charge = models.DecimalField(max_digits=12, decimal_places=2)