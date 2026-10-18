from django.shortcuts import render, redirect
from ...forms.usuario_registro_form import RegistroUsuarioForm


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
        "html/usuario_registro.html",
        {"formulario": formulario}
    )