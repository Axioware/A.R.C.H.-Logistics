from django.contrib import admin
from . import views
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # path('api/report/users/', views.report_users_view, name='report_users'),  # Create received entry
    path('api/report/inventory/', views.report_inventory, name='report_inventory'),
    # path('api/report/orders/', views.report_orders, name='report_orders'),
    # path('api/report/payment/', views.report_payment, name='report_payment'),
]