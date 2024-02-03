from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from Content.serializers import ContentSerializer

from decouple import config

from Users import views


# API views
@csrf_exempt
@api_view(['POST'])
def content_api(request):
    #Create
    if request.method == 'POST':
        content_serializer = ContentSerializer(data=request.data)

        if content_serializer.is_valid():
            content = content_serializer.save()

            # Modify video_url name with the id
            content_video = request.FILES.get('video_url')
            content_video_url = config('URL_VIDEO_COURSE_CONTENT_STORAGE') + views.clean_string(content_video.name)
            print(content_video_url)
            views.delete_object_in_s3(content_video_url)

            if content_video:
                content_video.name = f"content_video_{content.id}"
                content.video_url = content_video
                content.save()

            response_data = {'mensaje': f'Contenido agregado'}
            status = 200
        else:
            response_data = {'mensaje': f'Error al guardar el contenido'}
            status = 400

        return JsonResponse(response_data, safe=False, status=status)