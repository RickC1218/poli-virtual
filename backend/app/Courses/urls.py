from django.urls import path
from Courses import views

urlpatterns = [
    path('course/', views.course_api),
    path('course/<int:id>/', views.course_api),
    path('course/featured-courses/', views.featured_courses),
    path('course/recently-added-courses/', views.recently_added_courses),
    path('course/courses-by-instructor/<str:instructor_name>/', views.courses_by_instructor),
    path('course/upload-videos/', views.upload_videos),
    path('course/<str:category>/', views.courses_by_category),
]