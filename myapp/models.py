from django.db import models
from django.contrib.auth.models import User


class puntos_recorrido(models.Model):
    latitud_rc = models.FloatField(blank=True)
    longitud_rc = models.FloatField(blank=True)


class punto_carnaval(models.Model):
    coord_lat = models.FloatField()
    coord_lng = models.FloatField()
    titulo = models.CharField(max_length=255)
    direccion = models.CharField(max_length=255)
    imagen_ruta = models.CharField(max_length=255)

    def to_dict(self):
        return {
            "coord": [self.coord_lat, self.coord_lng],
            "titulo": self.titulo,
            "direccion": self.direccion,
            "imagen_ruta": self.imagen_ruta,
        }
