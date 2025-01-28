#!/bin/bash

# Ensure the script is being executed from the Django project directory
if [ ! -f "manage.py" ]; then
  echo "Error: This script must be run from the Django project root (where manage.py is located)."
  cd ../backend
#   exit 1
fi

# Execute the Python script in the Django shell
python manage.py shell <<EOF
from TenantsManagement.models import Client, Domain  # Adjust model paths to your project

# Fetch and print tenants and their domains
tenants = Client.objects.all()
if not tenants.exists():
    print("No tenants found.")
else:
    for tenant in tenants:
        domains = Domain.objects.filter(tenant=tenant)
        print(f"Tenant: {tenant.schema_name}, Name: {tenant.name}, Domains: {[domain.domain for domain in domains]}")
EOF
