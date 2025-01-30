#!/bin/bash

if [ "$#" -ne 4 ]; then
    echo "Usage: $0 <schema_name> <username> <email> <password>"
    exit 1
fi

SCHEMA_NAME=$1
USERNAME=$2
EMAIL=$3
PASSWORD=$4

echo "Applying migrations for schema: $SCHEMA_NAME"
python3 ../backend/manage.py migrate --schema="$SCHEMA_NAME"

echo "Creating superuser in schema: $SCHEMA_NAME"
python3 ../backend/manage.py shell <<EOF
from django_tenants.utils import schema_context
from django.contrib.auth.models import User
from Users.models import UsersExtended 

with schema_context("$SCHEMA_NAME"):
    user, created = User.objects.get_or_create(username="$USERNAME", defaults={"email": "$EMAIL"})
    if created:
        user.set_password("$PASSWORD")
        user.is_superuser = True
        user.is_staff = True
        user.save()
        print("Superuser created successfully with clearance level 1")
    else:
        print("Superuser already exists")
EOF
