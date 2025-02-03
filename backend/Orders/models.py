from django.db import models
from Users.models import User
from Inventory.models import Item, Inventory
from Structures.models import Locations, Orders
from django.utils import timezone
from django.conf import settings

# # Create your models here.
# class Orders(models.Model):
#     order_id = models.CharField(max_length=50, primary_key=True)
#     user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING)

class SubOrders(models.Model): #TODO Completed Orders

    PHASE_CHOICES = [
        ('pending', 'Pending'),
        ('active', 'Active'),
        ('picked', 'Picked'),
        ('packed', 'Packed'),
        ('shipped', 'Shipped'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    def pdf_directory_path_fnksu(self, name):
        return 'fnsku/{0}_{1}_{2}_{3}_{4}'.format(self.order_id, self.item_id, self.order_id, self.sub_order_id, name)
    
    def pdf_directory_path_additional(self):
        return 'fnsku/{0}_{1}_{2}_{3}_additional'.format(self.order_id, self.item_id, self.sub_order_id, self.order_id)
    
    def pdf_directory_path_fba(self):
        return 'fba/{0}_{1}_{2}_{3}'.format(self.order_id, self.item_id, self.order_id, self.sub_order_id)

    sub_order_id = models.CharField(max_length=100, primary_key=True)
    order_id = models.ForeignKey(Orders, on_delete=models.DO_NOTHING)
    item_id = models.ManyToManyField(Item, related_name="item_id_sub_order")
    order_id = models.ForeignKey(Orders, on_delete=models.PROTECT, related_name="order_id_sub_order")
    location_id = models.ForeignKey(Locations, on_delete=models.SET_NULL, null=True, blank=True)
    no_bundles = models.IntegerField(default=None, null=True, blank=True)
    bundle_quantity = models.IntegerField(default=None, null=True, blank=True)
    additional_order = models.CharField(max_length=40, blank=True, null=True)
    additional_format = models.CharField(max_length=40, blank=True, null=True)
    additional_format_text = models.CharField(max_length=100, blank=True, null=True, default=None)
    additional_format_file = models.FileField(upload_to=pdf_directory_path_additional, blank=True, null=True, default=None)
    active = models.BooleanField(default=False, null=True, blank=True)
    # quantity_from_inventory = models.IntegerField(blank=True, null=True)
    # quantity_from_recent_received = models.IntegerField(blank=True, null=True)
    # quantity_from_new_shipment = models.IntegerField(blank=True, null=True)
    fnsku_label = models.FileField(upload_to=pdf_directory_path_fnksu, blank=True, null=True, default=None)
    box_label = models.FileField(upload_to=pdf_directory_path_fba, blank=True, null=True, default=None)
    placed_date = models.DateTimeField(default=timezone.now, blank=True, null=True)
    active_order_start_date = models.DateTimeField(blank=True, null=True)
    state = models.CharField(max_length=50, null=True, blank=True)
    phase = models.CharField(max_length=15, choices=PHASE_CHOICES, null=True)
    # from_inventory = models.BooleanField(default=False, blank=True, null=True)
    # combined = models.ForeignKey(CombinedOrder, null=True, blank=True, related_name="CombinedOrder_id", on_delete=models.CASCADE)
    dispute_from_client = models.BooleanField(default=False, blank=True, null=True)
    dispute_from_warehouse = models.BooleanField(default=False, blank=True, null=True)
    dispute_note = models.CharField(max_length=100, null=True, blank=True)
    bundle = models.BooleanField(default=False, null=True, blank=True)
    packing_instructions = models.CharField(max_length=100, null=True, blank=True)
    pallet = models.BooleanField(default=False, null=True, blank=True)

    def __str__(self):
        return f"Order_id {self.order_id} - sub_order_id {self.sub_order_id} - item {self.item_id} - service_id {self.service_id}"
    

class SubOrderItem(models.Model): #Bundle Orders or Mixed SKUs
    sub_order_id = models.ForeignKey(SubOrders, on_delete=models.CASCADE)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.IntegerField(null=False)

class PalletDimension(models.Model):

    # def path_to_image(self):
    #     return 'pallet/{0}_{1}_{2}_{3}_{4}'.format(self.service_id, self.item_id, self.service_code, self.category_id, self.id)

    sub_order_id = models.ForeignKey(SubOrders, on_delete=models.CASCADE, null=True, blank=True)
    inventory_id = models.ForeignKey(Inventory, on_delete=models.CASCADE, null=True, blank=True)
    length = models.DecimalField(max_digits=10, decimal_places=3)
    width = models.DecimalField(max_digits=10, decimal_places=3)
    height = models.DecimalField(max_digits=10, decimal_places=3)
    weight = models.DecimalField(max_digits=10, decimal_places=3)
    shipped = models.BooleanField(default=False, null=True, blank=True)
    shipped_date = models.DateTimeField(default=None, null=True, blank=True)
    pallet_label = models.FileField(null=True, blank=True) #TODO

class Box(models.Model):

    # def path_to_image(self):
    #     return 'box/{0}_{1}_{2}_{3}_{4}'.format(self.service_id, self.item_id, self.service_code, self.category_id, self.id)

    sub_order_id = models.ForeignKey(SubOrders, on_delete=models.CASCADE, null=True, blank=True)
    inventory_id = models.ForeignKey(Inventory, null=True, blank=True, on_delete=models.CASCADE)
    pallet = models.ForeignKey(PalletDimension, null=True, blank=True, default=None, on_delete=models.SET_NULL)
    length = models.DecimalField(max_digits=10, decimal_places=3)
    width = models.DecimalField(max_digits=10, decimal_places=3)
    height = models.DecimalField(max_digits=10, decimal_places=3)
    weight = models.DecimalField(max_digits=10, decimal_places=3)
    box_quantity = models.IntegerField(null=False, blank=False)
    item_quantity = models.IntegerField(null=False, blank=False)
    shipped = models.BooleanField(default=False, null=True, blank=True)
    shipped_date = models.DateTimeField(default=None, null=True, blank=True)
    box_label = models.FileField(null=True, blank=True) #TODO

# class ShippingLabels(models.Model):
 #TODO Labels of every kind

