from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import GeneratedLogs
from .serializers import GeneratedLogsSerializer
# Create your views here.

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getActivities(request):
    logs = GeneratedLogs.objects.all()[0:20]
    serialize = GeneratedLogsSerializer(logs, many=True)
    return Response(serialize.data)

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getOverlappingActivities(request):
    logs = GeneratedLogs.objects.all()[0:]
    logs = logs.filter(overlap=1)
    serialize = GeneratedLogsSerializer(logs, many=True)
    return Response(serialize.data)