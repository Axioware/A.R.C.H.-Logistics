from django.db import models
from django.contrib.auth.models import User
from Structures.models import InventoryChargeChoices, Locations
from django.utils import timezone

# Create your models here.
# Item Table
class Item(models.Model):
    item_id = models.CharField(max_length=20, primary_key=True)
    item_name = models.CharField(max_length=100)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='item_user_id')
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
    charge_by = models.ForeignKey(InventoryChargeChoices, verbose_name="Charge By")
    pallet = models.BooleanField(default=False)