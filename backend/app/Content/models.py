from django.db import models
from decouple import config
import uuid


class Content(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, unique=True, max_length=100)
    course_name = models.CharField(max_length=500)
    module = models.CharField(max_length=500)
    title = models.CharField(max_length=500)
    video_url = models.FileField(upload_to=config('URL_VIDEO_COURSE_CONTENT_STORAGE'), blank=True)

    def __str__(self):
        return self.title