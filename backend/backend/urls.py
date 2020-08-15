from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from library import views

router = routers.DefaultRouter()
router.register(r'books', views.BookView, 'book')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
]