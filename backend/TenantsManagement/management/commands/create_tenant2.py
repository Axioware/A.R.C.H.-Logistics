from django.core.management.base import BaseCommand
from TenantsManagement.models import Client, Domain

class Command(BaseCommand):
    help = "Creates a new tenant with predefined values"

    def handle(self, *args, **kwargs):  # Add *args and **kwargs here
        try:
            # Hardcoded values
            schema_name = "global"
            name = "Global Tenant"
            paid_until = "2026-01-01"
            on_trial = True
            tenant_domain = "global.a-r-c-h-logistics.onrender.com"

            # Create tenant
            tenant, created = Client.objects.get_or_create(
                schema_name=schema_name,
                defaults={
                    "name": name,
                    "paid_until": paid_until,
                    "on_trial": on_trial,
                }
            )

            if created:
                self.stdout.write(self.style.SUCCESS(f"✅ Successfully created tenant: {tenant.name}"))
            else:
                self.stdout.write(self.style.WARNING(f"⚠️ Tenant already exists: {tenant.name}"))

            # Create domain
            domain_obj, domain_created = Domain.objects.get_or_create(
                domain=tenant_domain,
                tenant=tenant,
                defaults={"is_primary": True}
            )

            if domain_created:
                self.stdout.write(self.style.SUCCESS(f"✅ Successfully created domain: {domain_obj.domain}"))
            else:
                self.stdout.write(self.style.WARNING(f"⚠️ Domain already exists: {domain_obj.domain}"))

        except Exception as e:
            self.stderr.write(self.style.ERROR(f"❌ Error: {e}"))
