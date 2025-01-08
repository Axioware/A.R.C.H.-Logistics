#!/bin/bash

# Parameterized Shell Script to Create Tenant Superuser
# Usage: ./create_tenant_superuser.sh <tenant_schema> <username> <email> <password>

# Arguments
TENANT_SCHEMA=$1
USERNAME=$2
EMAIL=$3
PASSWORD=$4

# Check if all arguments are provided
if [ $# -ne 4 ]; then
    echo "Usage: $0 <tenant_schema> <username> <email> <password>"
    exit 1
fi

# Run Django shell to create superuser for the tenant
python manage.py shell <<EOF
from django_tenants.utils import schema_context
from django.contrib.auth.models import User

with schema_context('$TENANT_SCHEMA'):
    if not User.objects.filter(username='$USERNAME').exists():
        User.objects.create_superuser(
            username='$USERNAME',
            email='$EMAIL',
            password='$PASSWORD'
        )
        print("Superuser '$USERNAME' created successfully for tenant '$TENANT_SCHEMA'")
    else:
        print("User '$USERNAME' already exists in tenant '$TENANT_SCHEMA'")
EOF
