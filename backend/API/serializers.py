# from rest_framework import serializers
# from .models import UsersExtended
# from django.contrib.auth.models import User

# class UsersExtendedSerializer(serializers.ModelSerializer):
#     username = serializers.CharField(source='username.username')  # U_name linked to Django User model
#     email = serializers.EmailField(source='username.email')  # Primary email from User model

#     class Meta:
#         model = UsersExtended
#         fields = [
#             'username', 'role', 'email', 'phone', 'password', 'first_name', 'last_name',
#             'tax_id', 'address', 'billing_type', 'llc_name', 'state', 'city', 'zip'
#         ]
    
#     def create(self, validated_data):
#         # Extract user-related data
#         user_data = validated_data.pop('username')
#         # Create the User object (Django's default user)
#         user = User.objects.create(
#             username=user_data['username'],
#             email=user_data['email']
#         )
#         user.set_password(validated_data['password'])  # Hash the password
#         user.save()

#         # Create the extended user details
#         users_extended = UsersExtended.objects.create(username=user, **validated_data)
#         return users_extended

#     def validate_role(self, value):
#         user = self.context['request'].user
#         if user.extended.role not in ['Owner', 'Manager']:
#             raise serializers.ValidationError("You do not have permission to create users.")
#         return value
    

# from django.contrib.auth.models import User
# from rest_framework import serializers
# from .models import UsersExtended

# class UserDetailSerializer(serializers.ModelSerializer):
#     # Fetch related data from UsersExtended
#     address = serializers.CharField(source='extended.address')
#     llc_name = serializers.CharField(source='extended.llc_name')
#     billing_type = serializers.CharField(source='extended.billing_type')

#     class Meta:
#         model = User
#         fields = [
#             'username', 'first_name', 'last_name', 'email', 'is_active',
#             'address', 'llc_name', 'billing_type'
#         ]
