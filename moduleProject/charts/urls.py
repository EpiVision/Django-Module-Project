from django.urls import path, include
from . import views

urlpatterns = [
    path('getHorizontalBarChart/', views.getHorizontalBarChart, name='getActivities'),
    path('getOverlappingActivities/', views.getOverlappingActivities, name='getOverlappingActivities'),
]
