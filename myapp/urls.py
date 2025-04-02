from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    #
    # Rutas basicas de acceso #
    #
    path("", views.inicio, name="inicio"),
    path("login_user/", views.login_user, name="login_user"),
    path("ruta/", views.ruta, name="ruta"),
    path("registro/", views.registro, name="registro"),
    path("conoce/", views.conoce, name="conoce"),
    path("planifica/", views.planifica, name="planifica"),
    path("aprende/", views.aprende, name="aprende"),
    path("mis_marcadores/", views.mis_marcadores, name="mis_marcadores"),
    path("foro/", views.foro, name="foro"),
    #
    # Rutas de administrador #
    #
    path("usuarios_admin/", views.usuarios_admin, name="usuarios_admin"),
    path("inicio_admin/", views.inicio_admin, name="inicio_admin"),
    path("planifica_admin/", views.planifica_admin, name="planifica_admin"),
    path("conoce_admin/", views.conoce_admin, name="conoce_admin"),
    #
    # Rutas de obtencion de datos #
    #
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
    path(
        "obtener_punto_custom/", views.obtener_punto_custom, name="obtener_punto_custom"
    ),
    path("obtener_comentario/", views.obtener_comentario, name="obtener_comentario"),
    #
    # Rutas de gestion de informacion #
    #
    path(
        "eliminar-usuario/<int:user_id>/",
        views.eliminar_usuario,
        name="eliminar_usuario",
    ),
    path(
        "eliminar-punto-carnaval/<int:punto_id>/",
        views.eliminar_punto_carnaval,
        name="eliminar_punto_carnaval",
    ),
    path(
        "eliminar-punto-planifica<int:punto_id>/",
        views.eliminar_punto_planifica,
        name="eliminar_punto_planifica",
    ),
    path(
        "eliminar-punto-conoce<int:punto_id>/",
        views.eliminar_punto_conoce,
        name="eliminar_punto_conoce",
    ),
    path(
        "mis_marcadores/eliminar_punto_custom/<int:punto_id>/",
        views.eliminar_punto_custom,
        name="eliminar_punto_custom",
    ),
    path("actualizar_ruta/", views.actualizar_ruta, name="actualizar_ruta"),
    #
    # Otras rutas #
    #
    path("acceso_denegado/", views.acceso_denegado, name="acceso_denegado"),
    path("logout/", views.signout, name="logout"),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
