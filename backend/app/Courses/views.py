from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.decorators import api_view

from Courses.models import Course
from Courses.serializers import CourseSerializer

# API views
@csrf_exempt
@api_view(['POST', 'GET', 'PUT', 'DELETE'])
def course_api(request, id=0):
    #Create
    if request.method == 'POST':
        data = JSONParser().parse(request)

        # Check if the course is registered ¿?

        course_serializer = CourseSerializer(data=data)
        if course_serializer.is_valid():
            course_serializer.save()
            response_data = {'mensaje': f'Curso agregado'}
        else:
            response_data = {'mensaje': f'Error al guardar el curso'}

        return JsonResponse(response_data, safe=False)

    # Read
    elif request.method == 'GET':
        data = JSONParser().parse(request)
        course_id = data.get('id')

        if course_id:
            # Get the course by id
            try:
                course = Course.objects.get(id=course_id)
                course_serializer = CourseSerializer(course)
                return JsonResponse(course_serializer.data, safe=False)
            except Course.DoesNotExist:
                return JsonResponse("Curso no encontrado", safe=False, status=404)
        else:
            # Get all courses
            course = Course.objects.all()
            course_serializer = CourseSerializer(course, many=True)
            return JsonResponse(course_serializer.data, safe=False)

    # Update
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        course = Course.objects.get(id=data['id'])
        course_serializer = CourseSerializer(course, data=data)

        if course_serializer.is_valid():
            course_serializer.save()
            return JsonResponse("Curso actualizado", safe=False)

        return JsonResponse("Error al actualizar curso")

    # Delete
    elif request.method == 'DELETE':
        try:
            course = Course.objects.get(id=id)
            course.delete()
            return JsonResponse("Curso eliminado", safe=False)

        except course.DoesNotExist:
            return JsonResponse("Curso no encontrado", safe=False, status=404)


# Get the courses by the category
@csrf_exempt
@api_view(['GET'])
def courses_by_category(request, category):
    if request.method == 'GET':
        try:
            courses = Course.objects.filter(category=category)
            courses_serializer = CourseSerializer(courses, many=True)
            return JsonResponse(courses_serializer.data, safe=False, status=200)

        except Course.DoesNotExist:
            return JsonResponse("No hay cursos disponibles", safe=False, status=404)