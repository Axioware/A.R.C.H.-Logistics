from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'API'

    def ready(self):
        # Import and connect your signals here
        from . import signals
    

