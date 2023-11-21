from django.shortcuts import render
from rest_framework import views
from rest_framework.response import Response
from rest_framework import permissions
from .models import Devices, Patient
from rest_framework import status
from . import serializers
# Create your views here.
class Camera(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        patient = Patient.objects.get(userid=self.request.user.id)
        d = Devices.objects.create(companyname=self.request.data['companyName'], ipaddress=self.request.data['ipAddress'], 
                                   password=self.request.data['password'],username=self.request.data['userName'],
                                   rtspport=self.request.data['rtspPort'],channel=self.request.data['channel'],
                                   accountid=patient)
        s = serializers.DeviceSerializer(d)
        return Response({'message':"Device added successfully!",'device':s.data},status=status.HTTP_201_CREATED)

    def get(self, request):
        patient = Patient.objects.get(userid=self.request.user.id)
        devices = Devices.objects.filter(accountid=patient)
        s = serializers.DeviceSerializerForTable(devices, many=True)
        return Response({'devices':s.data},status=status.HTTP_200_OK)
    
    def delete(self, request):
        if 'deviceid' not in self.request.data:
            return Response({'message':"Device id is required!"},status=status.HTTP_400_BAD_REQUEST)
        # check if deviceid is a list or number and act accordingly
        devices = [] 
        if not isinstance(self.request.data['deviceid'], list):
            devices.append(self.request.data['deviceid'])
        else:
            devices = self.request.data['deviceid']
        for deviceid in self.request.data['deviceid']:
            # check if the device belongs to the user
            patient = Patient.objects.get(userid=self.request.user.id)
            device = Devices.objects.filter(deviceid=deviceid,accountid=patient)
            if not device:
                return Response({'message':"Device does not exist!"},status=status.HTTP_400_BAD_REQUEST)
            device.delete()
        return Response({'message':"Devices deleted successfully!"},status=status.HTTP_200_OK)