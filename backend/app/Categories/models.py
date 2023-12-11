from djongo import models

class Category(models.Model):
    name = models.CharField(max_length=500)
    description = models.TextField()

    def __str__(self):
        return self.name
