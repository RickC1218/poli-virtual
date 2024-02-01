from django.urls import path
from Content import views

urlpatterns = [
    path('content/', views.content_api), # Create a content to a course
]