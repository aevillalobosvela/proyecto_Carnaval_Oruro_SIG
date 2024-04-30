from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", views.inicio, name="inicio"),
    path("logout/", views.signout, name="logout"),
    path("about/", views.about),
    path("signup/", views.signup, name="signup"),
    path("control/", views.control, name="control"),
    path("marcar/", views.marcar, name="marcar"),
    path("exportar-excel/", views.exportar_excel, name="exportar_excel"),
    path("marcar_llegada/", views.marcar_llegada, name="marcar_llegada"),
    path("marcar_salida/", views.marcar_salida, name="marcar_salida"),
    path("calcular/<int:empleado_id>/", views.calcular, name="calcular"),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

"""  path("", views.signin, name="signin"), """