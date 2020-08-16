from django.shortcuts import render
from rest_framework import viewsets, pagination
from .serializers import BookSerializer
from .models import Book 
from django_filters import rest_framework as filters

class BookFilter(filters.FilterSet):
    title = filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Book
        fields = ('title', 'reserved')


class BookView(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()
    filterset_class = BookFilter
    pagination_class = pagination.PageNumberPagination