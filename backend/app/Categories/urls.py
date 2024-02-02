from django.urls import path
from Categories import views

urlpatterns = [
    path('category/', views.category_api),
    path('category/<str:id>/', views.category_api),
    path('category/get_category_id/<str:category_name>/', views.get_category_id), # Get the id of the category by the name
]