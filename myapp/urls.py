from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", views.inicio, name="inicio"),
    path("login_user/", views.login_user, name="login_user"),
    path("registro/", views.registro, name="registro"),
    path("conoce/", views.conoce, name="conoce"),
    path("planifica/", views.planifica, name="planifica"),
    path("logout/", views.signout, name="logout"),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

"""  path("", views.signin, name="signin"), """