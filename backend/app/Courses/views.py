from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.decorators import api_view

from Courses.models import Course
from Courses.serializers import CourseSerializer

import boto3
from decouple import config

import json

# API views
@csrf_exempt
@api_view(['POST', 'GET', 'DELETE'])
def course_api(request, id=0):
    #Create
    if request.method == 'POST':

        # Now it can create a couse with the fields trailer_video_url and course_image_url
        course_serializer = CourseSerializer(data=request.data)

        if course_serializer.is_valid():
            course_serializer.save()
            response_data = {'mensaje': f'Curso agregado'}
            status = 200
        else:
            response_data = {'mensaje': f'Error al guardar el curso'}
            status = 400

        return JsonResponse(response_data, safe=False, status=status)

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

    # Delete
    elif request.method == 'DELETE':
        try:
            course = Course.objects.get(id=id)
            course.delete()
            return JsonResponse("Curso eliminado", safe=False, status=200)

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
            courses = Course.objects.order_by('-id')[:5]

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


@csrf_exempt
@api_view(['POST'])
def upload_videos(request):
    if request.method == 'POST':
        #course_serializer = CourseSerializer(data=request.data)

        # Get the course
        #course = Course.objects.get(id=course_id)
        #course_serializer = CourseSerializer(course)

        # Get the modules of the course
        modules = json.loads(request.data['modules'])

        for module in modules:
            # Get the videos of the module
            topics = module['content']

            for topic in topics:
                topic['video_url'] = request.FILES['video'].name

        course_to_upload = {
            'name': request.data['name'],
            'description': request.data['description'],
            'category': request.data['category'],
            'instructor': request.data['instructor'],
            'modules': modules,
            'comments': request.data['comments'],
            'assessment': request.data['assessment'],
            'trailer_video_url': request.FILES['trailer_video_url'],
            'course_image_url': request.FILES['course_image_url']
        }

        course_serializer = CourseSerializer(data=course_to_upload)

        if course_serializer.is_valid():
            course_serializer.save()
            response_data = {'mensaje': f'Curso agregado'}
            status = 200
        else:
            response_data = {'mensaje': f'Error al guardar el curso'}
            status = 400

        return JsonResponse(response_data, safe=False, status=status)


# Upload content videos in bucket S3 AWS
def upload_content_videos_to_s3(course_id, video):
    s3 = boto3.client(
        's3',
        aws_access_key_id=config('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=config('AWS_SECRET_ACCESS_KEY')
    )

    # Save the video in Amazon S3
    s3_key = f'assets/{course_id}/{video.name}'
    s3.upload_fileobj(video, config('AWS_STORAGE_BUCKET_NAME'), s3_key)