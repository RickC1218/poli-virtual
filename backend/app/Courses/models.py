from django.db import models

class Course(models.Model):
    name = models.CharField(max_length=500)
    description = models.TextField()
    category = models.CharField(max_length=100)
    instructor = models.CharField(max_length=300, blank=True)
    modules = models.JSONField(default=dict, blank=True)
    comments = models.JSONField(default=dict, blank=True)
    assessment = models.FloatField(default=0.0)
    publication_course_date = models.CharField(max_length=30)

    def __str__(self):
        return self.name
