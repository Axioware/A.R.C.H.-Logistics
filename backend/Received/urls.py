from django.contrib import admin
from . import views
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/received/', views.list_received, name='list_received'),
    # path('received/create/', views.create_received, name='create_received'),  # Create received entry
]