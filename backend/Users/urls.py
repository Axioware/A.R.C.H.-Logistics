from . import views
from django.urls import path

urlpatterns = [
    path('api/users/', views.users, name='users'),
    path('api/users/<int:id>/', views.user_by_id, name='single_user'),
    path('api/users/reset-password/', views.reset_password, name='reset_pass'),
]