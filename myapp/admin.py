from django.contrib import admin
from .models import Task
from .models import UsuarioPersonalizado
from .models import diario

# Register your models here.


admin.site.register(UsuarioPersonalizado)
admin.site.register(Task)
admin.site.register(diario)
