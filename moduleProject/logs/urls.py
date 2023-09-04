from django.contrib import admin
from django.urls import path
from logs import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('/logspage',views.index, name="hello_reader")
]