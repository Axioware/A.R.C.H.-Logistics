from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class UserUpdateTests(APITestCase):
    def setUp(self):
        self.url = '/users/api/users/{}/'
        self.test_user = User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='password123'
        )
        self.test_user_data = {
            'username': 'testuser',
            'first_name': 'Test',
            'last_name': 'User',
            'email': 'testuser@example.com',
            'is_active': True,
            'role': 'Client',
            'phone': '1234567890',
            'warehouses': 'Warehouse1',
        }
        # Create a superuser for authorization
        self.superuser = User.objects.create_superuser(
            username='superuser',
            email='superuser@example.com',
            password='password123'
        )
        self.token = RefreshToken.for_user(self.superuser).access_token

    def test_update_user_success(self):
        # Test updating a user's data
        url = self.url.format(self.test_user.id)
        data = {
            'first_name': 'Updated',
            'email': 'updatedemail@example.com',
        }
        response = self.client.put(url, data, HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        self.assertEqual(response.data['success'], 'User updated successfully')

    def test_update_user_invalid_email(self):
        # Test updating with an invalid email
        url = self.url.format(self.test_user.id)
        data = {
            'email': 'invalidemail.com',
        }
        response = self.client.put(url, data, HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data['errors'])

    def test_update_user_not_found(self):
        # Test trying to update a non-existing user
        url = self.url.format(99999)
        data = {
            'first_name': 'Updated',
        }
        response = self.client.put(url, data, HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_user_unauthorized(self):
        # Test unauthorized user trying to update a user
        url = self.url.format(self.test_user.id)
        response = self.client.put(url, {'first_name': 'Updated'})  # No token
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
