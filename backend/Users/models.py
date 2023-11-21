from django.db import models

class User(models.Model):
    email = models.EmailField(max_length=100, primary_key=True)
    name = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=50)
    semester = models.CharField(max_length=10)
    approve_teacher = models.CharField(max_length=100, blank=True)
    approve_teacher_email = models.EmailField(max_length=100, blank=True)
    user_description = models.TextField(blank=True)
    enrolled_courses = models.JSONField(default=dict, blank=True, null=True)
