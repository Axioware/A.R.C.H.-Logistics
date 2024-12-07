from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import models
from django.contrib.auth.models import User
import os
from datetime import datetime
from django.utils import timezone
import random
import string
from datetime import date

# def dynamic_upload_path(instance, filename):
#     # Get the file extension
#     ext = filename.split('.')[-1]

#     # Example: Using instance attributes to determine the path
#     # You can access any field of the instance, like instance.title
#     # This example saves PDFs under a folder named after the current year/month
#     path = f'pdfs/{instance.category}/{datetime.now().strftime("%Y/%m/%d")}'
    
#     # Optionally, change the filename to a unique one if needed
#     filename = f"{instance.title}_{datetime.now().strftime('%Y%m%d%H%M%S')}.{ext}"
    
#     # Return the full path
#     return os.path.join(path, filename)


# class Warehouse(models.Model):
#     warehouse_id = models.AutoField(primary_key=True)
#     warehouse_name = models.CharField(max_length=50, default=None)
#     address = models.CharField(max_length=100, default=None, blank=True)
#     city = models.CharField(max_length=50, default=None, blank=True)
#     state = models.CharField(max_length=50, default=None, blank=True)
#     country = models.CharField(max_length=50, default=None, blank=True)
#     zip_code = models.CharField(max_length=10, default=None, blank=True)
#     phone = models.CharField(max_length=15, default=None, blank=True)
#     email = models.EmailField(max_length=100, default=None, blank=True)

#     def __str__(self):
#         return f"{self.warehouse_name}"

# class ClearanceLevel(models.Model):
#     level = models.PositiveIntegerField(
#         unique=True,
#         verbose_name="Clearance Level",
#         choices=[(1, 'Level 1'), (2, 'Level 2'), (3, 'Level 3'), (4, 'Level 4')],
#     )
#     name = models.CharField(max_length=50, verbose_name="Clearance Name")

#     def __str__(self):
#         return f"Level {self.level} - {self.name}"

# class UsersExtended(models.Model):
#     # class RoleChoices(models.TextChoices):
#     #     OWNER = 'Owner', 'Owner'
#     #     MANAGER = 'Manager', 'Manager'
#     #     VIRTUAL_ASSISTANT = 'Virtual Assistant', 'Virtual Assistant'
#     #     PREP_TEAM = 'Prep Team', 'Prep Team'
#     #     LOWER_STAFF = 'Lower Staff', 'Lower Staff'
#     #     CLIENT = 'Client', 'Client'

#     class BillingTypeChoices(models.TextChoices):
#         DAILY = 'Daily', 'Daily'
#         MONTHLY = 'Monthly', 'Monthly'
#         BIMONTHLY = 'Bimonthly', 'Bimonthly'

#     username = models.OneToOneField(User, on_delete=models.CASCADE, related_name="extended", verbose_name="Username")
#     phone = models.CharField(max_length=15, blank=True, null=True)
#     email2 = models.CharField(max_length=255, blank=True, null=True, verbose_name="Secondary Email")
#     clearance_level = models.ForeignKey(
#         ClearanceLevel, on_delete=models.SET_NULL, null=True, blank=False, verbose_name="Clearance Level"
#     )
#     # role = models.CharField(max_length=50, choices=RoleChoices.choices, default=RoleChoices.CLIENT, verbose_name="Role")
#     tax_id = models.CharField(max_length=15, blank=True, null=True, verbose_name="Tax ID")
#     address = models.CharField(max_length=255, default=None, verbose_name="Address", blank=True, null=True)
#     billing_type = models.CharField(max_length=10, choices=BillingTypeChoices.choices, default=BillingTypeChoices.MONTHLY, verbose_name="Billing Type", blank=True, null=True)
#     llc_name = models.CharField(max_length=50, default=None, verbose_name="LLC Name", blank=True, null=True)
#     state = models.CharField(max_length=30, default=None, verbose_name="State", blank=True, null=True)
#     city = models.CharField(max_length=30, default=None, verbose_name="City", blank=True, null=True)
#     zip = models.CharField(max_length=20, blank=True, null=True, verbose_name="Zip Code")
#     date_created = models.DateField(default=timezone.now, null=True)
#     last_logout = models.DateTimeField(null=True, blank=True)
#     warehouses = models.ManyToManyField(Warehouse, related_name="users", blank=True)

#     def save(self, *args, **kwargs):
#         if self.username.is_superuser:
#             level_1, created = ClearanceLevel.objects.get_or_create(level=1, defaults={'name': 'Owner'})
#             self.clearance_level = level_1
#         super().save(*args, **kwargs)


#     @receiver(post_save, sender=User)
#     def create_user_profile(sender, instance, created, **kwargs):
#         if created:
#             UsersExtended.objects.create(username=instance)
#         else:
#             instance.extended.save()

#     def __str__(self):
#         return f"{self.username.username} - {self.role}"


# # Received Table
# class Received(models.Model):
#     tracking_id = models.CharField(max_length=32, primary_key=True)
#     client_id = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name='service_category_category_id')
#     tracking_type = models.CharField(max_length=20, null=True, blank=True)
#     date_received = models.DateTimeField(null=True) # null if not received
#     completed = models.BooleanField(default=False) # if this box has 0 quantity left
#     assigned = models.BooleanField(default=False) # assigned to service
    


#     def __str__(self):
#         return f"{self.tracking_id}"

# # ReceivedImage Table for storing multiple images
# class ReceivedImage(models.Model):
#     def path_to_image(self, name):
#         return 'trackings/{0}_{1}'.format(self.received.tracking_id, name)

#     received = models.ForeignKey(Received, on_delete=models.CASCADE, related_name='images')  # Establish a one-to-many relationship
#     image = models.ImageField(upload_to=path_to_image)  # You can customize the path as per your requirements
    
#     def __str__(self):
#         return f"Image for {self.received.tracking_id}"

# #many to many table
# #Received-Service Table
# class Received_Service(models.Model):
#     id = models.AutoField(primary_key=True)
#     tracking_id = models.ForeignKey(Received, on_delete=models.SET_NULL, related_name='received_received_service', null=True)
#     service_id = models.CharField(max_length=20)
#     item_id = models.CharField(max_length=20, null=True, blank=True, default=True)
 
# Item Table
# class Item(models.Model):
#     item_id = models.CharField(max_length=20, primary_key=True)
#     item_name = models.CharField(max_length=100)
#     client_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='item_client_id')
#     description = models.TextField(blank=True, null=True)

#     def __str__(self):
#         return f"{self.item_id}"
    
#     class Meta:
#         unique_together = ('client_id', 'item_id')

# Category Table
# class OrderCategory(models.Model):
#     category_id = models.AutoField(primary_key=True)
#     category_name = models.CharField(max_length=20)

#     def __str__(self):
#         return f"{self.category_name}"

# Service Type Table
# class ServiceCategory(models.Model):
#     service_code = models.AutoField(primary_key=True)
#     category_id = models.ForeignKey(OrderCategory, on_delete=models.CASCADE, related_name='service_category_category_id')
#     name = models.CharField(max_length=10)
#     charges = models.DecimalField(max_digits=10, decimal_places=2)

#     class Meta:
#         unique_together = ('service_code', 'category_id')

#     def __str__(self):
#         return f"{self.name}"
    
# class CombinedOrder(models.Model):
#     id = models.AutoField(primary_key=True)
#     quantity_from_inventory = models.IntegerField()
#     quantity_from_recent_recieved = models.IntegerField()
#     quantity_from_new_shipment = models.IntegerField()

# class Bin(models.Model):
#     bin_id = models.AutoField(primary_key=True)
#     bin_name = models.CharField(max_length=50)

# Service Details Table
# class ServiceDetail(models.Model):
    
#     def pdf_directory_path_fnksu(self, name):
#         return 'fnsku/{0}_{1}_{2}_{3}_{4}'.format(self.service_id, self.item_id, self.service_code, self.category_id, name)
    
#     def pdf_directory_path_additional(self):
#         return 'fnsku/{0}_{1}_{2}_{3}_additional'.format(self.service_id, self.item_id, self.service_code, self.category_id)
    
#     def pdf_directory_path_fba(self):
#         return 'fba/{0}_{1}_{2}_{3}'.format(self.service_id, self.item_id, self.service_code, self.category_id)

#     # service_detail_id = models.AutoField(primary_key=True)
#     service_id = models.CharField(max_length=50)
#     item_id = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="Service_detail_item_id", blank=True, null=True, default=None)
#     service_code = models.ForeignKey(ServiceCategory, on_delete=models.CASCADE, related_name="Service_detail_service_code", blank=True, null=True, default=None)
#     category_id = models.ForeignKey(OrderCategory, on_delete=models.CASCADE, related_name="Service_detail_category_id", blank=True, null=True, default=None)
#     bin_id = models.ForeignKey(Bin, on_delete=models.SET_NULL, null=True, blank=True)
#     client_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="Service_detail_client_id")
#     no_bundles = models.IntegerField(default=None, null=True, blank=True)
#     bundle_quantity = models.IntegerField(default=None, null=True, blank=True)
#     additional_service = models.CharField(max_length=40, blank=True, null=True)
#     additional_format = models.CharField(max_length=40, blank=True, null=True)
#     additional_format_text = models.CharField(max_length=100, blank=True, null=True, default=None)
#     additional_format_file = models.FileField(upload_to=pdf_directory_path_additional, blank=True, null=True, default=None)
#     active = models.BooleanField(default=False, null=True, blank=True)
#     quantity_from_inventory = models.IntegerField(blank=True, null=True)
#     quantity_from_recent_received = models.IntegerField(blank=True, null=True)
#     quantity_from_new_shipment = models.IntegerField(blank=True, null=True)
#     fnsku = models.FileField(upload_to=pdf_directory_path_fnksu, blank=True, null=True, default=None)
#     box_label = models.FileField(upload_to=pdf_directory_path_fba, blank=True, null=True, default=None)
#     placed_date = models.DateTimeField(default=timezone.now, blank=True, null=True)
#     active_service_start_date = models.DateTimeField(blank=True, null=True)
#     state = models.CharField(max_length=50, null=True, blank=True)
#     # from_inventory = models.BooleanField(default=False, blank=True, null=True)
#     # combined = models.ForeignKey(CombinedOrder, null=True, blank=True, related_name="CombinedOrder_id", on_delete=models.CASCADE)
#     dispute = models.BooleanField(default=False, blank=True, null=True)
#     dispute_note = models.CharField(max_length=100, null=True, blank=True)
#     bundle = models.BooleanField(default=False, null=True, blank=True)
#     packing_instructions = models.CharField(max_length=100, null=True, blank=True)
#     pallet = models.BooleanField(default=False, null=True, blank=True)


#     class Meta:
#         unique_together = ('service_id', 'service_code', 'item_id', 'category_id')

#     def __str__(self):
#         return f"Service_id {self.service_id} - item {self.item_id} - category {self.category_id} - service code {self.service_code}"
    
class UngatingImage(models.Model):
    
    def path_to_image(self):
        return 'ungating/{0}'.format(self.id)

    service_id = models.CharField(max_length=20)
    item_id = models.CharField(max_length=20)
    service_code = models.IntegerField()
    category_id = models.IntegerField()
    image = models.ImageField(upload_to=path_to_image)  

    def __str__(self):
        return f"Image for {self.received.tracking_id}"
    
    def get_composite_key_model(self):
    # Check in ServiceDetail first
        service_detail_exists = ServiceDetail.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if service_detail_exists:
            return ServiceDetail.objects.get(
                service_id=self.service_id,
                item_id=self.item_id,
                service_code=self.service_code,
                category_id=self.category_id
            )

        # If not found in ServiceDetail, check in ShipmentDetails
        shipment_detail_exists = ShipmentDetails.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if shipment_detail_exists:
            return ShipmentDetails.objects.get(
                service_id=self.service_id,
                item_id=self.item_id,
                service_code=self.service_code,
                category_id=self.category_id
            )
        
        service_detail_history_exists = ServiceDetailHistory.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if service_detail_history_exists:
            return ServiceDetailHistory.objects.get(
                service_id=self.service_id,
                item_id=self.item_id,
                service_code=self.service_code,
                category_id=self.category_id
            )
        # If neither exists, return None or raise an error if needed
        return None

    def save(self, *args, **kwargs):
        # Check if the composite key exists in ServiceDetail first
        service_detail_exists = ServiceDetail.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if service_detail_exists:
            # If found, proceed to save
            super().save(*args, **kwargs)
            return

        # If not found in ServiceDetail, check ShipmentDetails
        shipment_detail_exists = ShipmentDetails.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if shipment_detail_exists:
            # If found in ShipmentDetails, proceed to save
            super().save(*args, **kwargs)
            return

        # If not found in ShipmentDetails, check ServiceDetailHistory
        service_detail_history_exists = ServiceDetailHistory.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if service_detail_history_exists:
            # If found in ServiceDetailHistory, proceed to save
            super().save(*args, **kwargs)
            return

        # If the composite key is not found in any of the models, raise an error
        raise ValueError("Composite key does not exist in ServiceDetail, ShipmentDetails, or ServiceDetailHistory")


class BundleOrder(models.Model):
    service_id = models.CharField(max_length=50)
    item_id = models.CharField(max_length=20)
    service_code = models.IntegerField()
    category_id = models.IntegerField()
    other_item = models.ForeignKey(Item, on_delete=models.DO_NOTHING, related_name="second_item")
    quantity_from_inventory = models.IntegerField(blank=True, null=True)
    quantity_from_recent_received = models.IntegerField(blank=True, null=True)
    quantity_from_new_shipment = models.IntegerField(blank=True, null=True)

    def get_composite_key_model(self):
    # Check in ServiceDetail first
        service_detail_exists = ServiceDetail.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if service_detail_exists:
            return ServiceDetail.objects.get(
                service_id=self.service_id,
                item_id=self.item_id,
                service_code=self.service_code,
                category_id=self.category_id
            )

        # If not found in ServiceDetail, check in ShipmentDetails
        shipment_detail_exists = ShipmentDetails.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if shipment_detail_exists:
            return ShipmentDetails.objects.get(
                service_id=self.service_id,
                item_id=self.item_id,
                service_code=self.service_code,
                category_id=self.category_id
            )
        
        service_detail_history_exists = ServiceDetailHistory.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if service_detail_history_exists:
            return ServiceDetailHistory.objects.get(
                service_id=self.service_id,
                item_id=self.item_id,
                service_code=self.service_code,
                category_id=self.category_id
            )
        # If neither exists, return None or raise an error if needed
        return None

    def save(self, *args, **kwargs):
        # Check if the composite key exists in ServiceDetail first
        service_detail_exists = ServiceDetail.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if service_detail_exists:
            # If found, proceed to save
            super().save(*args, **kwargs)
            return

        # If not found in ServiceDetail, check ShipmentDetails
        shipment_detail_exists = ShipmentDetails.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if shipment_detail_exists:
            # If found in ShipmentDetails, proceed to save
            super().save(*args, **kwargs)
            return

        # If not found in ShipmentDetails, check ServiceDetailHistory
        service_detail_history_exists = ServiceDetailHistory.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if service_detail_history_exists:
            # If found in ServiceDetailHistory, proceed to save
            super().save(*args, **kwargs)
            return

        # If the composite key is not found in any of the models, raise an error
        raise ValueError("Composite key does not exist in ServiceDetail, ShipmentDetails, or ServiceDetailHistory")


# Inventory Table
class Inventory(models.Model):
    
    class ChargeChoices(models.TextChoices):
        BOX = 'Box', 'Box'
        UNIT = 'Unit', 'Unit'

    item_id = models.ForeignKey(Item, on_delete=models.PROTECT, related_name="Inventory_item_id")
    bin_id = models.ForeignKey(Bin, blank=True, null=True, on_delete=models.PROTECT, related_name="Inventory_bin_id")
    quantity = models.IntegerField()
    category_id = models.ForeignKey(OrderCategory, on_delete=models.PROTECT, related_name="Inventory_category_id")
    pack_size = models.IntegerField()
    no_bundles = models.IntegerField()
    date_added = models.DateTimeField(default=timezone.now)
    boxes = models.IntegerField(default=0)
    charge_by = models.CharField(max_length=10, choices=ChargeChoices.choices, default=ChargeChoices.UNIT, verbose_name="Charge By")
    pallet = models.BooleanField(default=False)


class PalletDimension(models.Model):

    def path_to_image(self):
        return 'pallet/{0}_{1}_{2}_{3}_{4}'.format(self.service_id, self.item_id, self.service_code, self.category_id, self.id)

    service_id = models.CharField(max_length=50, null=True, blank=True)
    item_id = models.CharField(max_length=20, null=True, blank=True)
    service_code = models.IntegerField(null=True, blank=True)
    category_id = models.IntegerField(null=True, blank=True)
    length = models.IntegerField()
    width = models.IntegerField()
    height = models.IntegerField()
    weight = models.DecimalField(max_digits=6, decimal_places=2)
    shipped = models.BooleanField(default=False, null=True, blank=True)
    shipped_date = models.DateTimeField(default=None, null=True, blank=True)
    pallet_label = models.FileField(null=True, blank=True)
    inventory_id = models.ForeignKey(Inventory, on_delete=models.SET_NULL, null=True, blank=True)

    def get_composite_key_model(self):
    # Check in ServiceDetail first
        service_detail_exists = ServiceDetail.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if service_detail_exists:
            return ServiceDetail.objects.get(
                service_id=self.service_id,
                item_id=self.item_id,
                service_code=self.service_code,
                category_id=self.category_id
            )

        # If not found in ServiceDetail, check in ShipmentDetails
        shipment_detail_exists = ShipmentDetails.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if shipment_detail_exists:
            return ShipmentDetails.objects.get(
                service_id=self.service_id,
                item_id=self.item_id,
                service_code=self.service_code,
                category_id=self.category_id
            )
        
        service_detail_history_exists = ServiceDetailHistory.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if service_detail_history_exists:
            return ServiceDetailHistory.objects.get(
                service_id=self.service_id,
                item_id=self.item_id,
                service_code=self.service_code,
                category_id=self.category_id
            )
        # If neither exists, return None or raise an error if needed
        return None

    def save(self, *args, **kwargs):
        # Check if the composite key exists in ServiceDetail first
        if self.service_id == None and self.service_code == None and self.category_id == None:
            super().save(*args, **kwargs)
            return
        service_detail_exists = ServiceDetail.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if service_detail_exists:
            # If found, proceed to save
            super().save(*args, **kwargs)
            return

        # If not found in ServiceDetail, check ShipmentDetails
        shipment_detail_exists = ShipmentDetails.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if shipment_detail_exists:
            # If found in ShipmentDetails, proceed to save
            super().save(*args, **kwargs)
            return

        # If not found in ShipmentDetails, check ServiceDetailHistory
        service_detail_history_exists = ServiceDetailHistory.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if service_detail_history_exists:
            # If found in ServiceDetailHistory, proceed to save
            super().save(*args, **kwargs)
            return

        # If the composite key is not found in any of the models, raise an error
        raise ValueError("Composite key does not exist in ServiceDetail, ShipmentDetails, or ServiceDetailHistory")

class Dimension(models.Model):

    def path_to_image(self):
        return 'box/{0}_{1}_{2}_{3}_{4}'.format(self.service_id, self.item_id, self.service_code, self.category_id, self.id)

    service_id = models.CharField(max_length=20, null=True, blank=True)
    item_id = models.CharField(max_length=20, null=True, blank=True)
    service_code = models.IntegerField(null=True, blank=True)
    category_id = models.IntegerField(null=True, blank=True)
    length = models.IntegerField()
    width = models.IntegerField()
    height = models.IntegerField()
    weight = models.DecimalField(max_digits=6, decimal_places=2)
    quantity = models.IntegerField(null=True, blank=True)
    shipped = models.BooleanField(default=False, null=True, blank=True)
    shipped_date = models.DateTimeField(default=None, null=True, blank=True)
    box_label = models.FileField(null=True, blank=True)
    pallet = models.ForeignKey(PalletDimension, null=True, blank=True, default=None, on_delete=models.SET_NULL)
    inventory_id = models.ForeignKey(Inventory, null=True, blank=True, on_delete=models.SET_NULL)

    def get_composite_key_model(self):
    # Check in ServiceDetail first
        service_detail_exists = ServiceDetail.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if service_detail_exists:
            return ServiceDetail.objects.get(
                service_id=self.service_id,
                item_id=self.item_id,
                service_code=self.service_code,
                category_id=self.category_id
            )

        # If not found in ServiceDetail, check in ShipmentDetails
        shipment_detail_exists = ShipmentDetails.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if shipment_detail_exists:
            return ShipmentDetails.objects.get(
                service_id=self.service_id,
                item_id=self.item_id,
                service_code=self.service_code,
                category_id=self.category_id
            )
        
        service_detail_history_exists = ServiceDetailHistory.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if service_detail_history_exists:
            return ServiceDetailHistory.objects.get(
                service_id=self.service_id,
                item_id=self.item_id,
                service_code=self.service_code,
                category_id=self.category_id
            )
        # If neither exists, return None or raise an error if needed
        return None

    def save(self, *args, **kwargs):
        if self.service_id == None and self.service_code == None and self.category_id == None:
            super().save(*args, **kwargs)
            return
        # Check if the composite key exists in ServiceDetail first
        service_detail_exists = ServiceDetail.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if service_detail_exists:
            # If found, proceed to save
            super().save(*args, **kwargs)
            return

        # If not found in ServiceDetail, check ShipmentDetails
        shipment_detail_exists = ShipmentDetails.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if shipment_detail_exists:
            # If found in ShipmentDetails, proceed to save
            super().save(*args, **kwargs)
            return

        # If not found in ShipmentDetails, check ServiceDetailHistory
        service_detail_history_exists = ServiceDetailHistory.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if service_detail_history_exists:
            # If found in ServiceDetailHistory, proceed to save
            super().save(*args, **kwargs)
            return

        # If the composite key is not found in any of the models, raise an error
        raise ValueError("Composite key does not exist in ServiceDetail, ShipmentDetails, or ServiceDetailHistory")

class ServiceBox(models.Model):
    service_id = models.CharField(max_length=50)
    item_id = models.CharField(max_length=20)
    service_code = models.IntegerField()
    category_id = models.IntegerField()
    quantity = models.IntegerField()
    box = models.ForeignKey(Dimension, on_delete=models.CASCADE, related_name='servicebox_box')

    def get_composite_key_model(self):
    # Check in ServiceDetail first
        service_detail_exists = ServiceDetail.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if service_detail_exists:
            return ServiceDetail.objects.get(
                service_id=self.service_id,
                item_id=self.item_id,
                service_code=self.service_code,
                category_id=self.category_id
            )

        # If not found in ServiceDetail, check in ShipmentDetails
        shipment_detail_exists = ShipmentDetails.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if shipment_detail_exists:
            return ShipmentDetails.objects.get(
                service_id=self.service_id,
                item_id=self.item_id,
                service_code=self.service_code,
                category_id=self.category_id
            )
        
        service_detail_history_exists = ServiceDetailHistory.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if service_detail_history_exists:
            return ServiceDetailHistory.objects.get(
                service_id=self.service_id,
                item_id=self.item_id,
                service_code=self.service_code,
                category_id=self.category_id
            )
        # If neither exists, return None or raise an error if needed
        return None

    def save(self, *args, **kwargs):
        # Check if the composite key exists in ServiceDetail first
        service_detail_exists = ServiceDetail.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if service_detail_exists:
            # If found, proceed to save
            super().save(*args, **kwargs)
            return

        # If not found in ServiceDetail, check ShipmentDetails
        shipment_detail_exists = ShipmentDetails.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if shipment_detail_exists:
            # If found in ShipmentDetails, proceed to save
            super().save(*args, **kwargs)
            return

        # If not found in ShipmentDetails, check ServiceDetailHistory
        service_detail_history_exists = ServiceDetailHistory.objects.filter(
            service_id=self.service_id,
            item_id=self.item_id,
            service_code=self.service_code,
            category_id=self.category_id
        ).exists()

        if service_detail_history_exists:
            # If found in ServiceDetailHistory, proceed to save
            super().save(*args, **kwargs)
            return

        # If the composite key is not found in any of the models, raise an error
        raise ValueError("Composite key does not exist in ServiceDetail, ShipmentDetails, or ServiceDetailHistory")

# class ItemBox(models.Model):
#     item_id = models.ForeignKey(Item, on_delete=models.CASCADE)
#     box_id = models.ForeignKey(Dimension, on_delete=models.CASCADE)

class BundleInventory(models.Model):
    other_item = models.ForeignKey(Item, on_delete=models.DO_NOTHING, related_name="inventory_second_item")
    quantity = models.IntegerField()
    inventory_id = models.ForeignKey(Inventory, on_delete=models.CASCADE, related_name="Inventory_bundle_inventory") 

# Shipment Details Table
class ShipmentDetails(models.Model):

    def path_to_file_fnsku(self):
        return 'fnsku/{0}_{1}_{2}_{3}'.format(self.service_id, self.item_id, self.service_code, self.category_id)
    
    def pdf_directory_path_additional(self):
        return 'fnsku/{0}_{1}_{2}_{3}_additional'.format(self.service_id, self.item_id, self.service_code, self.category_id)
    
    def path_to_file_fba(self):
        return 'fba/{0}_{1}_{2}_{3}'.format(self.service_id, self.item_id, self.service_code, self.category_id)


    # shipment_detail_id = models.AutoField(primary_key=True)
    service_id = models.CharField(max_length=50)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="Shipment_detail_item_id", blank=True, null=True, default=None)
    service_code = models.ForeignKey(ServiceCategory, on_delete=models.CASCADE, related_name="Shipment_detail_service_code", blank=True, null=True, default=None)
    category_id = models.ForeignKey(OrderCategory, on_delete=models.CASCADE, related_name="Shipment_detail_category_id", blank=True, null=True, default=None)
    bin_id = models.ForeignKey(Bin, on_delete=models.SET_NULL, null=True, blank=True)
    client_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="Shipment_detail_client_id")
    no_bundles = models.IntegerField(default=None, null=True, blank=True)
    bundle_quantity = models.IntegerField(default=None, null=True, blank=True)
    additional_service = models.CharField(max_length=40, blank=True, null=True)
    additional_format = models.CharField(max_length=40, blank=True, null=True)
    additional_format_text = models.CharField(max_length=100, blank=True, null=True, default=None)
    additional_format_file = models.FileField(upload_to=pdf_directory_path_additional, blank=True, null=True, default=None)
    active = models.BooleanField(default=False, null=True, blank=True)
    quantity_from_inventory = models.IntegerField(blank=True, null=True)
    quantity_from_recent_received = models.IntegerField(blank=True, null=True)
    quantity_from_new_shipment = models.IntegerField(blank=True, null=True)
    fnsku = models.FileField(upload_to=path_to_file_fnsku, blank=True, null=True, default=None)
    box_label = models.FileField(upload_to=path_to_file_fba, blank=True, null=True, default=None)
    placed_date = models.DateTimeField(null=True, blank=True)
    active_service_start_date = models.DateTimeField(blank=True, null=True)
    service_provided_date = models.DateTimeField(default=timezone.now, blank=True, null=True)
    state = models.CharField(max_length=50, null=True, blank=True)
    # from_inventory = models.BooleanField(default=False)
    # combined = models.ForeignKey(CombinedOrder, null=True, blank=True, related_name="Shipment_CombinedOrder_id", on_delete=models.CASCADE)
    dispute = models.BooleanField(default=False)
    dispute_note = models.CharField(max_length=100, null=True)
    bundle = models.BooleanField(default=False, null=True)
    packing_instructions = models.CharField(max_length=100, null=True)
    pallet = models.BooleanField(default=False, null=True)

    def delete(self, *args, **kwargs):
        # Delete the associated files before deleting the record
        if self.fnsku:
            self.fnsku.delete(save=False)
        if self.inventory_label:
            self.inventory_label.delete(save=False)
        
        # Call the parent class delete method
        super().delete(*args, **kwargs)

    class Meta:
        unique_together = ('service_id', 'service_code', 'item_id', 'category_id')

    def __str__(self):
        return f"{self.service_id} - {self.service_code} - {self.category_id} - {self.client_id}"

# Service Details History Table
class ServiceDetailHistory(models.Model):

    def path_to_file_fnsku(self):
        return 'fnsku/{0}_{1}_{2}_{3}'.format(self.service_id, self.item_id, self.service_code, self.category_id)
    
    def pdf_directory_path_additional(self):
        return 'fnsku/{0}_{1}_{2}_{3}_additional'.format(self.service_id, self.item_id, self.service_code, self.category_id)
    
    def path_to_file_fba(self):
        return 'fba/{0}_{1}_{2}_{3}'.format(self.service_id, self.item_id, self.service_code, self.category_id)

    # service_detail_history_id = models.AutoField(primary_key=True)
    service_id = models.CharField(max_length=50)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="Service_detail_history_item_id", blank=True, null=True, default=None)
    service_code = models.ForeignKey(ServiceCategory, on_delete=models.CASCADE, related_name="Service_detail_history_service_code", blank=True, null=True, default=None)
    category_id = models.ForeignKey(OrderCategory, on_delete=models.CASCADE, related_name="Service_detail_history_category_id", blank=True, null=True, default=None)
    bin_id = models.ForeignKey(Bin, on_delete=models.SET_NULL, null=True, blank=True)
    client_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="Service_detail_history_client_id")
    no_bundles = models.IntegerField(default=None, null=True, blank=True)
    bundle_quantity = models.IntegerField(default=None, null=True, blank=True)
    additional_service = models.CharField(max_length=40, blank=True, null=True)
    additional_format = models.CharField(max_length=40, blank=True, null=True)
    additional_format_text = models.CharField(max_length=100, blank=True, null=True, default=None)
    additional_format_file = models.FileField(upload_to=pdf_directory_path_additional, blank=True, null=True, default=None)
    active = models.BooleanField(default=False, null=True, blank=True)
    quantity_from_inventory = models.IntegerField(blank=True, null=True)
    quantity_from_recent_received = models.IntegerField(blank=True, null=True)
    quantity_from_new_shipment = models.IntegerField(blank=True, null=True)
    fnsku = models.FileField(upload_to=path_to_file_fnsku, blank=True, null=True, default=None)
    box_label = models.FileField(upload_to=path_to_file_fba, blank=True, null=True, default=None)
    placed_date = models.DateTimeField(null=True, blank=True)
    active_service_start_date = models.DateTimeField(blank=True, null=True)
    service_provided_date = models.DateTimeField(default=timezone.now, blank=True, null=True)
    state = models.CharField(max_length=50, null=True, blank=True)
    # from_inventory = models.BooleanField(default=False)
    # combined = models.ForeignKey(CombinedOrder, null=True, blank=True, related_name="Shipment_CombinedOrder_id", on_delete=models.CASCADE)
    dispute = models.BooleanField(default=False)
    dispute_note = models.CharField(max_length=100, null=True)
    bundle = models.BooleanField(default=False, null=True)
    packing_instructions = models.CharField(max_length=100, null=True)
    pallet = models.BooleanField(default=False, null=True)


    class Meta:
        unique_together = ('service_id', 'service_code', 'item_id', 'category_id')

    def __str__(self):
        return f"{self.service_id} - {self.service_code} - {self.category_id} - {self.client_id}"
    

# Invoice Table
class Invoice(models.Model):
    invoice_id = models.AutoField(primary_key=True)
    invoice_pdf = models.FileField(upload_to=dynamic_upload_path, blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    paid = models.BooleanField(default=False)
    date_created = models.DateField(default=timezone.now, blank=True, null=True)
    date_paid = models.DateField(blank=True, null=True)
    due_date = models.DateField(blank=True, null=True)

# Charges Table
class Charges(models.Model):
    charge_id = models.AutoField(primary_key=True)
    client_id = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='charges_client')
    service_id = models.ForeignKey(ShipmentDetails, on_delete=models.DO_NOTHING, blank=True, null=True, related_name='charges_service_id')
    item_id = models.ForeignKey(Item, on_delete=models.DO_NOTHING, blank=True, null=True, related_name='charges_item_id')
    service_code = models.ForeignKey(ServiceCategory, on_delete=models.DO_NOTHING, blank=True, null=True, related_name='charges_service_code')  
    category_id = models.ForeignKey(OrderCategory, on_delete=models.DO_NOTHING, blank=True, null=True, related_name='charges_category_id')
    invoice_id = models.ForeignKey(Invoice, on_delete=models.DO_NOTHING, null=True, related_name='charges_invoice_id')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date_charged = models.DateTimeField(default=timezone.now)
    note = models.CharField(max_length=100, null=True, blank=True)



# Task Table
class Task(models.Model):
    task_id = models.AutoField(primary_key=True)
    assigned_by = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name="assigned_by_user")
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name="assigned_to_user")
    service_id = models.IntegerField(blank=True, null=True)
    item_id = models.IntegerField(blank=True, null=True)
    service_code = models.IntegerField(blank=True, null=True)
    category_id = models.IntegerField(blank=True, null=True)
    assigned_date = models.DateTimeField(default=timezone.now)
    recurring = models.BooleanField(default=False)
    

class CompletedTasks(models.Model):
    task_id = models.AutoField(primary_key=True)
    assigned_by = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name="completed_assigned_by_user")
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name="completed_assigned_to_user")
    service_id = models.IntegerField(blank=True, null=True)
    item_id = models.IntegerField(blank=True, null=True)
    service_code = models.IntegerField(blank=True, null=True)
    category_id = models.IntegerField(blank=True, null=True)
    assigned_date = models.DateTimeField()
    completed_date = models.DateTimeField(default=timezone.now)

# Balances Table
class Balance(models.Model):
    balance_id = models.AutoField(primary_key=True)
    client_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="balance_client_id")
    balance = models.DecimalField(max_digits=10, decimal_places=2)

# Removal Table
class Removal(models.Model):
    removal_id = models.AutoField(primary_key=True)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="removal_item_id")
    date = models.DateTimeField(default=timezone.now)
    quantity = models.IntegerField(null=True)
    client_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="removal_client_id", null=True)
    bin_id = models.ForeignKey(Bin, on_delete=models.CASCADE, blank=True, null=True, related_name="removal_bin_id")
    category_id = models.ForeignKey(OrderCategory, on_delete=models.CASCADE, blank=True, null=True, related_name="removal_category_id")
    dimension_id = models.IntegerField(null=True)
    boxes = models.IntegerField(default=0)

# Discard Table
class Discard(models.Model):
    discard_id = models.AutoField(primary_key=True)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="discard_item_id")
    date_added = models.DateTimeField()
    date_discarded = models.DateTimeField(default=timezone.now)
    quantity = models.IntegerField()
    client_id = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name="discard_client_id")
    bin_id = models.ForeignKey(Bin, on_delete=models.CASCADE, blank=True, null=True, related_name="discard_bin_id")
    category_id = models.ForeignKey(OrderCategory, on_delete=models.CASCADE, related_name="discard_category_id")
    dimension_id = models.IntegerField(null=True)
    boxes = models.IntegerField(default=0)

# Check-in Table
class LogRecord(models.Model):
    check_in_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="logrecord_user_id")
    check_in_time = models.DateTimeField(default=timezone.now, blank=True, null=True)
    check_out_time = models.DateTimeField(blank=True, null=True)


# Transaction Table
class Transaction(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    client_id = models.IntegerField()
    invoice_id = models.ForeignKey(Invoice, on_delete=models.PROTECT)
    date = models.DateTimeField(default=timezone.now)

class CustomRates(models.Model):
    client_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="custom_rates_client_id")
    service_code = models.ForeignKey(ServiceCategory, on_delete=models.CASCADE, related_name="custom_rates_service_code")
    category_id = models.ForeignKey(OrderCategory, on_delete=models.CASCADE, related_name="custom_rates_category_id")
    charges = models.DecimalField(max_digits=10, decimal_places=2)

class Courier(models.Model):
    courier_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)

class UserCourier(models.Model):
    client_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_courier_client_id")
    courier_id = models.ForeignKey(Courier, on_delete=models.CASCADE, related_name="user_courier_courier_id")

class ClientPreference(models.Model):
    client_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="client_preference_client_id")
    service_code = models.ForeignKey(ServiceCategory, on_delete=models.CASCADE, related_name="sclient_preference_ervice_code")
    category_id = models.ForeignKey(OrderCategory, on_delete=models.CASCADE, related_name="client_preference_category_id")

class client_courier_credentials:
    email = models.TextField()
    password = models.TextField()
    courier = models.ForeignKey(Courier, on_delete=models.CASCADE)

class OTP(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='OTP_user_id')
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    def is_expired(self):
        return timezone.now() > self.expires_at

    @staticmethod
    def generate_otp():
        return ''.join(random.choices(string.digits, k=5))



#------------------------------------------ Triggers -----------------------------------------

