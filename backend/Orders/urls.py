from django.contrib import admin
from . import views
from django.urls import path, include

urlpatterns = [
    # path('api/service_details/', views.service_detail_detail, name='hreport_inventory'),
    path('api/orders/', views.orders, name='orders'),
    path('api/dimensions/', views.add_dimensions, name='dimensions'),
    # path('api/order-categories/', views.order_category, name='list_orders_category'),
    # path('api/order-category/<int:pk>/', views.order_category_detail, name='orders_category'),
    # path('api/service-categories/', views.service_category, name='list_service_category'),
    # path('api/service-category/<int:pk>/', views.service_category_detail, name='service_category'),
    path('api/trackings/', views.trackings, name='trackings'),
    path('api/trackings/<str:order_id>/', views.order_tracking, name='order_trackings'),
    path('api/service-detail/<str:order_id>/', views.get_service_details, name='service_detail'),
    # path('api/order-service-categories/<int:pk>/', views.service_order_category, name='order_service_category'),
]