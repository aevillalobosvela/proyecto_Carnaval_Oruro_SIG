import json
from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout, authenticate
from django.utils import timezone
from django.db import IntegrityError
from django.http import JsonResponse, HttpResponseForbidden
from .models import puntos_recorrido, punto_carnaval, punto_planifica
from .models import calificacion, punto_conoce, punto_custom, comentario
from .forms import calificacionForm
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError
from django.db.models import Avg


def inicio(request):
    usuario = request.user
    return render(request, "inicio.html", {"usuario": usuario, "active_page": "inicio"})


def obtener_puntos_recorrido(request):
    datos = puntos_recorrido.objects.all()
    res = [
        {"latitud": coord.latitud_rc, "longitud": coord.longitud_rc} for coord in datos
    ]
    return JsonResponse(res, safe=False)


def obtener_punto_carnaval(request):
    datos = [
        punto_carnaval.to_dict() for punto_carnaval in punto_carnaval.objects.all()
    ]
    return JsonResponse(datos, safe=False)


def obtener_punto_planifica(request):
    datos = [
        punto_planifica.to_dict() for punto_planifica in punto_planifica.objects.all()
    ]
    return JsonResponse(datos, safe=False)


def obtener_punto_conoce(request):
    datos = [punto_conoce.to_dict() for punto_conoce in punto_conoce.objects.all()]
    return JsonResponse(datos, safe=False)


def obtener_punto_custom(request):
    puntos_usuario = punto_custom.objects.filter(user=request.user)
    datos = [punto.to_dict() for punto in puntos_usuario]
    return JsonResponse(datos, safe=False)


def obtener_comentario(request):
    datos = comentario.objects.all()
    datos_dict = [comentario.to_dict() for comentario in datos]
    return JsonResponse(datos_dict, safe=False)


def login_user(request):
    if request.method == "GET":
        return render(request, "login_user.html", {"form": AuthenticationForm})
    else:
        user = authenticate(
            request,
            username=request.POST["username"],
            password=request.POST["password"],
        )
        if user is None:
            return render(
                request,
                "login_user.html",
                {
                    "form": AuthenticationForm,
                    "error": "Usuario o Password incorrecto(s)",
                },
            )
        else:
            if user.is_superuser:
                print("Ingresa admin")
                login(request, user)
                return redirect("usuarios_admin")
            else:
                print("Ingresa bien")
                login(request, user)
                return redirect("inicio")


def acceso_denegado(request):
    return render(request, "acceso_denegado.html")


def ruta(request):
    usuario = request.user
    return render(request, "ruta.html", {"usuario": usuario, "active_page": "ruta"})


def planifica(request):
    print("entrando")
    usuario = request.user
    if not request.user.is_authenticated:
        print("entra sin user")
        initial_data = None
        form = calificacionForm(initial=initial_data)
        return render(
            request, "planifica.html", {"form": form, "active_page": "planifica"}
        )

    if request.method == "POST":
        print("Entra post")
        rating_need = request.POST.get("rating_need")
        rating_situation = request.POST.get("rating_situation")
        rating_experience = request.POST.get("rating_experience")
        rating_satisfaction = request.POST.get("rating_satisfaction")

        calificacionu, created = calificacion.objects.get_or_create(user=usuario)
        calificacionu.rating_need = rating_need
        calificacionu.rating_situation = rating_situation
        calificacionu.rating_experience = rating_experience
        calificacionu.rating_satisfaction = rating_satisfaction
        calificacionu.save()

        return redirect("planifica")

    # Verificar si el usuario ya tiene una calificación
    else:
        try:
            calificacion_existente = calificacion.objects.get(user=usuario)
            initial_data = {
                "rating_need": calificacion_existente.rating_need,
                "rating_situation": calificacion_existente.rating_situation,
                "rating_experience": calificacion_existente.rating_experience,
                "rating_satisfaction": calificacion_existente.rating_satisfaction,
            }
        except calificacion.DoesNotExist:
            initial_data = None
        # Si es un GET request, mostrar el formulario con la calificación existente (si hay)
        form = calificacionForm(initial=initial_data)
        return render(
            request,
            "planifica.html",
            {"form": form, "usuario": usuario, "active_page": "planifica"},
        )


def conoce(request):
    usuario = request.user
    return render(request, "conoce.html", {"usuario": usuario, "active_page": "conoce"})


def mis_marcadores(request):

    if request.method == "POST":
        try:
            coord_lat = request.POST.get("coord_lat")
            coord_lng = request.POST.get("coord_lng")
            nombre = request.POST.get("nombre")
            descripcion = request.POST.get("descripcion")

            punto = punto_custom.objects.create(
                user=request.user,
                coord_lat=coord_lat,
                coord_lng=coord_lng,
                name=nombre,
                descripcion=descripcion,
            )
            usuario = request.user
            return render(
                request,
                "mis_marcadores.html",
                {"usuario": usuario, "active_page": "mis_marcadores"},
            )
        except ValidationError as ve:
            usuario = request.user
            return render(
                request,
                "mis_marcadores.html",
                {"usuario": usuario, "active_page": "mis_marcadores"},
            )
        except ValueError:
            usuario = request.user
            return render(
                request,
                "mis_marcadores.html",
                {"usuario": usuario, "active_page": "mis_marcadores"},
            )
        except Exception as e:
            usuario = request.user
            return render(
                request,
                "mis_marcadores.html",
                {"usuario": usuario, "active_page": "mis_marcadores"},
            )
    else:
        if not request.user.is_authenticated:
            return render(request, "acceso_denegado.html")
        else:
            usuario = request.user
            return render(
                request,
                "mis_marcadores.html",
                {"usuario": usuario, "active_page": "mis_marcadores"},
            )


def foro(request):

    if request.method == "POST":
        try:
            comentario_user = request.POST.get("comentario_user")
            id_punto = request.POST.get("id_punto")
            ratingu = request.POST.get("rating")
            punto = punto_conoce.objects.get(id=id_punto)
            comentario_user = comentario.objects.create(
                usuario=request.user,
                punto=punto,
                comentario_user=comentario_user,
                fecha_hora=timezone.now(),
                rating=ratingu,
            )
            usuario = request.user
            return render(
                request, "foro.html", {"usuario": usuario, "active_page": "foro"}
            )
        except ValidationError as ve:
            usuario = request.user
            return render(
                request, "foro.html", {"usuario": usuario, "active_page": "foro"}
            )
        except ValueError:
            usuario = request.user
            return render(
                request, "foro.html", {"usuario": usuario, "active_page": "foro"}
            )
        except Exception as e:
            usuario = request.user
            return render(
                request, "foro.html", {"usuario": usuario, "active_page": "foro"}
            )
    else:
        if not request.user.is_authenticated:
            return render(request, "acceso_denegado.html")
        else:
            usuario = request.user
            return render(
                request, "foro.html", {"usuario": usuario, "active_page": "foro"}
            )


def aprende(request):
    return render(request, "aprende.html", {"active_page": "aprende"})


def registro(request):
    if request.method == "GET":
        return render(request, "registro.html", {"form": UserCreationForm})
    else:
        print(request.POST)

        if request.POST["password1"] == request.POST["password2"]:
            try:
                user = User.objects.create_user(
                    username=request.POST["user"],
                    password=request.POST["password1"],
                    first_name=request.POST["nombre"],
                )
                user.save()
                print("Usuario registrado")
                return redirect("login_user")
            except IntegrityError:
                return render(
                    request,
                    "registro.html",
                    {"form": UserCreationForm, "error": "Usuario ya registrado"},
                )
            except ValueError:
                return render(
                    request,
                    "registro.html",
                    {"form": UserCreationForm, "error": "Datos no validos"},
                )
            except:
                return render(
                    request,
                    "registro.html",
                    {"form": UserCreationForm, "error": "Error en el registro"},
                )

        return render(
            request,
            "registro.html",
            {"form": UserCreationForm, "error": "Los Passwords no coinciden"},
        )


@login_required
def eliminar_usuario(request, user_id):
    if request.method == "POST":
        user = get_object_or_404(User, id=user_id)
        user.delete()
        return JsonResponse({"status": "success"}, status=200)
    return JsonResponse({"status": "error"}, status=400)


@login_required
def eliminar_punto_carnaval(request, punto_id):
    if request.method == "POST":
        punto = get_object_or_404(punto_carnaval, id=punto_id)
        punto.delete()
        return JsonResponse({"status": "success"}, status=200)
    return JsonResponse({"status": "error"}, status=400)


@login_required
def eliminar_punto_planifica(request, punto_id):
    if request.method == "POST":
        punto = get_object_or_404(punto_planifica, id=punto_id)
        punto.delete()
        return JsonResponse({"status": "success"}, status=200)
    return JsonResponse({"status": "error"}, status=400)


@login_required
def eliminar_punto_conoce(request, punto_id):
    if request.method == "POST":
        punto = get_object_or_404(punto_conoce, id=punto_id)
        punto.delete()
        return JsonResponse({"status": "success"}, status=200)
    return JsonResponse({"status": "error"}, status=400)


def eliminar_punto_custom(request, punto_id):
    punto = get_object_or_404(punto_custom, pk=punto_id)
    if punto.user == request.user:
        punto.delete()
        return JsonResponse({"status": "success"})
    else:
        return HttpResponseForbidden("No tienes permisos para realizar esta acción.")


@csrf_exempt
def actualizar_ruta(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            puntos = data.get("puntos", [])
            puntos_recorrido.objects.all().delete()
            for punto in puntos:
                puntos_recorrido.objects.create(
                    latitud_rc=punto["latitud"], longitud_rc=punto["longitud"]
                )

            return JsonResponse({"status": "success"}, status=200)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)
    return JsonResponse(
        {"status": "error", "message": "Invalid request method"}, status=400
    )


@login_required
def usuarios_admin(request):
    usuario = request.user
    usuarios = User.objects.filter(is_superuser=False)
    promedios = calificacion.objects.aggregate(
        promedio_need=Avg("rating_need"),
        promedio_situation=Avg("rating_situation"),
        promedio_experience=Avg("rating_experience"),
        promedio_satisfaction=Avg("rating_satisfaction"),
    )

    promedio_need = round(promedios["promedio_need"], 1)
    promedio_situation = round(promedios["promedio_situation"], 1)
    promedio_experience = round(promedios["promedio_experience"], 1)
    promedio_satisfaction = round(promedios["promedio_satisfaction"], 1)
    return render(
        request,
        "admin/usuarios_admin.html",
        {
            "usuario": usuario,
            "usuarios": usuarios,
            "promedio_need": promedio_need,
            "promedio_situation": promedio_situation,
            "promedio_experience": promedio_experience,
            "promedio_satisfaction": promedio_satisfaction,
        },
    )


@login_required
def inicio_admin(request):

    if request.method == "POST":
        coord_lat = request.POST.get("coord_lat")
        coord_lng = request.POST.get("coord_lng")
        titulo = request.POST.get("titulo")
        direccion = request.POST.get("direccion")

        if request.POST.get("titulo") == "Puesto de Salud":
            imagen = "static/img/mapa/salud/salud7.png"
        if request.POST.get("titulo") == "Paso Peatonal":
            imagen = "static/img/mapa/paso1.jpg"
        if request.POST.get("titulo") == "Deposito residual":
            imagen = "static/img/mapa/deposito1.jpg"
        if request.POST.get("titulo") == "Puesto Policial":
            imagen = "static/img/mapa/policia/policia1.jpg"

        punto = punto_carnaval.objects.create(
            coord_lat=coord_lat,
            coord_lng=coord_lng,
            titulo=titulo,
            direccion=direccion,
            imagen_ruta=imagen,
        )
        puntos = punto_carnaval.objects.all()
        return render(request, "admin/inicio_admin.html", {"puntos": puntos})
    else:
        puntos = punto_carnaval.objects.all()
        return render(request, "admin/inicio_admin.html", {"puntos": puntos})


@login_required
def planifica_admin(request):

    if request.method == "POST":
        coord_lat = request.POST.get("coord_lat")
        coord_lng = request.POST.get("coord_lng")
        titulo = request.POST.get("titulo")
        nombre = request.POST.get("nombre")

        punto = punto_planifica.objects.create(
            coord_lat=coord_lat,
            coord_lng=coord_lng,
            titulo=titulo,
            name=nombre,
        )
        puntos = punto_planifica.objects.all()
        return render(request, "admin/planifica_admin.html", {"puntos": puntos})
    else:
        puntos = punto_planifica.objects.all()
        return render(request, "admin/planifica_admin.html", {"puntos": puntos})


@login_required
def conoce_admin(request):

    if request.method == "POST":
        coord_lat = request.POST.get("coord_lat")
        coord_lng = request.POST.get("coord_lng")
        titulo = request.POST.get("titulo")
        nombre = request.POST.get("nombre")
        descripcion = request.POST.get("descripcion")
        detalles = request.POST.get("detalles")

        if request.POST.get("titulo") == "Hotel":
            imagen = "/static/img/conoceoruro/hot.png"
        if request.POST.get("titulo") == "Comida":
            imagen = "/static/img/conoceoruro/resta.png"
        if request.POST.get("titulo") == "Museo":
            imagen = "/static/img/conoceoruro/mm.png"
        if request.POST.get("titulo") == "Iglesia":
            imagen = "/static/img/conoceoruro/i.png"

        punto = punto_conoce.objects.create(
            coord_lat=coord_lat,
            coord_lng=coord_lng,
            titulo=titulo,
            name=nombre,
            descripcion=descripcion,
            detalles=detalles,
            imagen_ruta=imagen,
        )
        puntos = punto_conoce.objects.all()
        return render(request, "admin/conoce_admin.html", {"puntos": puntos})
    else:
        puntos = punto_conoce.objects.all()
        return render(request, "admin/conoce_admin.html", {"puntos": puntos})


def signout(request):
    logout(request)
    return redirect("inicio")
