from rest_framework import serializers
from .models import GeneratedLogs
from django.contrib.auth.models import User
from rest_framework import serializers

class GeneratedLogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneratedLogs
        exclude = ['pat_id',]
        # fields = '__all__'

class HorizontalBarChartSerializer(serializers.Serializer):
    labels = serializers.ListField(child=serializers.CharField())
    datasets = serializers.ListField(child=serializers.DictField())