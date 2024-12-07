from django.db import models
from Users.models import Warehouse
from django.contrib.auth.models import User

# Create your models here.
class Services(models.Model):
    SERVICE_CATEGORY_CHOICES = [
        ('FBA', 'FBA'),
        ('FBM', 'FBM'),
        ('Storage', 'Storage'),
        ('Other', 'Other'),
    ]
    
    service_id = models.AutoField(primary_key=True)
    category = models.CharField(
        max_length=10, 
        choices=SERVICE_CATEGORY_CHOICES, 
    )
    service_name = models.CharField(max_length=20)
    service_charge = models.DecimalField(max_digits=10, decimal_places=2) 

    def __str__(self):
        return f"{self.service_name} - ({self.category})"


class InventoryChargeChoices(models.TextChoices):
    icc_id = models.AutoField(primary_key=True)
    icc_name = models.CharField(max_length=30)
    icc_charge = models.DecimalField(max_digits=8, decimal_places=2)

class Locations(models.Model):
    location_id = models.AutoField(primary_key=True)
    location_name = models.CharField(max_length=50)
    warehouse_id = models.ForeignKey(Warehouse)

    def __str__(self):
        return f"{self.location_name} - ({self.warehouse_id})"

# Charges Table
class Charges(models.Model):
    charge_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='user_charges')
    order_id = models.ForeignKey(ShipmentDetails, on_delete=models.DO_NOTHING, blank=True, null=True, related_name='charges_service_id') #TODO
    item_id = models.ForeignKey(Item, on_delete=models.DO_NOTHING, blank=True, null=True, related_name='charges_item_id')
    service_id = models.ForeignKey(Services, on_delete=models.DO_NOTHING, blank=True, null=True, related_name='charges_service_code')  
    invoice_id = models.ForeignKey(Invoice, on_delete=models.DO_NOTHING, null=True, related_name='charges_invoice_id')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date_charged = models.DateTimeField(default=timezone.now)
    note = models.CharField(max_length=100, null=True, blank=True)


class CustomRates(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_id_custom_rates")
    service_id = models.ForeignKey(Services, on_delete=models.CASCADE, related_name="service_id_custom_rates")
    custom_charge = models.DecimalField(max_digits=10, decimal_places=2)

