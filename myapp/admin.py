from django.contrib import admin
from django.contrib.auth.models import User
from .models import puntos_recorrido

@admin.register(puntos_recorrido)
class puntos_recorridoAdmin(admin.ModelAdmin):
    list_display = ('latitud_rc', 'longitud_rc')
    search_fields = ('latitud_rc', 'longitud_rc')