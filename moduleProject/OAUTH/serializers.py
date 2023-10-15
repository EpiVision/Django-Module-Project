from .models import Patient
from rest_framework import serializers
# generate serilizer for Patient model

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'
    