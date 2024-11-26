from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class UserCreationTests(APITestCase):
    def setUp(self):
        self.url = '/users/api/users/'
        self.test_user_data = {
            'username': 'testuser',
            'first_name': 'Test',
            'last_name': 'User',
            'email': 'testuser@example.com',
            'password': 'password123',
            'role': 'Client',
            'phone': '1234567890',
            'llc_name': 'Test LLC',
            'tax_id': '12345678',
            'warehouses': 'Warehouse1',
        }
        # Create a superuser for authorization
        self.superuser = User.objects.create_superuser(
            username='superuser',
            email='superuser@example.com',
            password='password123'
        )
        self.token = RefreshToken.for_user(self.superuser).access_token

    def test_create_user_success(self):
        # Test creating a user successfully
        response = self.client.post(self.url, self.test_user_data, HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['success'], 'New user created successfully')

    def test_create_user_missing_required_fields(self):
        # Test missing required fields (role, password, etc.)
        data = self.test_user_data.copy()
        del data['password']
        response = self.client.post(self.url, data, HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('password', response.data['errors'])

    def test_create_user_invalid_email(self):
        # Test invalid email format
        data = self.test_user_data.copy()
        data['email'] = 'invalidemail.com'
        response = self.client.post(self.url, data, HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data['errors'])

    def test_create_user_invalid_phone(self):
        # Test invalid phone number
        data = self.test_user_data.copy()
        data['phone'] = 'invalidphone'
        response = self.client.post(self.url, data, HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('phone', response.data['errors'])

    def test_create_user_forbidden_role(self):
        # Test trying to create a user with unauthorized role
        data = self.test_user_data.copy()
        data['role'] = 'Owner'
        response = self.client.post(self.url, data, HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('error', response.data)
