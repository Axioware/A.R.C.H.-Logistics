from django.db import models
from Users.models import UsersExtended
from django.contrib.auth.models import User

# Create your models here.
# Received Table
class Received(models.Model):
    tracking_id = models.CharField(max_length=32, primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name='recieved_user_id')
    tracking_type = models.CharField(max_length=20, null=True, blank=True)
    date_received = models.DateTimeField(null=True) # null if not received
    completed = models.BooleanField(default=False) # if this box has 0 quantity left
    assigned = models.BooleanField(default=False) # assigned to service
    


    def __str__(self):
        return f"{self.tracking_id}"

# ReceivedImage Table for storing multiple images
class ReceivedImage(models.Model):
    def path_to_image(self, name):
        return 'trackings/{0}_{1}'.format(self.received.tracking_id, name)

    received = models.ForeignKey(Received, on_delete=models.CASCADE, related_name='images')  # Establish a one-to-many relationship
    image = models.ImageField(upload_to=path_to_image)  # You can customize the path as per your requirements
    
    def __str__(self):
        return f"Image for {self.received.tracking_id}"

#many to many table
#Received-Service Table
class Received_Service(models.Model):
    id = models.AutoField(primary_key=True)
    tracking_id = models.ForeignKey(Received, on_delete=models.SET_NULL, related_name='received_received_service', null=True)
    order_id = models.CharField(max_length=20) #TODO
    item_id = models.CharField(max_length=20, null=True, blank=True, default=True)