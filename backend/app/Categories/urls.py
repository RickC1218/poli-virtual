from django.urls import path
from Categories import views

urlpatterns = [
    path('category/', views.category_api),
    path('category/<int:id>/', views.category_api),
]