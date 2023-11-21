from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.urls import reverse

from Users.models import User
from Users.serializers import UserSerializer

# Vistas de la API

@csrf_exempt
def usersApi(request, id=0):
    if request.method == 'GET':
        user = User.objects.all()
        user_serializer = UserSerializer(user, many=True)
        return JsonResponse(user_serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        user_serializer = UserSerializer(data=data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Usuario agregado", safe=False)
        return JsonResponse("Error al guardar el usuario", safe=False)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        user = User.objects.get(userId=data['id'])
        user_serializer = UserSerializer(user, data=data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Usuario actualizado", safe=False)
        return JsonResponse("Error al actualizar usuario")
    elif request.method == 'DELETE':
        user = User.objects.get(userId=id)
        user.delete()
        return JsonResponse("Usuario eliminado", safe=False)