from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from Content.serializers import ContentSerializer



# API views
@csrf_exempt
@api_view(['POST'])
def content_api(request):
    #Create
    if request.method == 'POST':
        content_serializer = ContentSerializer(data=request.data)

        if content_serializer.is_valid():
            content_serializer.save()
            response_data = {'mensaje': f'Contenido agregado'}
            status = 200
        else:
            response_data = {'mensaje': f'Error al guardar el contenido'}
            status = 400

        return JsonResponse(response_data, safe=False, status=status)