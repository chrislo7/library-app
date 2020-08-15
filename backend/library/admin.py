from django.contrib import admin
from .models import Book

class BookAdmin(admin.ModelAdmin):
    list_display = ('id','title','author','quantity','reserved')


# Register your models here.
admin.site.register(Book, BookAdmin)