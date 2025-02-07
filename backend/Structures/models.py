from django.db import models

# Create your models here.
class Services(models.Model):
    service_id = models.AutoField(primary_key=True)
    service_name = models.CharField(max_length=50, null=False)
    service_charge = models.FloatField(default=0.0)

# class InventoryChargeChoices(models.TextChoices):
#     icc_id = models.AutoField(primary_key=True)
#     icc_name = models.CharField(max_length=30)
#     icc_charge = models.DecimalField(max_digits=12, decimal_places=2)


class Warehouse(models.Model):
    warehouse_id = models.AutoField(primary_key=True)
    warehouse_name = models.CharField(max_length=50, default=None)
    address = models.CharField(max_length=100, default=None, null=True)
    city = models.CharField(max_length=50, default=None, null=True)
    state = models.CharField(max_length=50, default=None, null=True)
    country = models.CharField(max_length=50, default=None, null=True)
    zip_code = models.CharField(max_length=10, default=None, null=True)
    phone = models.CharField(max_length=15, default=None, null=True)
    email = models.EmailField(max_length=100, default=None, null=True)

    def __str__(self):
        return f"{self.warehouse_name}"
    

class Locations(models.Model):
    LOCATION_TYPE_CHOICES = [
        ('Bin', 'Bin'),
        ('Other', 'Other'),
    ]

    location_id = models.AutoField(primary_key=True)
    location_type = models.CharField(max_length=10, choices=LOCATION_TYPE_CHOICES)
    location_name = models.CharField(max_length=50)
    warehouse_id = models.ForeignKey(Warehouse, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.location_name} - ({self.warehouse_id})"
    