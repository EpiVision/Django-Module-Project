"""
URL configuration for moduleProject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
# from logs import views
from django.views.generic import TemplateView
from django.contrib.auth.views import LogoutView
from django.contrib.auth import views as auth_views
# from django.contrib.auth.views import LoginView
from OAUTH.views import ProtectedResourceView   # new
# from allauth.account.views import LoginView, LogoutView, SignupView
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Epivision API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
   authentication_classes=(),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('accounts/', include('allauth.urls')),
    path('', include('OAUTH.urls')),
    path('', include('charts.urls')),
    path('', include('camera_management.urls')),
    # path('', views.index),
    path('', TemplateView.as_view(template_name="index.html")),
    # path('accounts/login/', LoginView.as_view(), name='account_login'),
    # path('accounts/logout/', LogoutView.as_view(), name='account_logout'),
    # path('accounts/signup/', SignupView.as_view(), name='account_signup'),
    # path('logout', LogoutView.as_view()),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    # path('api/protected-resource/', ProtectedResourceView.as_view(), name='hello_world'),

]
