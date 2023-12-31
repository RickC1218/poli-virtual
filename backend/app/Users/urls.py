from django.urls import path
from Users import views

urlpatterns = [
    path('user/', views.user_api, name='user-api'),
    path('user/sign-up/', views.sign_up, name='user-sign-up'), # User sign up
    path('user/sign-in/', views.sign_in, name='user-sign-in'), # User sign in
    path('user/sign-out/', views.sign_out, name='user-sign-out'), # User sign out
    path('user/set-email-verification/', views.set_email_verification, name='user-set-email-verification'), # Set email verification
    path('user/change-password/', views.change_password, name='user-change-password'), # Change password
    path('user/send-email-to-restore-password/', views.send_email_to_restore_password, name='user-restore-password'), # Send email to restore password
    path('user/restore-password/', views.restore_password, name='user-restore-password'), # Restore password
    path('user/contact-with-us/', views.contact_with_us, name='user-contact-with-us'), # Contact with us
    path('user/be-an-instructor/', views.be_an_instructor, name='user-be-an-instructor'), # Be an instructor
    path('user/featured-teachers/', views.featured_teachers, name='user-featured-teachers'), # Get featured teachers
    path('user/send-email-to-approve-teacher/', views.send_email_to_approve_teacher, name='user-sned-email-to-approve-teacher'), # Send email to approve teacher
    path('user/get-user-profile/', views.get_user_profile, name='user-get-user-profile'), # Get user profile
]