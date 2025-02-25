from django.db import models
from Inventory.models import Item
from Structures.models import Locations, Services, Warehouse
from django.utils import timezone
from django.conf import settings

# Create your models here.
class Orders(models.Model):
    order_id = models.CharField(max_length=100, primary_key=True)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING)
    
    ORDERS_CATEGORY_CHOICES = [
        ('fba', 'FBA'),
        ('fbm', 'FBM'),
        ('storage', 'Storage'),
        ('other', 'Other'),
    ]


    category = models.CharField(
        max_length=10, 
        choices=ORDERS_CATEGORY_CHOICES, 
    )

    order_charge = models.DecimalField(max_digits=10, decimal_places=4, default=0)
    completed = models.BooleanField(default=False)
    create_date = models.DateTimeField(default=timezone.now)
    start_date = models.DateTimeField(default=None, null=True, blank=True)
    completed_date = models.DateTimeField(default=None, null=True, blank=True)

    def __str__(self):
        return f"{self.order_id}"


class SubOrders(models.Model):

    PHASE_CHOICES = [
        ('pending', 'Pending'),
        ('active', 'Active'),
        ('picked', 'Picked'),
        ('packed', 'Packed'),
        ('shipped', 'Shipped'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    sub_order_id = models.AutoField(primary_key=True)
    sub_order_type = models.ManyToManyField(Services, related_name="sub_order_type_sub_order")
    order_id = models.ForeignKey(Orders, on_delete=models.CASCADE, related_name="order_id_sub_order")
    warehouse = models.ForeignKey(Warehouse, on_delete=models.DO_NOTHING, related_name="warehouse_sub_order")
    no_bundles = models.IntegerField(default=None, null=True, blank=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)
    active = models.BooleanField(default=False, null=True, blank=True)
    order_start_date = models.DateTimeField(blank=True, null=True)
    # state = models.CharField(max_length=50, null=True, blank=True)
    phase = models.CharField(max_length=15, choices=PHASE_CHOICES, null=True)
    dispute_from_client = models.BooleanField(default=False, blank=True, null=True)
    dispute_from_warehouse = models.BooleanField(default=False, blank=True, null=True)
    dispute_from_va = models.BooleanField(default=False, blank=True, null=True)
    dispute_note_client = models.CharField(max_length=255, null=True, blank=True)
    dispute_note_warehouse = models.CharField(max_length=255, null=True, blank=True)
    dispute_note_va = models.CharField(max_length=255, null=True, blank=True)
    bundle = models.BooleanField(default=False, null=True, blank=True)
    packing_instructions = models.CharField(max_length=100, null=True, blank=True)
    pallet = models.BooleanField(default=False, null=True, blank=True)
    from_vendor = models.CharField(max_length=50, default=None, null=True, blank=True) #Amazon, Ebay etc
    completed = models.BooleanField(default=False)
    completed_date = models.DateTimeField(default=None, null=True, blank=True) 

    def __str__(self):
        return f"Sub Order ID - {self.sub_order_id}"
    

class SubOrderFile(models.Model):
    order_id = models.ForeignKey(Orders, on_delete=models.CASCADE)
    file = models.FileField(upload_to='labels/', blank=True, null=True, default=None)
    format = models.CharField(max_length=100, blank=True, null=True) #A4, A3. Custom
    text = models.CharField(max_length=100, blank=True, null=True, default=None) #Text on label
    format_width = models.IntegerField(blank=True, null=True, default=0)
    format_height = models.IntegerField(blank=True, null=True, default=0)
    type = models.CharField(max_length=50, blank=True, null=True, default=None)

class SubOrderItem(models.Model): #Bundle Orders or Mixed SKUs
    sub_order_id = models.ForeignKey(SubOrders, on_delete=models.CASCADE)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.IntegerField(null=False)

class PalletDimension(models.Model):
    sub_order_id = models.ForeignKey(SubOrders, on_delete=models.CASCADE, null=True, blank=True)
    length = models.DecimalField(max_digits=10, decimal_places=3)
    width = models.DecimalField(max_digits=10, decimal_places=3)
    height = models.DecimalField(max_digits=10, decimal_places=3)
    weight = models.DecimalField(max_digits=10, decimal_places=3)
    shipped = models.BooleanField(default=False, null=True, blank=True)
    shipped_date = models.DateTimeField(default=None, null=True, blank=True)

class Box(models.Model):
    sub_order_id = models.ForeignKey(SubOrders, on_delete=models.CASCADE, null=True, blank=True)
    # pallet = models.ForeignKey(PalletDimension, null=True, blank=True, default=None, on_delete=models.SET_NULL)
    length = models.DecimalField(max_digits=10, decimal_places=3)
    width = models.DecimalField(max_digits=10, decimal_places=3)
    height = models.DecimalField(max_digits=10, decimal_places=3)
    weight = models.DecimalField(max_digits=10, decimal_places=3)
    box_quantity = models.IntegerField(null=False, blank=False)
    item_quantity = models.IntegerField(null=False, blank=False)
    shipped = models.BooleanField(default=False, null=True, blank=True)
    shipped_date = models.DateTimeField(default=None, null=True, blank=True)