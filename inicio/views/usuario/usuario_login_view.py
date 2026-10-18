
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login


def login_pagina(request):

    # Si el usuario ya inició sesión,
    # lo enviamos directamente a bienvenida.
    if request.user.is_authenticated:
        return redirect("bienvenido")

    mensaje = ""

    if request.method == "POST":

        username = request.POST.get("username", "").strip()
        password = request.POST.get("password", "")

        # Validar credenciales
        usuario = authenticate(
            request,
            username=username,
            password=password
        )

        if usuario is not None:

            # Crear sesión en Django
            login(request, usuario)

            # Redirigir a la página principal
            return redirect("bienvenido")

        else:
            mensaje = "Usuario o contraseña incorrectos."

    # Mostrar formulario de inicio de sesión
    return render(
        request,
        "html/usuario_login.html",
        {"mensaje": mensaje}
    )
