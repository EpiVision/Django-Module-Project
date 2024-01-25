from django.shortcuts import render
from rest_framework import views
from rest_framework.response import Response
from rest_framework import permissions
from modeldb.models import Devices, Patient
from rest_framework import status
from . import serializers
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from moduleProject.utils import get_header_params


class Camera(views.APIView):
    queryset = Devices.objects.all()
    serializer_class = serializers.DeviceSerializer
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Add a new device",
        manual_parameters=get_header_params(),
        request_body=serializers.DeviceSerializer,
        responses={201: serializers.DeviceSerializer(many=False)},
    )
    def post(self, request):
        patient = Patient.objects.get(userid=self.request.user.id)
        d = Devices.objects.create(
            companyname=self.request.data["companyName"],
            ipaddress=self.request.data["ipAddress"],
            password=self.request.data["password"],
            username=self.request.data["userName"],
            rtspport=self.request.data["rtspPort"],
            channel=self.request.data["channel"],
            accountid=patient,
        )
        s = serializers.DeviceSerializer(d)
        return Response(
            {"message": "Device added successfully!", "device": s.data},
            status=status.HTTP_201_CREATED,
        )

    # add Authorization header in swagger auto schema
    @swagger_auto_schema(
        operation_description="Get all devices of the user",
        manual_parameters=get_header_params(),
        responses={200: serializers.DeviceSerializer(many=True)},
    )
    def get(self, request):
        patient = Patient.objects.get(userid=self.request.user.id)
        devices = Devices.objects.filter(accountid=patient)
        s = serializers.DeviceSerializer(devices, many=True)
        return Response({"devices": s.data}, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Delete a device",
        manual_parameters=get_header_params(),
        request_body=serializers.DeviceSerializerForDelete,
        responses={200: "Device deleted successfully!", 400: "Device does not exist!"},
    )
    def delete(self, request):
        print(f'deviceid: {"deviceid" in self.request.data}, {self.request.data}')
        if "deviceid" not in self.request.data:
            return Response(
                {"message": "Device id is required!"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        # check if deviceid is a list or number and act accordingly
        devices = []
        if not isinstance(self.request.data["deviceid"], list):
            devices.append(self.request.data["deviceid"])
        else:
            devices = self.request.data["deviceid"]
        for deviceid in self.request.data["deviceid"]:
            # check if the device belongs to the user
            patient = Patient.objects.get(userid=self.request.user.id)
            device = Devices.objects.filter(deviceid=deviceid, accountid=patient)
            if not device:
                return Response(
                    {"message": "Device does not exist!"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            device.delete()
        return Response(
            {"message": "Devices deleted successfully!"}, status=status.HTTP_200_OK
        )

    @swagger_auto_schema(
        operation_description="Update a device",
        manual_parameters=get_header_params(),
        request_body=serializers.DeviceSerializer,
        responses={200: "Device updated successfully!", 400: "Device does not exist!"},
    )
    def put(self, request):
        print(self.request.data)
        # check if the device belongs to the user
        patient = Patient.objects.get(userid=self.request.user.id)
        device = Devices.objects.filter(
            deviceid=self.request.data["deviceId"], accountid=patient
        )
        if not device:
            return Response(
                {"message": "Device does not exist!"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        device.update(
            companyname=self.request.data["companyName"],
            ipaddress=self.request.data["ipAddress"],
            password=self.request.data["password"],
            username=self.request.data["userName"],
            rtspport=self.request.data["rtspPort"],
            channel=self.request.data["channel"],
        )
        return Response(
            {"message": "Device updated successfully!"}, status=status.HTTP_200_OK
        )
