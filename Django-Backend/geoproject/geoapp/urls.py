# geoapp/urls.py
from django.urls import path
from .views import CropClassificationView

urlpatterns = [
    path('classify-crop/', CropClassificationView.as_view(), name='classify-crop'),
]
