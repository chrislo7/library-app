from django.shortcuts import render
from rest_framework import viewsets, pagination, filters
from .serializers import BookSerializer
from .models import Book 

class BookView(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()
    pagination_class = pagination.PageNumberPagination
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ['title']