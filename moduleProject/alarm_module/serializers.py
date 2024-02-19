from rest_framework import serializers
from modeldb.models import Devices

class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Devices
        fields = '__all__'

class DeviceSerializerForTable(serializers.ModelSerializer):
    class Meta:
        model = Devices
        fields = ('deviceid','companyname','username','ipaddress','rtspport','channel')

class DeviceSerializerForDelete(serializers.Serializer):
    deviceid = serializers.ListField(child=serializers.IntegerField())
