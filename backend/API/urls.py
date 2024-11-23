# from django.contrib import admin
# from . import views
# from django.urls import path, include
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

# urlpatterns = [
#     path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
#     path('users/', views.users, name='users'),
#     path('users/<int:id>/', views.user_by_id, name='single_user'),
#     path('genotp/', views.send_otp, name='send_otp'),
#     path('verotp/', views.verify_otp, name='verify_otp'),
#     path('orders/', views.list_orders, name='list_orders'),
#     # path('orders_category/', views.list_orders, name='list_orders'),
#     # path('orders_category/<int:pk>/', views.list_orders, name='list_orders'),
#     # path('orders_category/<int:pk>/<str:pk2/', views.list_orders, name='list_orders'),
#     path('inventory/', views.inventory, name='inventory'),
#     path('received/', views.list_received, name='list_received'),
#     path('received/create/', views.create_received, name='create_received'),  # Create received entry
#     # path('report/users/', views.report_users_view, name='report_users'),  # Create received entry
#     path('report/inventory/', views.report_inventory, name='report_inventory'),
#     # path('service_details/', views.service_detail_detail, name='hreport_inventory'),
#     # path('api/report/orders/', views.report_orders, name='report_orders'),
#     # path('api/report/payment/', views.report_payment, name='report_payment'),
# ]