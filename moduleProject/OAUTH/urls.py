from django.urls import path, include
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('signIn/', views.signIn, name='signIn'),
    path('addPatient/', views.addPatient, name='addPatient'),
    path('logout/', views.logout, name='logout'),
]
