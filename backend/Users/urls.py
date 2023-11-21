from django.urls import path
from Users import views
from django.contrib import admin

urlpatterns = [
    path('user/', views.usersApi)
]