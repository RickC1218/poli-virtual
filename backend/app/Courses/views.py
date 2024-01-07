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

        # Now it can create a couse with the fields trailer_video_url and course_image_url
        course_serializer = CourseSerializer(data=request.data)

        if course_serializer.is_valid():
            course_serializer.save()
            response_data = {'mensaje': f'Curso agregado'}
        else:
            response_data = {'mensaje': f'Error al guardar el curso'}

        return JsonResponse(response_data, safe=False)

    # Read
    elif request.method == 'GET':
        course_id = id

        if course_id != 0:
            # Get the course by id
            try:
                course = Course.objects.get(id=course_id)
                course_serializer = CourseSerializer(course)
                return JsonResponse(course_serializer.data, safe=False, status=200)
            except Course.DoesNotExist:
                return JsonResponse("Curso no encontrado", safe=False, status=404)
        else:
            # Get all courses
            course = Course.objects.all()
            course_serializer = CourseSerializer(course, many=True)
            return JsonResponse(course_serializer.data, safe=False, status=200)

    # Update
    if request.method == 'PUT':

        try: # Now it can update the fields trailer_video_url and course_image_url
            course = Course.objects.get(id=request.data['id'])
            course_serializer = CourseSerializer(course, data=request.data, partial=True)

            if course_serializer.is_valid():
                course_serializer.save()
                return JsonResponse({"message": "Curso actualizado"}, safe=False, status=200)

        except Course.DoesNotExist:
            return JsonResponse({"error": "Curso no encontrado"}, safe=False, status=404)

        return JsonResponse({"error": "Error al actualizar curso"}, safe=False, status=400)

    # Delete
    elif request.method == 'DELETE':
        try:
            course = Course.objects.get(id=id)
            course.delete()
            return JsonResponse("Curso eliminado", safe=False)

        except Course.DoesNotExist:
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


# Get featured courses
@csrf_exempt
@api_view(['GET'])
def featured_courses(request):
    if request.method == 'GET':
        try:
            # Get the courses with an assessment greater than 4.0
            courses = Course.objects.filter(assessment__gte=4.0)

            if len(courses) != 0:
                courses_serializer = CourseSerializer(courses, many=True)
                return JsonResponse(courses_serializer.data, safe=False, status=200)
            else:
                return JsonResponse("No hay cursos destacados", safe=False, status=404)

        except Course.DoesNotExist:
            return JsonResponse("No hay cursos disponibles", safe=False, status=404)


# Get recently added courses
@csrf_exempt
@api_view(['GET'])
def recently_added_courses(request):
    if request.method == 'GET':
        try:
            # Get the last 3 courses added
            courses = Course.objects.order_by('-id')[:3]

            # Reverse the order of the courses
            courses = courses[::-1]

            courses_serializer = CourseSerializer(courses, many=True)
            return JsonResponse(courses_serializer.data, safe=False, status=200)

        except Course.DoesNotExist:
            return JsonResponse("No hay cursos disponibles", safe=False, status=404)


# Get the courses by the instructor
@csrf_exempt
@api_view(['GET'])
def courses_by_instructor(request, instructor_name):
    if request.method == 'GET':
        try:
            courses = Course.objects.filter(instructor=instructor_name)
            courses_serializer = CourseSerializer(courses, many=True)

            return JsonResponse(courses_serializer.data, safe=False, status=200)

        except Course.DoesNotExist:
            return JsonResponse("No hay cursos disponibles", safe=False, status=404)
