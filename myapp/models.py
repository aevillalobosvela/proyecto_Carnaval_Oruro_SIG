from django.db import models
from django.contrib.auth.models import User

class diario(models.Model):
    fech_reg = models.DateField(null=True, blank=True)
    hora_in = models.TimeField(blank=True)
    hora_out = models.TimeField(blank=True)
    retraso = models.BooleanField(default=False)
    salida = models.BooleanField(default=False)
    empleado = models.ForeignKey(User, on_delete=models.CASCADE)


class pagomes(models.Model):
    anio_pago = models.PositiveIntegerField(blank=True)
    mes_pago = models.PositiveIntegerField(blank=True)
    retrasos = models.PositiveIntegerField(blank=True)
    salidas = models.PositiveIntegerField(blank=True)
    tot_descento = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    empleado = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
