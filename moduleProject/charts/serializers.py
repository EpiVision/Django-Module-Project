from rest_framework import serializers
from modeldb.models import Patient, Devices, Activities


class ActivitySerializer(serializers.Serializer):
    activity_name = serializers.CharField()
    week_count = serializers.ListField(child=serializers.IntegerField())


# Serializers define the API representation.
class ActivitySetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activities
        fields = "__all__"


# class GeneratedLogsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = GeneratedLogs
#         exclude = ['pat_id',]
#         # fields = '__all__'

# class HorizontalBarChartSerializer(serializers.Serializer):
#     labels = serializers.ListField(child=serializers.CharField())
#     datasets = serializers.ListField(child=serializers.DictField())
