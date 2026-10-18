from django.shortcuts import render
from django.contrib.auth.decorators import login_required


@login_required
def bienvenido(request):
    return render(
        request,
        "html/bienvenido.html"
    )