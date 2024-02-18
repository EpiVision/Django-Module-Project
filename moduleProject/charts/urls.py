from django.urls import path, include
from .views import ActivityTrend, ActivityViewSet, ActivitiesOfDayCountView, WeeklySleepCountView, WeeklySeizureCountView


urlpatterns = [
    # path('getHorizontalBarChart/', views.getHorizontalBarChart, name='getActivities'),
    # path('getOverlappingActivities/', views.getOverlappingActivities, name='getOverlappingActivities'),
    path('getActivityTrend/', ActivityTrend.as_view()),
    path('activity/',ActivityViewSet.as_view()),
    path('activitiesOfDayCount/', ActivitiesOfDayCountView.as_view()),
    path('weeklySleepCount/', WeeklySleepCountView.as_view()),
    path('weeklySeizureCount/', WeeklySeizureCountView.as_view()),
]
