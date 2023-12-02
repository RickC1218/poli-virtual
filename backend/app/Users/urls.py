from django.urls import path
from Users import views

urlpatterns = [
    path('user/', views.user_api),
    path('user/<str:email>/', views.user_api),
]