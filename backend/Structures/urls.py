from . import views
from django.urls import path


urlpatterns = [
    path('api/services/', views.services, name='orders'),
    path('api/locations/', views.Locations, name='bins'),
    path('api/locations/<int:id>', views.single_location, name='single-bin'),
    path('api/warehouse/', views.warehouse, name='warehouse'),
    path('api/warehouse/<int:id>/', views.warehouse_detail, name='warehouse_detail')
]   