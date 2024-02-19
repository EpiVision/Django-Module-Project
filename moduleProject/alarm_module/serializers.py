from rest_framework import serializers
from modeldb.models import Alarmdevices

class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alarmdevices
        fields = '__all__'

class DeviceSerializerForTable(serializers.ModelSerializer):
    class Meta:
        model = Alarmdevices
        fields = ('Id','deviceName','paircode','patientId')

class DeviceSerializerForDelete(serializers.Serializer):
    deviceid = serializers.ListField(child=serializers.IntegerField())
