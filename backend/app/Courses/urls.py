from django.urls import path
from Courses import views

urlpatterns = [
    path('course/', views.course_api),
    path('course/<int:id>/', views.course_api),
    path('course/<str:category>/', views.courses_by_category),
]