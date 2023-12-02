from djongo import models

class Course(models.Model):
    name = models.CharField(max_length=500)
    description = models.TextField()
    category = models.CharField(max_length=100)
    instructors = models.JSONField(default=[], blank=True)
    modules = models.JSONField(default=[], blank=True)
    comments = models.JSONField(default=[], blank=True)
    assessment = models.IntegerField()
    publication_course_date = models.CharField(max_length=30)

    def __str__(self):
        return self.name
