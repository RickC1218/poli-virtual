from django.db import models
from decouple import config


class Course(models.Model):
    name = models.CharField(max_length=500)
    description = models.TextField()
    category = models.CharField(max_length=100)
    instructor = models.CharField(max_length=300, blank=True)
    modules = models.JSONField(default=dict, blank=True)
    comments = models.JSONField(default=dict, blank=True)
    assessment = models.FloatField(default=0.0)
    trailer_video_url = models.FileField(upload_to=config('URL_VIDEO_COURSE_STORAGE'), blank=True)
    course_image_url = models.ImageField(upload_to=config('URL_IMAGE_COURSE_STORAGE'), blank=True)

    def __str__(self):
        return self.name