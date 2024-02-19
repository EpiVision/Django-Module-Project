from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from rest_framework import views
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from modeldb.models import Patient, AuthUser
from moduleProject.utils import get_header_params
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
# from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
# from allauth.socialaccount.providers.oauth2.client import OAuth2Client
# from dj_rest_auth.registration.views import SocialLoginView

# from django.contrib.auth.mixins import LoginRequiredMixin
# from django.views.generic import RedirectView

from . import serializers

# class GoogleLoginView(SocialLoginView):
#     adapter_class = GoogleOAuth2Adapter
#     callback_url = "http://localhost:3000/"
#     client_class = OAuth2Client

# class UserRedirectView(LoginRequiredMixin, RedirectView):
#     """
#     This view is needed by the dj-rest-auth-library in order to work the google login. It's a bug.
#     """

#     permanent = False

#     def get_redirect_url(self):
#         return "redirect-url"

class LoginView(views.APIView):
    # This view should be accessible also for unauthenticated users.
    permission_classes = (permissions.AllowAny,)
    
    @swagger_auto_schema(operation_description="Login",request_body=serializers.LoginSerializer,responses={202:serializers.LoginResponse})
    def post(self, request, format=None):
        serializer = serializers.LoginSerializer(data=self.request.data, context={ 'request': self.request })
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        
        login(request, user)
        token = Token.objects.get_or_create(user=user) 
        print(serializers.UserSerializer(user).data)
        return Response({"token":str(token[0]),"user":serializers.UserSerializer(user).data}, status=status.HTTP_202_ACCEPTED)

class RegisterView(views.APIView):
    # This view should be accessible also for unauthenticated users.
    permission_classes = (permissions.AllowAny,)
    csrf_exempt = True

    @swagger_auto_schema(operation_description="Create new account", responses={201:serializers.RegisterResponse, 400:serializers.RegisterErrorResponse})
    def post(self, request):
        first_name = self.request.data['fname']
        last_name = self.request.data['lname']
        email = self.request.data['email']
        password = self.request.data['password']
        phone = self.request.data['phone']

        if User.objects.filter(email= email).exists():
            return Response({'message': 'Email is already registered!'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            try:
                user = User.objects.create_user(username=email,first_name=first_name, last_name=last_name, email=email, password=password)
                auth_user = AuthUser.objects.get(id=user.id)
                patient = Patient.objects.create(fullname=user.get_full_name(),age=0,contact=phone,gender=None,weight=None,userid=auth_user)
                user.set_password(password)
                patient.save()
                user.save()
                return Response({'message': 'User created successfully!'},status=status.HTTP_201_CREATED)
            except:
                return Response({'message': 'Invalid request!'},status=status.HTTP_400_BAD_REQUEST)

class LogoutView(views.APIView):

    @swagger_auto_schema(operation_description="Logout from account",manual_parameters=get_header_params(),responses={204:None})
    def post(self, request, format=None):
        logout(request)
        return Response(None, status=status.HTTP_204_NO_CONTENT)


class ProfileView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.PatientSerializer
    
    def get_object(self):
        patient = Patient.objects.get(userid=self.request.user.id)
        return patient
    
    
class ProtectedResourceView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response({"message": "This is a protected resource!"})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
# update patient profile
def updatePatient(request):
    if request.method == 'POST':
        patient = Patient.objects.get(userid=request.user.id)
        patient.age = request.data['age']
        patient.contact = request.data['contact']
        patient.weight = request.data['weight']
        patient.gender = request.data['gender']
        patient.save()

        return Response({'message': 'Profile updated successfully!'},status=status.HTTP_200_OK)
    else:
        return Response({'message': 'Invalid request!'},status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([])
def getToken(request):
    if request.method == 'GET':
        patiendId = request.data['patiendId']
        p = Patient.objects.get(id=patiendId)
        user = User.objects.get(id=p.userid_id)
        token = Token.objects.get(user=user)
        return Response({'token': str(token)}, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'Invalid request!'},status=status.HTTP_400_BAD_REQUEST)