from django.urls import path, include
# from allauth.account.views import LoginView, LogoutView, SignupView, PasswordChangeView, PasswordSetView, EmailView, PasswordResetView, GoogleLogin
from . import views

urlpatterns = [
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view()),
    path('profile/', views.ProfileView.as_view()),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('updatePatient/', views.updatePatient, name='updatePatient'),
    # path("google/login/", views.GoogleLoginView.as_view(), name="google_login"),
    # path("~redirect/", views.UserRedirectView.as_view(), name="redirect")
    # path('signIn/', views.signIn, name='signIn'),
    # path('addPatient/', views.addPatient, name='addPatient'),
    # path('logout/', views.logout, name='logout'),
    # path('accounts/login/', LoginView.as_view(), name='account_login'),
    # path('accounts/logout/', LogoutView.as_view(), name='account_logout'),
    # path('accounts/signup/', SignupView.as_view(), name='account_signup'),
    # path('accounts/password/change/', PasswordChangeView.as_view(), name='account_change_password'),
    # path('accounts/password/set/', PasswordSetView.as_view(), name='account_set_password'),
    # path('accounts/email/', EmailView.as_view(), name='account_email'),
    # path('accounts/password/reset/', PasswordResetView.as_view(), name='account_reset_password'),
    # path('accounts/google/login/', GoogleLogin.as_view(), name='google_login'),
]
