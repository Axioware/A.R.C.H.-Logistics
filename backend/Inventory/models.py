from django.db import models
from django.contrib.auth.models import User
from Structures.models import Locations, Services
from django.utils import timezone
from django.conf import settings
# Create your models here.
# Item Table
class Item(models.Model):
    item_id = models.CharField(max_length=20, primary_key=True)
    item_name = models.CharField(max_length=100)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='item_user_id')
    item_description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.item_id}"
    
    class Meta:
        unique_together = ('user_id', 'item_id')


# Inventory Table
class Inventory(models.Model):
    CATEGORY_CHOICES = [
        ('FBA', 'FBA'),
        ('FBM', 'FBM'),
        ('Storage', 'Storage'),
        ('Other', 'Other'),
    ]

    item_id = models.ForeignKey(Item, on_delete=models.PROTECT, related_name="item_id_inventory")
    location_id = models.ForeignKey(Locations, blank=True, null=True, on_delete=models.PROTECT, related_name="location_id_inventory")
    quantity = models.IntegerField()
    category = models.CharField(
        max_length=10,
        choices=CATEGORY_CHOICES, 
    )
    pack_size = models.IntegerField() 
    no_bundles = models.IntegerField()
    date_added = models.DateTimeField(default=timezone.now)
    boxes = models.IntegerField(default=0)
    charge_by = models.ForeignKey(Services, on_delete=models.SET_NULL, verbose_name="Charge By", null=True)
    pallet = models.BooleanField(default=False)

class BundleInventory(models.Model): #TODO PACK SIZE AND SO ON. 
    other_item = models.ForeignKey(Item, on_delete=models.DO_NOTHING, related_name="inventory_second_item")
    quantity = models.IntegerField()
    inventory_id = models.ForeignKey(Inventory, on_delete=models.CASCADE, related_name="Inventory_bundle_inventory")

class Discard(models.Model):
    discard_id = models.AutoField(primary_key=True)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="discard_item_id")
    date_added = models.DateTimeField()
    date_discarded = models.DateTimeField(default=timezone.now)
    quantity = models.IntegerField()
    client_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True, related_name="discard_client_id")
    location_id = models.ForeignKey(Locations, on_delete=models.CASCADE, blank=True, null=True, related_name="discard_bin_id")
    dimension_id = models.IntegerField(null=True)
    boxes = models.IntegerField(default=0)

class Removal(models.Model):
    removal_id = models.AutoField(primary_key=True)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="removal_item_id")
    date = models.DateTimeField(default=timezone.now)
    quantity = models.IntegerField(null=True)
    client_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="removal_client_id", null=True)
    location_id = models.ForeignKey(Locations, on_delete=models.CASCADE, blank=True, null=True, related_name="removal_bin_id")
    dimension_id = models.IntegerField(null=True)
    boxes = models.IntegerField(default=0)