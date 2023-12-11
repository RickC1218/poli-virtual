from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.decorators import api_view

from Categories.models import Category
from Categories.serializers import CategorySerializer

# API views
@csrf_exempt
@api_view(['POST', 'GET', 'PUT', 'DELETE'])
def category_api(request, id=0):
    #Create
    if request.method == 'POST':
        data = JSONParser().parse(request)

        # Check if the category is registered ¿?

        category_serializer = CategorySerializer(data=data)
        if category_serializer.is_valid():
            category_serializer.save()
            response_data = {'mensaje': f'Categoria agregada'}
        else:
            response_data = {'mensaje': f'Error al guardar la categoria'}

        return JsonResponse(response_data, safe=False)

    # Read
    elif request.method == 'GET':
        data = JSONParser().parse(request)
        category_id = data.get('id')

        if category_id:
            # Get the category by id
            try:
                category = Category.objects.get(id=category_id)
                category_serializer = CategorySerializer(category)
                return JsonResponse(category_serializer.data, safe=False, status=200)
            except category.DoesNotExist:
                return JsonResponse("Categoria no encontrada", safe=False, status=404)
        else:
            # Get all Categories
            category = Category.objects.all()
            category_serializer = CategorySerializer(category, many=True)
            return JsonResponse(category_serializer.data, safe=False, status=200)

    # Update
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        category = Category.objects.get(id=data['id'])
        category_serializer = CategorySerializer(category, data=data)

        if category_serializer.is_valid():
            category_serializer.save()
            return JsonResponse("Categoria actualizada", safe=False, status=200)

        return JsonResponse("Error al actualizar categoria", safe=False, status=400)

    # Delete
    elif request.method == 'DELETE':
        try:
            category = Category.objects.get(id=id)
            category.delete()
            return JsonResponse("Categoria eliminada", safe=False, status=200)

        except category.DoesNotExist:
            return JsonResponse("Categoria no encontrada", safe=False, status=404)
