from django.db import models
from django.contrib.auth.models import User
from Structures.models import Locations, Warehouse, Services
from django.utils import timezone
from django.conf import settings
# Create your models here.
# Item Table
class Item(models.Model):
    item_id = models.AutoField(primary_key=True)
    item_sku = models.CharField(max_length=40, null=False)
    item_name = models.CharField(max_length=100, null=False)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='item_user_id')
    item_description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.item_id}"
    
    class Meta:
        unique_together = ('user_id', 'item_id')


class Inventory(models.Model):
    CATEGORY_CHOICES = [
        ('fba', 'FBA'),
        ('fbm', 'FBM'),
        ('storage', 'Storage'),
        ('other', 'Other'),
    ]

    # CHARGE_BY_CHOICES = [
    #     ('unit', 'Unit'),
    #     ('box', 'Box'),
    # ]


    warehouse_id = models.ForeignKey(Warehouse, blank=True, null=True, on_delete=models.PROTECT, related_name="warehouse_id_inventory")
    quantity = models.IntegerField()
    category = models.CharField(
        max_length=10,
        choices=CATEGORY_CHOICES, 
    )
    no_bundles = models.IntegerField(null=True, default=0)
    date_added = models.DateField(default=timezone.now)
    boxes = models.IntegerField(default=0)
    charge_by = models.ForeignKey(Services, on_delete=models.PROTECT, related_name='charge_by_inventory')
    custom_charge = models.BooleanField(default=False)
    custom_charge_value = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    pallet = models.BooleanField(default=False, null=True)
    vendor = models.CharField(max_length=50, null=True)


class InventoryItem(models.Model):
    inventory_id = models.ForeignKey(Inventory, on_delete=models.CASCADE, related_name="inventory_id_inventory_item")
    item_id= models.ForeignKey(Item, on_delete=models.CASCADE, related_name="item_id_inventory_item")
    quantity = models.IntegerField(default=0)

class InventoryLocation(models.Model):
    inventory_id = models.ForeignKey(Inventory, on_delete=models.CASCADE, related_name="inventory_id_inventory_location")
    location_id= models.ForeignKey(Locations, on_delete=models.CASCADE, related_name="location_id_inventory_location")

class InventoryRecord(models.Model):
    inventory_id = models.ForeignKey(Inventory, on_delete=models.CASCADE, related_name='inventory_id_inventory_record')
    charge_from = models.DateField()
    charge_to = models.DateField(null=True)
    quantity = models.IntegerField()


class BoxRecord(models.Model):
    # sub_order_id = models.ForeignKey(SubOrders, on_delete=models.CASCADE, null=True, blank=True, related_name="sub_order_id_box")
    inventory_record_id = models.ForeignKey(InventoryRecord, on_delete=models.CASCADE, null=True, blank=True, related_name="inventory_record_id_box_record")
    # pallet = models.ForeignKey(PalletDimension, null=True, blank=True, default=None, on_delete=models.SET_NULL)
    length = models.DecimalField(max_digits=10, decimal_places=3)
    width = models.DecimalField(max_digits=10, decimal_places=3)
    height = models.DecimalField(max_digits=10, decimal_places=3)
    weight = models.DecimalField(max_digits=10, decimal_places=3)
    box_quantity = models.IntegerField(null=False, blank=False)
    # item_quantity = models.IntegerField(null=False, blank=False)
    # shipped = models.BooleanField(default=False, null=True, blank=True)
    # shipped_date = models.DateTimeField(default=None, null=True, blank=True)


#TODO LATER
# class Discard(models.Model):
#     discard_id = models.AutoField(primary_key=True)
#     item_id = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="discard_item_id")
#     date_added = models.DateTimeField()
#     date_discarded = models.DateTimeField(default=timezone.now)
#     quantity = models.IntegerField()
#     client_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True, related_name="discard_client_id")
#     location_id = models.ForeignKey(Locations, on_delete=models.CASCADE, blank=True, null=True, related_name="discard_bin_id")
#     dimension_id = models.IntegerField(null=True)
#     boxes = models.IntegerField(default=0)

# class Removal(models.Model):
#     removal_id = models.AutoField(primary_key=True)
#     item_id = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="removal_item_id")
#     date = models.DateTimeField(default=timezone.now)
#     quantity = models.IntegerField(null=True)
#     client_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="removal_client_id", null=True)
#     location_id = models.ForeignKey(Locations, on_delete=models.CASCADE, blank=True, null=True, related_name="removal_bin_id")
#     dimension_id = models.IntegerField(null=True)
#     boxes = models.IntegerField(default=0)