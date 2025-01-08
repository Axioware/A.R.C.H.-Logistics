# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from .models import ShipmentDetails, CustomRates, Charges, ServiceCategory
# from datetime import datetime
# from django.utils import timezone


# @receiver(post_save, sender=ShipmentDetails)
# def create_charge_for_shipment(sender, instance, created, **kwargs):
#     if created:  # Ensuring this code runs only when a new shipment is created
#         try:
#             # Check for custom rates for this client and service
#             custom_rate = CustomRates.objects.get(client_id=instance.client_id, service_code=instance.service_code, category_id=instance.category_id)
#         except CustomRates.DoesNotExist:
#             # If no custom rate, use default rate (assuming the default is the first row in CustomRates)
#             custom_rate = CustomRates.objects.filter(service_code=instance.service_code).first()

#         # Create a charge record
#         Charges.objects.create(
#             client_id=instance.client_id,
#             service_id=instance,
#             service_code=instance.service_code,
#             invoice_id=None,  # Assuming you manage invoice creation elsewhere or it's nullable
#             amount=custom_rate.charges if custom_rate else 0,  # Default to 0 if no rate is found at all
#             date_charged=timezone.now()
#         )

# Remember to connect the receiver in the ready method of your AppConfig.