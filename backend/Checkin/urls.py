from django.contrib import admin
from . import views
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # path('api/checkin/', views.checkin, name="checkin"),
    # path('api/checkin/<int:pk>/', views.checkin_detail, name="checkin detail"),
]