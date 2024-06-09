from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", views.inicio, name="inicio"),
    path(
        "obtener_puntos_recorrido/",
        views.obtener_puntos_recorrido,
        name="obtener_puntos_recorrido",
    ),
    path(
        "obtener_punto_carnaval/",
        views.obtener_punto_carnaval,
        name="obtener_punto_carnaval",
    ),
    path(
        "obtener_punto_planifica/",
        views.obtener_punto_planifica,
        name="obtener_punto_planifica",
    ),
    path(
        "obtener_punto_conoce/", views.obtener_punto_conoce, name="obtener_punto_conoce"
    ),
    path("login_user/", views.login_user, name="login_user"),
    path("registro/", views.registro, name="registro"),
    path("conoce/", views.conoce, name="conoce"),
    path("planifica/", views.planifica, name="planifica"),
    path("aprende/", views.aprende, name="aprende"),
    path("logout/", views.signout, name="logout"),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

"""  path("", views.signin, name="signin"), """
