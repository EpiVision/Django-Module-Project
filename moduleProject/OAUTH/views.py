from django.contrib.auth import login, logout
from django.contrib.auth.models import User

from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from rest_framework import views
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .models import Patient

from . import serializers

class LoginView(views.APIView):
    # This view should be accessible also for unauthenticated users.
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = serializers.LoginSerializer(data=self.request.data, context={ 'request': self.request })
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        token = Token.objects.get_or_create(user=user) 
        return Response({"token":str(token[0])}, status=status.HTTP_202_ACCEPTED)

class RegisterView(views.APIView):
    # This view should be accessible also for unauthenticated users.
    permission_classes = (permissions.AllowAny,)
    csrf_exempt = True

    def post(self, request):
        first_name = self.request.data['fname']
        last_name = self.request.data['lname']
        email = self.request.data['email']
        password = self.request.data['password']
        phone = self.request.data['phone']

        if User.objects.filter(email= email).exists():
            return Response({'message': 'Email is already registered!'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            user = User.objects.create_user(username=email,first_name=first_name, last_name=last_name, email=email, password=password)
            patient = Patient.objects.create(fullname=user.get_full_name(),age=0,contact=phone,gender=None,weight=None,accountid=user.id)
            user.set_password(password)
            patient.save()
            user.save()
            return Response({'message': 'User created successfully!'},status=status.HTTP_201_CREATED)

class LogoutView(views.APIView):

    def post(self, request, format=None):
        logout(request)
        return Response(None, status=status.HTTP_204_NO_CONTENT)


class ProfileView(generics.RetrieveAPIView):
    serializer_class = serializers.UserSerializer

    def get_object(self):
        return self.request.user
    
class ProtectedResourceView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response({"message": "This is a protected resource!"})
