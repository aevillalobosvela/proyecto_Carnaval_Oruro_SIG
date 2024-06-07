from django.db import models
from django.contrib.auth.models import User

class puntos_recorrido(models.Model):
    latitud_rc = models.FloatField(blank=True)
    longitud_rc = models.FloatField(blank=True)
