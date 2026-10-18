from django.shortcuts import redirect
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required


@login_required
def cerrar_sesion(request):
    if request.method == "POST":
        logout(request)
        return redirect("login")

    return redirect("bienvenido")