from django.urls import path
from . import views

urlpatterns = [
    path('device/', views.Camera.as_view()), 
]