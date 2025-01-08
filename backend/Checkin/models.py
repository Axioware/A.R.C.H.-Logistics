from django.db import models
from Users.models import User
from datetime import datetime
from django.utils import timezone
from Orders.models import Orders
from django.conf import settings
# Create your models here.
# Task Table
class Task(models.Model):
    task_id = models.AutoField(primary_key=True)
    assigned_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True, related_name="assigned_by_user")
    assigned_to = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True, related_name="assigned_to_user")
    order_id = models.ForeignKey(Orders, on_delete=models.SET_NULL, null=True) #TODO
    assigned_date = models.DateTimeField(default=timezone.now)
    recurring = models.BooleanField(default=False)
    

class CompletedTasks(models.Model):
    task_id = models.AutoField(primary_key=True)
    assigned_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True, related_name="completed_assigned_by_user")
    assigned_to = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True, related_name="completed_assigned_to_user")
    order_id = models.ForeignKey(Orders, on_delete=models.SET_NULL, null=True) #TODO
    assigned_date = models.DateTimeField()
    completed_date = models.DateTimeField(default=timezone.now)

class TimeSheet(models.Model):
    check_in_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="logrecord_user_id")
    check_in_time = models.DateTimeField(default=timezone.now, blank=True, null=True)
    check_out_time = models.DateTimeField(blank=True, null=True)