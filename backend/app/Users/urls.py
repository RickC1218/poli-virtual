from django.urls import path
from Users import views

urlpatterns = [
    path('user/', views.user_api, name='user-api'),
    path('user/sign-up/', views.sign_up, name='user-sign-up'), # User sign up
    path('user/sign-in/', views.sign_in, name='user-sign-in'), # User sign in
    path('user/set-email-verification/', views.set_email_verification, name='user-set-email-verification'), # Set email verification
]