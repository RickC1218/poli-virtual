from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.contrib.auth.hashers import check_password

from Users.models import User
from Users.serializers import UserSerializer

# API views
@csrf_exempt
@api_view(['POST', 'GET', 'PUT', 'DELETE'])
def user_api(request, email=None):
    # Sign up
    if request.method == 'POST':
        data = JSONParser().parse(request)

        # Check if the user is registered
        existing_user = User.objects.filter(email=data.get("email")).first()

        if existing_user is not None:
            # Existing user
            email_del_usuario = existing_user.email
            response_data = {'mensaje': f'Ya existe este usario con el correo electrónico {email_del_usuario}'}
        else:
            # If you are not registered, add user
            user_serializer = UserSerializer(data=data)
            if user_serializer.is_valid():
                user_serializer.save()
                response_data = {'mensaje': f'Usuario agregado'}
            else:
                response_data = {'mensaje': f'Error al guardar el usuario'}

        return JsonResponse(response_data, safe=False)

    # Sign in
    elif request.method == 'GET':
        '''data = JSONParser().parse(request)
        # Get the email and password from the request
        email = data.get("email")
        password = data.get("password")

        # See authentication DJANGO
        if email:
            try:
                user = User.objects.get(email=email) # Get the user of the BD
                password_user = user.password

                # Compare hashed password with the password entered by the user
                if password == password_user:
                    user_serializer = UserSerializer(user)
                    return JsonResponse(user_serializer.data, safe=False)

                    # Return a token if the user is authenticated and the information of the user !!
                else:
                    return JsonResponse({"mensaje": "Contraseña incorrecta"}, status=401)

            except User.DoesNotExist:
                return JsonResponse({"mensaje": "Usuario no encontrado"}, status=404)

        else:'''
        users = User.objects.all()
        users_serializer = UserSerializer(users, many=True)
        return JsonResponse(users_serializer.data, safe=False)

    # Update user
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        user = User.objects.get(email=data['email'])
        user_serializer = UserSerializer(user, data=data)

        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Usuario actualizado", safe=False)

        return JsonResponse("Error al actualizar usuario")

    # Delete user
    elif request.method == 'DELETE':
        try:
            user = User.objects.get(email=email)
            user.delete()
            return JsonResponse("Usuario eliminado", safe=False)

        except User.DoesNotExist:
            return JsonResponse("Usuario no encontrado", safe=False)
