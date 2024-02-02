from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.contrib.auth.hashers import check_password, make_password
from jwt import encode
from django.core.mail import EmailMessage
from django.conf import settings
import jwt
from datetime import datetime, timedelta
from decouple import config
from django.forms.models import model_to_dict

from Users.models import User
from Users.serializers import UserSerializer

from Courses.models import Course
from Courses.serializers import CourseSerializer

# Validate email
from django.core.validators import validate_email
from django.core.exceptions import ValidationError


# API views (Update and delete user - Get/update enrolled courses)
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
                enrolled_courses = []

                for course in user.enrolled_courses:

                    try:
                        # Get the course
                        enrolled_course = Course.objects.get(name=course["name"])
                        enrolled_course_serializer = CourseSerializer(enrolled_course)

                        # Transform the course to a dictionary
                        enrolled_course_dict = enrolled_course_serializer.data

                        # Add the state of the course
                        enrolled_course_dict["state"] = course["state"]

                        # Add the converted course to the list
                        enrolled_courses.append(enrolled_course_dict)

                        # Remove some fields in enrolled_courses
                        for index in range(len(enrolled_courses)):
                            del enrolled_courses[index]['description']
                            del enrolled_courses[index]['modules']
                            del enrolled_courses[index]['comments']
                            del enrolled_courses[index]['trailer_video_url']

                    except Course.DoesNotExist:
                        return JsonResponse("Error al retornar los cursos del usuario", safe=False, status=404)

                return JsonResponse(enrolled_courses, safe=False, status=200)

            except User.DoesNotExist:
                return JsonResponse("Error al retornar los cursos del usuario", safe=False, status=404)


        # Update user
        # Now it can update the fields trailer_video_url and course_image_url
        elif request.method == 'PUT':
            user = User.objects.get(email=user_token)

            # Update only enrolled courses
            if "enrolled_courses" in request.data:
                user_serializer = UserSerializer(user, data={'enrolled_courses': user.enrolled_courses + request.data["enrolled_courses"]}, partial=True)

                if user_serializer.is_valid():
                    user_serializer.save()
                    return JsonResponse("Cursos del usuario actualizados", safe=False)

            # Update the rest of the user information
            else:
                user_serializer = UserSerializer(user, data=request.data, partial=True)

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


# Add field last_module_name and last_subtopic_name in field enrolled_courses
@csrf_exempt
@api_view(['PUT'])
def add_last_watched_course(request):
    if request.method == 'PUT':
        user_token = verify_token(request) # return the email of the user if the token is valid

        if user_token is False:
            return JsonResponse("Acceso no autorizado", safe=False, status=401)

        else:
            data = JSONParser().parse(request)

            try:
                user = User.objects.get(email=user_token)
                user_serializer = UserSerializer(user)

                # Get the specific enrolled course
                for enrolled_course in user_serializer.data["enrolled_courses"]:
                    if enrolled_course["name"] == data["name"]:
                        # Update the last_module_name and last_subtopic_name
                        #enrolled_course["state"] = data["state"]
                        enrolled_course["last_module_name"] = data["last_module_name"]
                        enrolled_course["last_subtopic_name"] = data["last_subtopic_name"]

                # Update the enrolled courses
                user_serializer = UserSerializer(user, data={'enrolled_courses': user_serializer.data["enrolled_courses"]}, partial=True)

                if user_serializer.is_valid():
                    user_serializer.save()
                    return JsonResponse("Ultimo curso visto agregado", safe=False, status=200)

            except User.DoesNotExist:
                return JsonResponse("Usuario no encontrado", safe=False, status=404)


# Get the last watched course
@csrf_exempt
@api_view(['GET'])
def get_last_watched_course(request, course_name):
    if request.method == 'GET':
        user_token = verify_token(request) # return the email of the user if the token is valid

        if user_token is False:
            return JsonResponse("Acceso no autorizado", safe=False, status=401)

        else:
            try:
                user = User.objects.get(email=user_token)
                user_serializer = UserSerializer(user)

                # Get the specific enrolled course
                for enrolled_course in user_serializer.data["enrolled_courses"]:
                    if enrolled_course["name"] == course_name:
                        del enrolled_course["state"] # Remove the field state

                        return JsonResponse(enrolled_course, safe=False, status=200)

            except User.DoesNotExist:
                return JsonResponse("Usuario no encontrado", safe=False, status=404)


# Verify if the user is enrolled in a course
@csrf_exempt
@api_view(['GET'])
def is_enrolled_in_course(request, course_name):
    if request.method == 'GET':
        user_token = verify_token(request)

        if user_token is False:
            return JsonResponse("Acceso no autorizado", safe=False, status=401)

        else:
            try:
                user = User.objects.get(email=user_token)
                user_serializer = UserSerializer(user)

                # Get the specific enrolled course
                for enrolled_course in user_serializer.data["enrolled_courses"]:
                    if enrolled_course["name"] == course_name:
                        return JsonResponse(True, safe=False, status=200) # The user is enrolled in the course

                return JsonResponse(False, safe=False, status=200) # The user is not enrolled in the course

            except User.DoesNotExist:
                return JsonResponse("Usuario no encontrado", safe=False, status=404)


# Sign up
@csrf_exempt
@api_view(['POST'])
def sign_up(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)

        # Verify if the email is valid
        if is_valid_email(data.get("email")) is False:
            return JsonResponse("Correo electrónico inválido", safe=False, status=400)
        else:
            # Check if the user is registered
            existing_user = User.objects.filter(email=data.get("email")).first()

            if existing_user is not None:
                # Existing user
                response_data = {'mensaje': f'Este usuario ya existe'}
                status = 402
            else:
                # Hash the password with a random salt
                data["password"] = make_password(data["password"])

                # If you are not registered, add user
                user_serializer = UserSerializer(data=data)
                if user_serializer.is_valid():
                    user_serializer.save()
                    user = user_serializer.data

                    response_data = {'mensaje': f'Usuario agregado'}
                    status = 200

                    # Send email to verify
                    subject = "Verificación de correo electrónico"
                    message = f"Hola {user.get('name')} {user.get('lastname')},\n\nPor favor, verifica tu correo electrónico haciendo click en el siguiente enlace:\n\n{config('URL_FRONTEND')}/verify-email/\n\nGracias,\n\nEl equipo de Virtual Poli."
                    send_email(user.get("email"), subject, message)
                else:
                    response_data = {'mensaje': f'Error al guardar el usuario'}
                    status = 400

            return JsonResponse(response_data, safe=False, status=status)


# Sign in
@csrf_exempt
@api_view(['POST'])
def sign_in(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)

        # Verify if the email is valid
        if is_valid_email(data.get("email")) is False:
            return JsonResponse("Correo electrónico inválido", safe=False, status=400)
        else:
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

                            return JsonResponse(user_serializer.data['session_token'], safe=False)
                        else:
                            return JsonResponse({"mensaje": "Contraseña incorrecta"}, status=401)

                    else:
                        return JsonResponse({"mensaje": "Correo electrónico no verificado"}, status=403)

                except User.DoesNotExist:
                    return JsonResponse({"mensaje": "Usuario no encontrado"}, status=404)

            else:
                return JsonResponse({"mensaje": "Correo electrónico y contraseña no ingresados"}, status=400)


# Sign out
@csrf_exempt
@api_view(['PUT'])
def sign_out(request):
    if request.method == 'PUT':
        user_token = verify_token(request) # return the email of the user if the token is valid

        if user_token is False:
            return JsonResponse("Acceso no autorizado", safe=False, status=401)

        else:
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
    if request.method == 'PUT':
        user_token = verify_token(request)
        if user_token is False:
            return JsonResponse("Acceso no autorizado", safe=False, status=401)

        else:
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


# Send an email to restore password
@csrf_exempt
@api_view(['PUT'])
def send_email_to_restore_password(request):
    if request.method == 'PUT':
        data = JSONParser().parse(request)

        # Verify if the email is valid
        if is_valid_email(data.get("email")) is False:
            return JsonResponse("Correo electrónico inválido", safe=False, status=400)
        else:
            email = data.get("email")

            try:
                # Verify if the user exists
                user = User.objects.get(email=email)

                # Send email to reset password
                subject = "Restablecer contraseña"
                message = f"Hola {user.name} {user.lastname},\n\nPor favor, restablece tu contraseña haciendo click en el siguiente enlace:\n\n{config('URL_FRONTEND')}/restore-account/\n\nGracias,\n\nEl equipo de Virtual Poli."
                send_email(user.email, subject, message)

                return JsonResponse("Correo electrónico enviado", safe=False, status=200)

            except User.DoesNotExist:
                return JsonResponse("Usuario no encontrado", safe=False, status=404)


# Restore password
@csrf_exempt
@api_view(['PUT'])
def restore_password(request):
    if request.method == 'PUT':
        data = JSONParser().parse(request)

        # Verify if the email is valid
        if is_valid_email(data.get("email")) is False:
            return JsonResponse("Correo electrónico inválido", safe=False, status=400)
        else:
            email = data.get("email")

            try:
                # Verify if the user exists
                user = User.objects.get(email=email)

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


# Set email verification
@csrf_exempt
@api_view(['POST'])
def set_email_verification(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)

        # Verify if the email is valid
        if is_valid_email(data.get("email")) is False:
            return JsonResponse("Correo electrónico inválido", safe=False, status=400)
        else:
            email = data.get("email")

            try:
                user = User.objects.get(email=email)
                user_serializer = UserSerializer(user, data={'email_verification': True}, partial=True)

                if user_serializer.is_valid():
                    user_serializer.save()
                    return JsonResponse("Correo electrónico verificado", safe=False, status=200)

            except User.DoesNotExist:
                return JsonResponse("Usuario no encontrado", safe=False, status=404)


# Contact with us
@csrf_exempt
@api_view(['POST'])
def contact_with_us(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)

        # Verify if the email is valid
        if is_valid_email(data.get("email")) is False:
            return JsonResponse("Correo electrónico inválido", safe=False, status=400)
        else:
            # Send email to contact with us
            subject = "Contactar con equipo de Poli Virtual"
            message = f"Nombre: {data.get('name')}\n\nCorreo electrónico: {data.get('email')}\n\nMensaje: {data.get('message')}"
            send_email(config('EMAIL_HOST_USER'), subject, message)

            return JsonResponse("Correo electrónico enviado", safe=False, status=200)


# Send an email to the approve teacher to verify if he/she permits the user to be a teacher
# and update the fields: approve_teacher_email and approve_teacher
@csrf_exempt
@api_view(['PUT'])
def send_email_to_approve_teacher(request):
    if request.method == 'PUT':
        user_token = verify_token(request)
        if user_token is False:
            return JsonResponse("Acceso no autorizado", safe=False, status=401)

        else:
            data = JSONParser().parse(request)

            # Verify if the email is valid
            if is_valid_email(data.get("approve_teacher_email")) is False:
                return JsonResponse("Correo electrónico del profesor inválido", safe=False, status=400)
            else:
                approve_teacher_name = data.get("approve_teacher")
                approve_teacher_email = data.get("approve_teacher_email")

                try:
                    # Verify if the user exists
                    user = User.objects.get(email=user_token)
                    user_serializer = UserSerializer(user, data={'approve_teacher': approve_teacher_name, 'approve_teacher_email': approve_teacher_email}, partial=True)

                    if user_serializer.is_valid():
                        user_serializer.save()

                        # Send email to approve teacher
                        subject = "Solicitud para ser Instructor en la plataforma Poli Virtual"
                        message = f"Saludos cordiales {approve_teacher_name},\n\nNos comunicamos con usted para completar el proceso de SER UN INSTRUCTOR en la plataforma Poli Virtual, del estudiante:\n\nEstudiante: {user.name} {user.lastname}\n\nCorreo institucional: {user.email}\n\nPor favor, autoriza que el estudiante pueda ser un Instructor, en el caso de si hacerlo, haga clic en el siguiente enlace:\n\n{config('URL_FRONTEND')}/approve-to-be-teacher/\n\nCaso contrario, ignore este correo.\n\nGracias,\n\nEl equipo de Poli Virtual."
                        send_email(approve_teacher_email, subject, message)

                        return JsonResponse("Correo electrónico enviado", safe=False, status=200)

                except User.DoesNotExist:
                    return JsonResponse("Usuario no encontrado", safe=False, status=404)


# Be an instructor
@csrf_exempt
@api_view(['PUT'])
def be_an_instructor(request):
    if request.method == 'PUT':
        data = JSONParser().parse(request)

        # Verify if the email is valid
        if is_valid_email(data.get("email")) is False:
            return JsonResponse("Correo electrónico inválido", safe=False, status=400)
        else:
            try:
                user = User.objects.get(email=data.get("email"))
                user_serializer = UserSerializer(user, data={'role': 'instructor'}, partial=True)

                if user_serializer.is_valid():
                    user_serializer.save()

                    # Send an email to the user to notify that he/she is a teacher
                    subject = "Solicitud para ser Instructor en la plataforma Poli Virtual"
                    message = f"Saludos cordiales {user.name} {user.lastname},\n\nNos comunicamos con usted para notificarle que su solicitud para ser Instructor en la plataforma Poli Virtual ha sido aprobada.\n\nGracias,\n\nEl equipo de Poli Virtual."
                    send_email(user.email, subject, message)

                    return JsonResponse("Rol del estudiante actualizado", safe=False, status=200)

            except User.DoesNotExist:
                return JsonResponse("Usuario no encontrado", safe=False, status=404)


# Get the user profile
@csrf_exempt
@api_view(['GET'])
def get_user_profile(request):
    if request.method == 'GET':
        user_token = verify_token(request) # return the email of the user if the token is valid

        if user_token is False:
            return JsonResponse("Acceso no autorizado", safe=False, status=401)
        else:
            try:
                user = User.objects.get(email=user_token)
                user_serializer = UserSerializer(user)

                # Remove the field session_token
                user_data = user_serializer.data
                del user_data['session_token']
                del user_data['password']
                del user_data['email_verification']
                del user_data['enrolled_courses']

                return JsonResponse(user_data, safe=False, status=200)

            except User.DoesNotExist:
                return JsonResponse("Usuario no encontrado", safe=False, status=404)


# Get the instructor profile by the name and lastname
@csrf_exempt
@api_view(['GET'])
def get_instructor_profile(request, name_lastname):
    if request.method == 'GET':
        try:
            name_lastname = name_lastname.split("-")
            name = name_lastname[0]
            lastname = name_lastname[1]

            instructor = User.objects.get(name=name, lastname=lastname, role='instructor')
            instructor_serializer = UserSerializer(instructor)

            instructor_data = instructor_serializer.data
            del instructor_data['password'] # Remove the field password
            del instructor_data['role'] # Remove the field role
            del instructor_data['enrolled_courses'] # Remove the field enrolled_courses
            del instructor_data['email_verification'] # Remove the field email_verification
            del instructor_data['session_token'] # Remove the field session_token
            return JsonResponse(instructor_data, safe=False, status=200)

        except User.DoesNotExist:
            return JsonResponse("Usuario no encontrado", safe=False, status=404)


# Get the featured teachers
@csrf_exempt
@api_view(['GET'])
def featured_teachers(request):
    if request.method == 'GET':
        try:
            # Get the teachers with an assessment greater than 4.0
            teachers = User.objects.filter(score_teacher__gte=4.0)

            if len(teachers) != 0:
                teachers_serializer = UserSerializer(teachers, many=True)

                teachers_data = teachers_serializer.data

                for index in range(len(teachers_data)):
                    del teachers_data[index]['password'] # Remove the field password
                    del teachers_data[index]['approve_teacher_email'] # Remove the field approve_teacher_email
                    del teachers_data[index]['user_description'] # Remove the field user_description
                    del teachers_data[index]['enrolled_courses'] # Remove the field enrolled_courses
                    del teachers_data[index]['email_verification'] # Remove the field email_verification
                    del teachers_data[index]['session_token'] # Remove the field session_token
                    del teachers_data[index]['role'] # Remove the field role

                return JsonResponse(teachers_data, safe=False, status=200)
            else:
                return JsonResponse("No hay instructores destacados", safe=False, status=404)

        except User.DoesNotExist:
            return JsonResponse("No hay instructores disponibles", safe=False, status=404)


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
    # Verify the expiration and decode the token
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


# Verify if it is a valid email
def is_valid_email(email):
    try:
        validate_email(email)
        return True
    except ValidationError:
        return False
