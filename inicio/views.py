
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

from .forms import RegistroUsuarioForm


def registro_pagina(request):

    if request.method == "POST":
        formulario = RegistroUsuarioForm(request.POST)

        if formulario.is_valid():
            formulario.save()
            return redirect("login")

    else:
        formulario = RegistroUsuarioForm()

    return render(
        request,
        "html/registro.html",
        {"formulario": formulario}
    )


def login_pagina(request):

    mensaje = ""

    if request.method == "POST":

        username = request.POST.get("username", "")
        password = request.POST.get("password", "")

        usuario = authenticate(
            request,
            username=username,
            password=password
        )

        if usuario is not None:
            login(request, usuario)
            return redirect("dashboard")

        mensaje = "Usuario o contraseña incorrectos."

    return render(
        request,
        "html/login.html",
        {"mensaje": mensaje}
    )


@login_required
def dashboard(request):
    return render(request, "html/bienvenido.html")


def cerrar_sesion(request):

    if request.method == "POST":
        logout(request)

    return redirect("login")
