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

        category_serializer = CategorySerializer(data=data)

        if category_serializer.is_valid():
            category_serializer.save()
            response_data = {'mensaje': f'Categoria agregada'}
            status = 200
        else:
            response_data = {'mensaje': f'Error al guardar la categoria'}
            status = 400

        return JsonResponse(response_data, safe=False, status=status)

    # Read
    elif request.method == 'GET':
        category_id = id

        if category_id != 0:
            # Get the category by id
            try:
                category = Category.objects.get(id=category_id)
                category_serializer = CategorySerializer(category)
                return JsonResponse(category_serializer.data, safe=False, status=200)
            except Category.DoesNotExist:
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
        category_serializer = CategorySerializer(category, data=data, partial=True)

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

        except Category.DoesNotExist:
            return JsonResponse("Categoria no encontrada", safe=False, status=404)


# Get id of the category
@csrf_exempt
@api_view(['GET'])
def get_category_id(request, category_name):
    if request.method == 'GET':
        try:
            category = Category.objects.get(name=category_name)
            category_serializer = CategorySerializer(category)

            return JsonResponse(category_serializer.data.get('id'), safe=False, status=200)

        except Category.DoesNotExist:
            return JsonResponse("Categoria no encontrada", safe=False, status=404)