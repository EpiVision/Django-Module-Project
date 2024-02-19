from django.urls import path
from . import views

urlpatterns = [
    path('alarmDevice/', views.AlarmDevice.as_view()), 
]