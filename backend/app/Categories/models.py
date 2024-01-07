from django.db import models

class Category(models.Model):
    #_id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=500)
    description = models.TextField()

    def __str__(self):
        return self.name
