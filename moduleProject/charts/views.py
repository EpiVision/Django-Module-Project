from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import GeneratedLogs
from .serializers import GeneratedLogsSerializer
from .consts import BG_COLORS, COLORS
from .serializers import HorizontalBarChartSerializer
# Create your views here.

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getHorizontalBarChart(request):
    # const data = {
    # labels: Object.keys(acts),
    # datasets: [
    #   {
    #     label: '# of Activities',
    #     data: Object.values(acts),
    #     backgroundColor: backgroundColor.slice(0, Object.keys(acts).length),
    #     borderColor: borderColor.slice(0, Object.keys(acts).length),
    #     borderWidth: 1,
    #   },
    #  ],
    # };
    # TODO: Get the data filtered from the database instead of below working
    logs = GeneratedLogs.objects.all()[0:20]
    labels = list(logs.values_list('activity_name', flat=True))
    unique_labels = list(set(labels))
    act_count = [labels.count(c) for c in unique_labels]
    data = {
        'labels': unique_labels,
        'datasets': [{
            'label': '# of Activities',
            'data': act_count,
            'backgroundColor': BG_COLORS[:len(unique_labels)],
            'borderColor': COLORS[:len(unique_labels)],
            'borderWidth': 1
            }]
    }
    serialize = HorizontalBarChartSerializer(data)
    return Response(serialize.data)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getOverlappingActivities(request):
    logs = GeneratedLogs.objects.all()[0:]
    logs = logs.filter(overlap=1)
    serialize = GeneratedLogsSerializer(logs, many=True)
    return Response(serialize.data)
