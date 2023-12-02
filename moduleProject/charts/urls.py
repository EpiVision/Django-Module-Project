from django.urls import path, include
from .views import ActivityTrend


urlpatterns = [
    # path('getHorizontalBarChart/', views.getHorizontalBarChart, name='getActivities'),
    # path('getOverlappingActivities/', views.getOverlappingActivities, name='getOverlappingActivities'),
    path('getActivityTrend/', ActivityTrend.as_view()),
]
