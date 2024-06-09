from django.contrib import admin
from django.contrib.auth.models import User
from .models import puntos_recorrido
from .models import punto_carnaval
from .models import punto_planifica
from .models import punto_conoce

@admin.register(punto_conoce)
class punto_conoceAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'name', 'descripcion', 'coord_lat', 'coord_lng', 'imagen_ruta')
    search_fields = ('titulo', 'name')
    
@admin.register(punto_planifica)
class punto_planificaAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'name', 'coord_lat', 'coord_lng')
    search_fields = ('titulo', 'name')

@admin.register(punto_carnaval)
class punto_carnavalAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'direccion', 'coord_lat', 'coord_lng', 'imagen_ruta')
    search_fields = ('titulo', 'direccion')

@admin.register(puntos_recorrido)
class puntos_recorridoAdmin(admin.ModelAdmin):
    list_display = ('latitud_rc', 'longitud_rc')
    search_fields = ('latitud_rc', 'longitud_rc')