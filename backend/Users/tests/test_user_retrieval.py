from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class UserRetrievalTests(APITestCase):
    def setUp(self):
        self.url = '/users/api/users/{}/'  # To be replaced with a dynamic id in tests
        self.test_user = User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='password123'
        )
        self.test_user_data = {
            'id': self.test_user.id,
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

    def test_get_user_success(self):
        # Test retrieving a user by id successfully
        url = self.url.format(self.test_user.id)
        response = self.client.get(url, HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user_data']['username'], self.test_user.username)

    def test_get_user_not_found(self):
        # Test retrieving a non-existing user
        url = self.url.format(99999)
        response = self.client.get(url, HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn('error', response.data)

    def test_get_user_unauthorized(self):
        # Test unauthorized user trying to access a user
        url = self.url.format(self.test_user.id)
        response = self.client.get(url)  # No token
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
