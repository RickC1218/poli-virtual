from django.urls import path
from Courses import views

urlpatterns = [
    path('course/recently-added-courses/', views.recently_added_courses, name='recently_added_courses'),
    path('course/featured-courses/', views.featured_courses, name='featured_courses'),
    path('course/', views.course_api, name='course_api_create'),
    path('course/<str:id>/', views.course_api, name='course_api_read_delete'),
    path('course/courses-by-instructor/<str:instructor_name>/', views.courses_by_instructor, name='courses_by_instructor'),
    path('course/courses-by-category/<str:category>/', views.courses_by_category, name='courses_by_category'),
    path('course/update-course-comments/<str:id>/', views.update_course_comments, name='update_course_comments'),
    path('course/get-courses/<str:key_word>/', views.get_courses, name='get_courses'),
]