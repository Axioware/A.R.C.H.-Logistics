#!/bin/bash





# Run the Django shell and execute tenant creation commands
echo "
from django_tenants.utils import schema_context
from TenantsManagement.models import Client, Domain  # Adjust to match your app and model names
from django.contrib.sites.models import Site

# Check if public schema already exists
if not Client.objects.filter(schema_name='public').exists():
    tenant = Client(
        schema_name='public',
        name='Public Tenant',
        paid_until='2099-12-31',
        on_trial=False
    )
    tenant.save()

    # Attach a domain to the public schema
    domain = Domain(
        domain='localhost',
        tenant=tenant,
        is_primary=True
    )
    domain.save()
    print('Public schema created successfully.')
else:
    print('Public schema already exists.')

if not Site.objects.filter(domain='localhost').exists():
    Site.objects.create(domain='localhost', name='Public Admin Site')
" | python manage.py shell
