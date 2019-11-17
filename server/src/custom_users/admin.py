from django.contrib import admin
from custom_users.models import User


@admin.register(User)
class Admin(admin.ModelAdmin):
    pass
