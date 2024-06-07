from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout, authenticate
from django.utils import timezone
from datetime import datetime
from datetime import time
from django.db import IntegrityError
import pandas as pd
from django.http import JsonResponse
from datetime import datetime, timedelta
from .models import puntos_recorrido

def inicio(request):
    usuario = request.user
    return render(request, "inicio.html", {"usuario": usuario})


def obtener_puntos_recorrido(request):
    datos = puntos_recorrido.objects.all()
    datos = [[coord.latitud_rc, coord.longitud_rc] for coord in datos]
    return JsonResponse(datos, safe=False)

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
            print(request.POST["username"])
            return render(
                request,
                "login_user.html",
                {
                    "form": AuthenticationForm,
                    "error": "Usuario o Password incorrecto(s)",
                },
            )
        else:
            print("Ingresa bien")
            print(request.POST["username"])
            login(request, user)
            return redirect("inicio")


def conoce(request):
    usuario = request.user
    return render(request, "conoce.html", {"usuario": usuario})


def planifica(request):
    usuario = request.user
    return render(request, "planifica.html", {"usuario": usuario})


def aprende(request):
    return render(request, "aprende.html")


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


def signup(request):
    if request.method == "GET":
        return render(request, "signup.html", {"form": UserCreationForm})
    else:
        print(request.POST)
        try:
            if request.POST["is_superuser"] == "on":
                superusuario = True
        except:
            superusuario = False
        if request.POST["password1"] == request.POST["password2"]:
            try:
                user = User.objects.create_user(
                    username=request.POST["username"],
                    password=request.POST["password1"],
                    first_name=request.POST["first_name"],
                    last_name=request.POST["last_name"],
                    email=request.POST["email"],
                    fec_nac=request.POST["fec_nac"],
                    salario=request.POST["salario"],
                    is_superuser=superusuario,
                )
                user.save()
                login(request, user)
                return redirect("signin")
            except IntegrityError:
                return render(
                    request,
                    "signup.html",
                    {"form": UserCreationForm, "error": "Usuario ya registrado"},
                )
            except ValueError:
                return render(
                    request,
                    "signup.html",
                    {"form": UserCreationForm, "error": "Datos no validos"},
                )
            except:
                return render(
                    request,
                    "signup.html",
                    {"form": UserCreationForm, "error": "Error en el registro"},
                )
        return render(
            request,
            "signup.html",
            {"form": UserCreationForm, "error": "Los Passwords no coinciden"},
        )


def signin(request):
    if request.method == "GET":
        return render(request, "signin.html", {"form": AuthenticationForm})
    else:
        user = authenticate(
            request,
            username=request.POST["username"],
            password=request.POST["password"],
        )
        if user is None:
            print(request.POST["username"])
            return render(
                request,
                "signin.html",
                {
                    "form": AuthenticationForm,
                    "error": "Usuario o Password incorrecto(s)",
                },
            )
        else:
            login(request, user)
            if user.is_superuser == True:
                return redirect("control")
            else:
                return redirect("marcar")


def about(request):
    return render(request, "about.html")


def control(request):
    usuario = request.user
    empleados = User.objects.filter(is_superuser=False)
    return render(request, "control.html", {"usuario": usuario, "empleados": empleados})


def marcar(request):
    ahora = datetime.now()
    usuario = request.user
    return render(request, "marcar.html", {"usuario": usuario, "fec_hora": ahora})


def signout(request):
    logout(request)
    return redirect("inicio")


""" def marcar_llegada(request):
    fecha_actual = timezone.now().date()
    hora_actual = datetime.now().time()
    hora_format = hora_actual.strftime("%H:%M:%S")
    ahora = datetime.now()
    usuario = request.user
    verificacion = diario.objects.filter(fech_reg=fecha_actual, empleado=usuario.id)
    if verificacion.exists():
        mensaje = "\nUsted ya ha registrado su entrada el dia de hoy \n"
    else:
        if time(5, 0, 0) <= hora_actual <= time(8, 10, 0):
            tiempo_retraso = False
            mensaje = (
                "Bienvenido empleado \n\n Su hora registrada de ingreso es: "
                + str(hora_format)
                + "\n\nSu solicitud ha sido registrada correctamente"
            )
        else:
            tiempo_retraso = True
            mensaje = (
                "Bienvenido empleado \n\n Su hora registrada de ingreso es: "
                + str(hora_format)
                + "\n\nTiempo con retraso registrado"
            )
        registro = diario(
            fech_reg=fecha_actual,
            hora_in=hora_actual,
            hora_out="00:00:00",
            retraso=tiempo_retraso,
            salida=False,
            empleado_id=usuario.id,
        )
        registro.save()

    return render(
        request,
        "marcar.html",
        {"usuario": usuario, "fec_hora": ahora, "mensaje": mensaje},
    )


def marcar_salida(request):
    fecha_actual = timezone.now().date()
    hora_actual = datetime.now().time()
    hora_format = hora_actual.strftime("%H:%M:%S")
    ahora = datetime.now()
    usuario = request.user
    verificacion = diario.objects.filter(
        fech_reg=fecha_actual, empleado=usuario.id, hora_out=time(0, 0, 0)
    )
    print(hora_actual)
    if time(18, 0, 0) <= hora_actual <= time(23, 59, 0):
        print("Salida correcta")
    else:
        print("Salida temprana")
    if verificacion.exists():
        diario_obj = diario.objects.get(
            fech_reg=fecha_actual, empleado=usuario.id, hora_out=time(0, 0, 0)
        )
        if time(18, 0, 0) <= hora_actual <= time(23, 59, 0):
            mensaje = (
                "Bienvenido empleado \n\n Su hora registrada de salida es: "
                + str(hora_format)
                + "\n\nSu solicitud ha sido registrada correctamente"
            )
        else:
            diario_obj.salida = True
            mensaje = (
                "Bienvenido empleado \n\n Su hora registrada de salida es: "
                + str(hora_format)
                + "\n\nSalida temprana registrada"
            )
        diario_obj.hora_out = hora_actual
        diario_obj.save()
    else:
        mensaje = "\nUsted aun no registra su entrada el dia de hoy o su salida ya fue registrada\n"

    return render(
        request,
        "marcar.html",
        {"usuario": usuario, "fec_hora": ahora, "mensaje": mensaje},
    )





def exportar_excel(request):
    registros = User.objects.filter(is_superuser=False)

    data = {
        "id": [],
        "first_name": [],
        "last_name": [],
        "email": [],
        "fec_nac": [],
        "salario": [],
    }
    for registro in registros:
        data["id"].append(registro.id)
        data["first_name"].append(registro.first_name)
        data["last_name"].append(registro.last_name)
        data["email"].append(registro.email)
        data["fec_nac"].append(registro.fec_nac)
        data["salario"].append(registro.salario)

    df = pd.DataFrame(data)
    response = HttpResponse(content_type="application/ms-excel")
    response["Content-Disposition"] = 'attachment; filename="registros.xlsx"'
    df.to_excel(response, index=False, engine="openpyxl")

    return response


def calcular(request, empleado_id):
    now = timezone.now()
    primer_dia_del_mes = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    ultimo_dia_del_mes = (now.replace(day=28) + timedelta(days=4)).replace(
        day=1, hour=0, minute=0, second=0, microsecond=0
    )

    usuario = request.user
    empleados = User.objects.filter(is_superuser=False)
    if request.method == "GET":
        return render(
            request, "control.html", {"usuario": usuario, "empleados": empleados}
        )
    else:
        empleado = User.objects.get(id=empleado_id)
        reg_retraso = diario.objects.filter(
            empleado=empleado_id,
            retraso=True,
            fech_reg__gte=primer_dia_del_mes,
            fech_reg__lt=ultimo_dia_del_mes,
        )
        retrasos = reg_retraso.count()
        reg_salida = diario.objects.filter(
            empleado=empleado_id,
            salida=True,
            fech_reg__gte=primer_dia_del_mes,
            fech_reg__lt=ultimo_dia_del_mes,
        )
        salidas = reg_salida.count()
        print(empleado_id)
        print(retrasos)
        print(salidas)
        descuento = 100 * retrasos + 100 * salidas
        total = empleado.salario - descuento

        mensaje = (
            "El empleado "
            + str(empleado.first_name)
            + " "
            + str(empleado.last_name)
            + " cuenta con un historial de "
            + str(retrasos)
            + " retraso(s) y "
            + str(salidas)
            + " salida(s) temprana(s) en el presente mes\n\nEsto da como resultado de un descuento de "
            + str(descuento)
            + " Bs. que seran retirados del salario mensual del empleado\n\nSalario neto: "
            + str(empleado.salario)
            + "\n\nSalario descontado: "
            + str(total)
        )

        registro = pagomes(
            anio_pago=2023,
            mes_pago=now.month,
            retrasos=retrasos,
            salidas=salidas,
            tot_descento=descuento,
            empleado_id=empleado_id,
        )
        registro.save()

        return render(
            request,
            "control.html",
            {
                "usuario": usuario,
                "id": empleado_id,
                "empleados": empleados,
                "obj_empleado": empleado,
                "mensaje": mensaje,
            },
        ) """


""" ------------------------------------------------------------------ """


""" def task_detail(request, task_id):
    if request.method == "GET":
        task = get_object_or_404(Task, pk=task_id, user=request.user)
        form = TaskForm(instance=task)
        return render(request, "task_detail.html", {"task": task, "form": form})
    else:
        try:
            task = get_object_or_404(Task, pk=task_id, user=request.user)
            form = TaskForm(request.POST, instance=task)
            form.save()
            return redirect("tasks")
        except ValueError:
            return render(
                request,
                "task_detail.html",
                {"form": form, "error": "No se pudo actualizar"},
            )


@login_required
def complete_task(request, task_id):
    task = get_object_or_404(Task, pk=task_id, user=request.user)
    if request.method == "POST":
        task.datecompleted = timezone.now()
        task.save()
        return redirect("tasks")


@login_required
def delete_task(request, task_id):
    task = get_object_or_404(Task, pk=task_id, user=request.user)
    if request.method == "POST":
        task.delete()
        return redirect("tasks")
 """
