from django.shortcuts import render

# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.contrib import auth
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import Patient

class ProtectedResourceView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "This is a protected resource!"})
    
@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
@csrf_protect
@csrf_exempt
def register(request):
    first_name = request.data['fname']
    last_name = request.data['lname']
    email = request.data['email']
    password = request.data['password']
    phone = request.data['phone']

    if User.objects.filter(email= email).exists():
        return JsonResponse({'status': 'failed', 'message': 'Email is already registered!'})
    else:
        user = User.objects.create_user(username=email,first_name=first_name, last_name=last_name, email=email, password=password)
        patient = Patient.objects.create(fullname=user.get_full_name(),age=0,contact=phone,gender=None,weight=None,accountid=user.id)
        user.set_password(password)
        patient.save()
        user.save()
        return JsonResponse({'status': 'success', 'message': 'User created successfully!'})
    
@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
@csrf_protect
@csrf_exempt
def signIn(request):
    email = request.data['email']
    password = request.data['password']
    user = auth.authenticate(username=email, password=password)
    
    if user is not None:
        auth.login(request,user)      
        return JsonResponse({'status': 'success', 'userId':user.id,'message': 'User logined successfully!'})
    else:
        return JsonResponse({'status': 'failed', 'message': 'Invalid Credentials!'})
    
@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def addPatient(request):
    fullname = request.data['fullname']
    age = request.data['age']
    contact = request.data['phone']
    gender = request.data['gender']
    weight = request.data['weight']
    accountid = request.data['accountid']

    p = Patient.objects.create(fullname=fullname,age=age,contact=contact,gender=gender,weight=weight,accountid=accountid)
    if p is not None:
        return JsonResponse({'status': 'success', 'message': 'Patient added successfully!'})
    else:
        return JsonResponse({'status': 'failed', 'message': 'Patient added failed!'})
