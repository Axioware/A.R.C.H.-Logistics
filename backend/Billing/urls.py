from django.contrib import admin
from . import views
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/custom-rates/', views.custom_rates_list, name='custom_rates'),
    path('api/single-custom-rate/', views.custom_rate_detail, name='single_custom_rates'),
    path('api/single-user-custom-rate/<int:service_code>/', views.custom_user_rate_detail, name='single_user_custom_rates'),
    path('api/charges/<str:service_id>/', views.charges_by_service_id, name='order_charges'),
    path('api/single-charge/<int:charge_id>/', views.single_charge, name='single_charge'),
    path('api/invoices/<str:service_id>/', views.generate_invoice, name='invoice_generate'),
]