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


class punto_planifica(models.Model):
    coord_lat = models.FloatField()
    coord_lng = models.FloatField()
    titulo = models.CharField(max_length=255)
    name = models.CharField(max_length=255)

    def to_dict(self):
        return {
            "coord": [self.coord_lat, self.coord_lng],
            "titulo": self.titulo,
            "name": self.name,
        }

class punto_conoce(models.Model):
    coord_lat = models.FloatField()
    coord_lng = models.FloatField()
    titulo = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    descripcion = models.CharField(max_length=255)
    detalles = models.CharField(max_length=255, default='default')
    imagen_ruta = models.CharField(max_length=255)

    def to_dict(self):
        return {
            "coord": [self.coord_lat, self.coord_lng],
            "titulo": self.titulo,
            "name": self.name,
            "descripcion": self.descripcion,
            "detalles": self.detalles,
            "imagen_ruta": self.imagen_ruta,
        }