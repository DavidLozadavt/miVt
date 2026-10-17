from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
def mensajeInicial(request):
    return HttpResponse('hola mundo');
def login(request):
    return render(request,'html/login.html')

