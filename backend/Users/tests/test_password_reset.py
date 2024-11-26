class UserTests(TestCase):
    def setUp(self):
        # Create a user with the proper role to create new users
        self.client = APIClient()
        self.manager_user = User.objects.create_user(
            username='manager', password='password123', first_name='Manager', last_name='User', email='manager@example.com'
        )
        self.manager_user.extended.role = 'Manager'  # Set the extended role
        self.manager_user.save()
        
        # Authenticated client
        self.client.force_authenticate(user=self.manager_user)
        
    def test_create_user_success(self):
        data = {
            'username': 'newuser',
            'first_name': 'New',
            'last_name': 'User',
            'email': 'newuser@example.com',
            'password': 'newpassword123',
            'role': 'Client',  # Or other roles
            'warehouses': 'Warehouse_1',
            'tax_id': '12345678',
            'phone': '1234567890',
            # Other fields as needed
        }
        response = self.client.post('users/api/users/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['success'], "New user created successfully")
