from django.contrib import admin
from . import views
from django.urls import path, include

urlpatterns = [
    path('api/items/', views.items, name='items'),
    path('api/items/<str:pk>/', views.single_item, name='single_item'),
    path('api/inventory/', views.inventory, name='inventory'),
    path('api/combined-inventory/', views.aggregated_inventory_list, name='combined_inventory'),
    path('api/single-inventory/<int:id>/', views.inventory_details, name='single_inventory'),

    # path('dateInventory/', views.create_received, name='create_received'),  # Create received entry
]