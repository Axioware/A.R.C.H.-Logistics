from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class UserDeletionTests(APITestCase):
    def setUp(self):
        self.url = '/users/api/users/{}/'
        self.test_user = User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='password123'
        )
        # Create a superuser for authorization
        self.superuser = User.objects.create_superuser(
            username='superuser',
            email='superuser@example.com',
            password='password123'
        )
        self.token = RefreshToken.for_user(self.superuser).access_token

    def test_delete_user_success(self):
        # Test deleting a user
        url = self.url.format(self.test_user.id)
        response = self.client.delete(url, HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['success'], 'user deleted')

    def test_delete_user_not_found(self):
        # Test trying to delete a non-existing user
        url = self.url.format(99999)
        response = self.client.delete(url, HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_user_unauthorized(self):
        # Test unauthorized user trying to delete a user
        url = self.url.format(self.test_user.id)
        response = self.client.delete(url)  # No token
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
