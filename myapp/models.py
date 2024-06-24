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
    detalles = models.CharField(max_length=255, default="default")
    imagen_ruta = models.CharField(max_length=255)

    def to_dict(self):
        return {
            "id": self.id,
            "coord": [self.coord_lat, self.coord_lng],
            "titulo": self.titulo,
            "name": self.name,
            "descripcion": self.descripcion,
            "detalles": self.detalles,
            "imagen_ruta": self.imagen_ruta,
        }


class punto_custom(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    coord_lat = models.FloatField()
    coord_lng = models.FloatField()
    name = models.CharField(max_length=255)
    descripcion = models.CharField(max_length=255)

    def to_dict(self):
        return {
            "id": self.id,
            "coord": [self.coord_lat, self.coord_lng],
            "name": self.name,
            "descripcion": self.descripcion,
        }


class comentario(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    punto = models.ForeignKey(punto_conoce, on_delete=models.CASCADE)
    comentario_user = models.TextField()
    fecha_hora = models.DateTimeField(auto_now_add=True)
    rating = models.IntegerField(blank=True, null=True)

    def to_dict(self):
        return {
            "id": self.id,
            "usuario": self.usuario.username,
            "punto_id": self.punto.id,
            "comentario_user": self.comentario_user,
            "fecha_hora": self.fecha_hora,
            "rating": self.rating,
        }

class calificacion(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating_need = models.IntegerField(null=True, blank=True)
    rating_situation = models.IntegerField(null=True, blank=True)
    rating_experience = models.IntegerField(null=True, blank=True)
    rating_satisfaction = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"calificación de {self.user.username}"