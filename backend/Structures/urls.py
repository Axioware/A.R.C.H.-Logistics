from django.contrib import admin
from . import views
from django.urls import path, include


urlpatterns = [
    path('api/services/', views.service_category, name='services'),
    path('api/single-service/<int:pk>/', views.service_category_detail, name='list_received'),
    path('api/categories/', views.order_category, name='categories'),
    # path('api/single-category/<int:id>/', views.list_received, name='list_received'),
    path('api/bins/', views.bins, name='bins'),
    path('api/bins/<int:id>', views.single_bin, name='single-bin'),
] 