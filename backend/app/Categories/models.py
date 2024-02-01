from django.db import models
import uuid


class Category(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, unique=True, max_length=100)
    name = models.CharField(max_length=500)
    description = models.TextField()

    def __str__(self):
        return self.name
