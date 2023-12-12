from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.contrib.auth.hashers import check_password, make_password
from jwt import encode
from django.core.mail import EmailMessage
from django.conf import settings
import json, jwt
from datetime import datetime, timedelta
from decouple import config

from Users.models import User
from Users.serializers import UserSerializer


# API views (Update and delete user - Get enrolled courses)
@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def user_api(request):
    user_token = verify_token(request) # return the email of the user if the token is valid

    if user_token is False:
        return JsonResponse("Acceso no autorizado", safe=False, status=401)

    else:
        # Get the enrolled courses of the user
        if request.method == 'GET':
            try:
                user = User.objects.get(email=user_token)

                # Transform the list to a regular dictionary
                json_str = json.dumps(user.enrolled_courses)
                regular_dict = json.loads(json_str)
                return JsonResponse(regular_dict, safe=False)

            except User.DoesNotExist:
                return JsonResponse("Error al retornar los cursos del usuario", safe=False, status=404)


        # Update user
        elif request.method == 'PUT':
            data = JSONParser().parse(request)
            user = User.objects.get(email=user_token)

            # Update only enrolled courses
            if "enrolled_courses" in data:
                # Transform the list to a regular dictionary
                json_str = json.dumps(user.enrolled_courses)
                regular_dict = json.loads(json_str)

                user_serializer = UserSerializer(user, data={'enrolled_courses': regular_dict + data["enrolled_courses"]}, partial=True)

                if user_serializer.is_valid():
                    user_serializer.save()
                    return JsonResponse("Cursos del usuario actualizados", safe=False)

            # Update the rest of the user information
            else:
                user_serializer = UserSerializer(user, data=data, partial=True)

                if user_serializer.is_valid():
                    user_serializer.save()
                    return JsonResponse("Usuario actualizado", safe=False, status=200)

            return JsonResponse("Error al actualizar usuario", safe=False, status=400)


        # Delete user
        elif request.method == 'DELETE':
            try:
                user = User.objects.get(email=user_token)
                user.delete()
                return JsonResponse("Usuario eliminado", safe=False, status=200)

            except User.DoesNotExist:
                return JsonResponse("Usuario no encontrado", safe=False, status=404)


# Sign up
@csrf_exempt
@api_view(['POST'])
def sign_up(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)

        # Check if the user is registered
        existing_user = User.objects.filter(email=data.get("email")).first()

        if existing_user is not None:
            # Existing user
            response_data = {'mensaje': f'Este usuario ya existe'}
        else:
            # Hash the password with a random salt
            data["password"] = make_password(data["password"])

            # If you are not registered, add user
            user_serializer = UserSerializer(data=data)
            if user_serializer.is_valid():
                user_serializer.save()
                user = user_serializer.data

                # Send email to verify
                subject = "Verificación de correo electrónico"
                message = f"Hola {user.get('name')} {user.get('lastname')},\n\nPor favor, verifica tu correo electrónico haciendo click en el siguiente enlace:\n\nhttp://localhost:3000/verify-email/\n\nGracias,\n\nEl equipo de Virtual Poli."
                send_email(user.get("email"), subject, message)

                response_data = {'mensaje': f'Usuario agregado'}
            else:
                response_data = {'mensaje': f'Error al guardar el usuario'}

        return JsonResponse(response_data, safe=False)


# Sign in
@csrf_exempt
@api_view(['POST'])
def sign_in(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        # Get the email and password from the request
        email = data.get("email")
        password = data.get("password")

        # Verify if email is not empty
        if email !="" and password != "":
            try:
                user = User.objects.get(email=email) # Get the user of the BD
                email_verification = user.email_verification

                if email_verification:
                    password_user = user.password

                    # Compare hashed password with the password entered by the user
                    if check_password(password, password_user):
                        user_serializer = UserSerializer(user)

                        # Generate JWT token
                        user_session_token = generate_token(user_serializer.data.get("email"))

                        # Update the session token of the user
                        user_serializer = UserSerializer(user, data={'session_token': user_session_token}, partial=True)
                        if user_serializer.is_valid():
                            user_serializer.save()

                        return JsonResponse(user_serializer.data, safe=False)
                    else:
                        return JsonResponse({"mensaje": "Contraseña incorrecta"}, status=401)

                else:
                    return JsonResponse({"mensaje": "Correo electrónico no verificado"}, status=401)

            except User.DoesNotExist:
                return JsonResponse({"mensaje": "Usuario no encontrado"}, status=404)

        else:
            return JsonResponse({"mensaje": "Correo electrónico y contraseña no ingresados"}, status=400)


# Sign out
@csrf_exempt
@api_view(['PUT'])
def sign_out(request):
    user_token = verify_token(request) # return the email of the user if the token is valid

    if user_token is False:
        return JsonResponse("Acceso no autorizado", safe=False, status=401)

    else:
        if request.method == 'PUT':
            try:
                user = User.objects.get(email=user_token)
                user_serializer = UserSerializer(user, data={'session_token': 'None'}, partial=True)

                if user_serializer.is_valid():
                    user_serializer.save()
                    return JsonResponse("Sesión cerrada", safe=False, status=200)
                else:
                    return JsonResponse("Error al cerrar sesión", safe=False, status=400)

            except User.DoesNotExist:
                return JsonResponse("Usuario no encontrado", safe=False, status=404)


# Update password
@csrf_exempt
@api_view(['PUT'])
def change_password(request):
    user_token = verify_token(request)
    if user_token is False:
        return JsonResponse("Acceso no autorizado", safe=False, status=401)

    else:
        if request.method == 'PUT':
            try:
                user = User.objects.get(email=user_token)

                data = JSONParser().parse(request)
                # Hash the password with a random salt
                data["password"] = make_password(data["password"])

                user_serializer = UserSerializer(user, data=data, partial=True)

                if user_serializer.is_valid():
                    user_serializer.save()
                    return JsonResponse("Contraseña actualizada", safe=False, status=200)
                else:
                    return JsonResponse("Error al actualizar la contraseña", safe=False, status=400)

            except User.DoesNotExist:
                return JsonResponse("Usuario no encontrado", safe=False, status=404)


# Reset password
@csrf_exempt
@api_view(['PUT'])
def restore_password(request):
    if request.method == 'PUT':
        data = JSONParser().parse(request)
        email = data.get("email")

        try:
            # Veirfy if the user exists
            user = User.objects.get(email=email)

            # Send email to reset password
            subject = "Restablecer contraseña"
            message = f"Hola {user.name} {user.lastname},\n\nPor favor, restablece tu contraseña haciendo click en el siguiente enlace:\n\nhttp://localhost:3000/reset-password/\n\nGracias,\n\nEl equipo de Virtual Poli."
            send_email(user.email, subject, message)

            return JsonResponse("Correo electrónico enviado", safe=False)

        except User.DoesNotExist:
            return JsonResponse("Usuario no encontrado", safe=False)


# Set email verification
@csrf_exempt
@api_view(['POST'])
def set_email_verification(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        email = data.get("email")

        try:
            user = User.objects.get(email=email)
            user_serializer = UserSerializer(user, data={'email_verification': True}, partial=True)

            if user_serializer.is_valid():
                user_serializer.save()
                return JsonResponse("Correo electrónico verificado", safe=False)

        except User.DoesNotExist:
            return JsonResponse("Usuario no encontrado", safe=False)


# Send an email
def send_email(email, subject, message):
    email = EmailMessage(
        subject,
        message,
        settings.EMAIL_HOST_USER,
        [email],
    )

    email.fail_silently = False  # If the email fails, it will not be silent
    email.send()


# Generate JWT token
def generate_token(user_email):
    token_payload = {
        'user_email': user_email,
        'exp': datetime.utcnow() + timedelta(days=1),
    }

    token = encode(token_payload, config('SECRET_KEY_TOKEN'), algorithm='HS256')
    return token


# Verify Token
def verify_token(request):
    # Verify and decode the token
    token = request.headers.get('Authorization', '').split(' ')[1]
    try:
        decoded_payload = jwt.decode(token, config('SECRET_KEY_TOKEN'), algorithms=['HS256'])
        user_email = decoded_payload['user_email']

        # Verify the current session token
        user = User.objects.get(email=user_email)
        user_session_token = user.session_token

        if user_session_token == token:
            return user_email
        else:
            return False
    except jwt.ExpiredSignatureError:
        return False
    except jwt.InvalidTokenError:
        return False

