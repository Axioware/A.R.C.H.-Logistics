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
from django.db import models
from django_tenants.models import TenantMixin, DomainMixin

# Create your models here.
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


class UsersExtended(TenantMixin):
    CLEARANCE_CHOICES = [
        (1, 'Level 1'),
        (2, 'Level 2'),
        (3, 'Level 3'),
        (4, 'Level 4'),
    ]

    class BillingTypeChoices(models.TextChoices):
        DAILY = 'Daily', 'Daily'
        MONTHLY = 'Monthly', 'Monthly'
        BIMONTHLY = 'Bimonthly', 'Bimonthly'

    username = models.OneToOneField(User, on_delete=models.CASCADE, related_name="extended", verbose_name="Username")
    phone = models.CharField(max_length=15, blank=True, null=True)
    email2 = models.CharField(max_length=255, blank=True, null=True, verbose_name="Secondary Email")
    clearance_level = models.IntegerField(
        choices=CLEARANCE_CHOICES, 
        null=False, 
        blank=False, 
        verbose_name="Clearance Level"
    )
    tax_id = models.CharField(max_length=15, blank=True, null=True, verbose_name="Tax ID")
    address = models.CharField(max_length=255, default=None, verbose_name="Address", blank=True, null=True)
    billing_type = models.CharField(max_length=10, choices=BillingTypeChoices.choices, default=BillingTypeChoices.MONTHLY, verbose_name="Billing Type", blank=True, null=True)
    llc_name = models.CharField(max_length=50, default=None, verbose_name="LLC Name", blank=True, null=True)
    state = models.CharField(max_length=30, default=None, verbose_name="State", blank=True, null=True)
    city = models.CharField(max_length=30, default=None, verbose_name="City", blank=True, null=True)
    zip = models.CharField(max_length=20, blank=True, null=True, verbose_name="Zip Code")
    date_created = models.DateField(default=timezone.now, null=True)
    last_logout = models.DateTimeField(null=True, blank=True)
    warehouses = models.ManyToManyField(Warehouse, related_name="users", blank=True)

    def save(self, *args, **kwargs):
        if self.username.is_superuser:
            # Set clearance level to 1 if user is a superuser
            self.clearance_level = 1  # Level 1 corresponds to "Owner"
        super().save(*args, **kwargs)


    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            UsersExtended.objects.create(username=instance)
        else:
            instance.extended.save()

    def __str__(self):
        return f"{self.username.username} - {self.clearance_level}"
