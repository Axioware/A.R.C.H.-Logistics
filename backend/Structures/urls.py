from . import views
from django.urls import path


urlpatterns = [
    path('api/orders/', views.orders, name='orders'),
    path('api/single-order/<int:pk>/', views.order_detail, name='list_received'),
    path('api/locations/', views.Locations, name='bins'),
    path('api/locations/<int:id>', views.single_location, name='single-bin'),
    path('api/warehouse/', views.warehouse, name='warehouse'),
    path('api/warehouse/<int:id>/', views.warehouse_detail, name='warehouse_detail')
]