from django.db import models
from decouple import config

class User(models.Model):
    email = models.EmailField(max_length=100, primary_key=True, unique=True)
    name = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=50)
    semester = models.CharField(max_length=10)
    approve_teacher = models.CharField(max_length=100, blank=True)
    approve_teacher_email = models.EmailField(max_length=100, blank=True)
    user_description = models.TextField(blank=True)
    score_teacher = models.FloatField(default=0.0)
    profile_image_url = models.ImageField(upload_to=config('URL_IMAGE_INSTRUCTOR_STORAGE'), blank=True)
    enrolled_courses = models.JSONField(default=dict, blank=True)
    email_verification = models.BooleanField(default=False)
    session_token = models.CharField(max_length=300, default="")


    def __str__(self):
        return self.email