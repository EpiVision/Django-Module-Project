from rest_framework import serializers
from .models import GeneratedLogs
from django.contrib.auth.models import User
from rest_framework import serializers

class GeneratedLogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneratedLogs
        exclude = ['pat_id',]
        # fields = '__all__'