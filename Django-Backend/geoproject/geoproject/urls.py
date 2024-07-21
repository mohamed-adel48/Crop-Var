# geoproject/urls.py
from django.urls import include, path

urlpatterns = [
    path('api-django/', include('geoapp.urls')),
]
