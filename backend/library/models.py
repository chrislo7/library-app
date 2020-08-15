from django.db import models

# Create your models here.
class Book(models.Model):
    id = models.CharField(primary_key=True, max_length=120)
    title = models.TextField()
    author = models.TextField()
    quantity = models.IntegerField()
    reserved = models.BooleanField(default=False)

    def _str_(self):
        return self.title
