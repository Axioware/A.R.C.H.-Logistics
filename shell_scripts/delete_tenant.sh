#!/bin/bash

# Usage: ./delete_tenant.sh tenant_schema
# Example: ./delete_tenant.sh tenant2

# Ensure correct number of arguments
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 tenant_schema"
    exit 1
fi

TENANT_SCHEMA=$1

# Execute Django shell commands to delete tenant
echo "
from TenantsManagement.models import Client, Domain  # Adjust based on your app name and models
from django.db import connection

# Find and delete the tenant
client = Client.objects.filter(schema_name='$TENANT_SCHEMA').first()
if client:
    Domain.objects.filter(tenant=client).delete()
    
    # Drop the schema from the database
    with connection.cursor() as cursor:
        cursor.execute(f'DROP SCHEMA IF EXISTS \"$TENANT_SCHEMA\" CASCADE;')

    client.delete()
    print('Tenant $TENANT_SCHEMA deleted successfully.')
else:
    print('Tenant $TENANT_SCHEMA does not exist.')
" | python3 ../backend/manage.py shell
