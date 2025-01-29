#!/bin/bash

# Ensure correct usage
if [ "$#" -ne 4 ]; then
    echo "Usage: $0 <schema_name> <username> <email> <password>"
    exit 1
fi

SCHEMA_NAME=$1
USERNAME=$2
EMAIL=$3
PASSWORD=$4

# Apply migrations for the schema (if needed)
echo "Applying migrations for schema: $SCHEMA_NAME"
python3 manage.py migrate --schema="$SCHEMA_NAME"

# Create superuser within the specified schema
echo "Creating superuser in schema: $SCHEMA_NAME"
python3 manage.py shell <<EOF
from django_tenants.utils import schema_context
from django.contrib.auth.models import User

with schema_context("$SCHEMA_NAME"):
    if not User.objects.filter(username="$USERNAME").exists():
        User.objects.create_superuser("$USERNAME", "$EMAIL", "$PASSWORD")
        print("Superuser created successfully in schema: $SCHEMA_NAME")
    else:
        print("Superuser already exists in schema: $SCHEMA_NAME")
EOF
