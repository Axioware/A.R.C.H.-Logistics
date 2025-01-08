#!/bin/bash

# Usage: ./create_tenant.sh tenant_schema tenant_name domain_name
# Example: ./create_tenant.sh tenant2 "Tenant 2" tenant2.localhost

# Ensure correct number of arguments
if [ "$#" -ne 3 ]; then
    echo "Usage: $0 tenant_schema tenant_name domain_name"
    exit 1
fi

TENANT_SCHEMA=$1
TENANT_NAME=$2
DOMAIN_NAME=$3


# Execute Django shell commands to create tenant
echo "
from TenantsManagement.models import Client, Domain  # Adjust based on your app name and models
from datetime import date

# Check if tenant schema already exists
if not Client.objects.filter(schema_name='$TENANT_SCHEMA').exists():
    tenant = Client(
        schema_name='$TENANT_SCHEMA',
        name='$TENANT_NAME',
        paid_until=date(2099, 12, 31),
        on_trial=False
    )
    tenant.save()

    domain = Domain(
        domain='$DOMAIN_NAME',
        tenant=tenant,
        is_primary=True
    )
    domain.save()
    print('Tenant $TENANT_NAME ($TENANT_SCHEMA) created with domain $DOMAIN_NAME.')
else:
    print('Tenant $TENANT_SCHEMA already exists.')
" | python manage.py shell
