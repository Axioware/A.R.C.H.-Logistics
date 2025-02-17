from . import views
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/genotp/', views.send_otp, name='send_otp'),
    path('api/verotp/', views.verify_otp, name='verify_otp'),
    path('api/reset-password/', views.change_password, name='change_password'),
    path('api/tenant/', views.tenants_info, name='tenant_info'),
    path('api/logout/', views.logout, name='logout'),
    # path('api/test/', check_user_in_testing, name='logging_in')

]