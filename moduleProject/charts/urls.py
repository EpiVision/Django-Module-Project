from django.urls import path, include
from . import views

urlpatterns = [
    path('getActivities/', views.getActivities, name='getActivities'),
    path('getOverlappingActivities/', views.getOverlappingActivities, name='getOverlappingActivities'),
]
