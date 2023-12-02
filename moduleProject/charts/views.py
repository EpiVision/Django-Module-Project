from rest_framework import views, permissions, status
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from moduleProject.utils import get_header_params
from modeldb.models import Patient, Devices, Activities
from . import serializers
from django.db.models import Count, Case, When, IntegerField, F, Max
from django.db.models.functions import TruncDay
from django.db.models.functions import ExtractWeekDay
from datetime import timedelta


class ActivityTrend(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(operation_description="Get activity trend",manual_parameters=get_header_params(),responses={200:"Activity trend"})
    def get(self, request):
        # get user devices and get activity trend for each device
        patient = Patient.objects.get(userid=self.request.user.id)
        devices = Devices.objects.filter(accountid=patient.id).values_list('deviceid', flat=True)
        # Get the start_time of the last inserted row
        last_inserted_row = Activities.objects.aggregate(Max('start_time'))
        lower_boundary_day = last_inserted_row['start_time__max'] - timedelta(days=7)

        # Query activity name and count of activities for each weekday with a condition on deviceid
        weekday_activities = (
            Activities.objects
            .filter(start_time__gte=lower_boundary_day, deviceid__in=devices)
            .values('name', weekday=ExtractWeekDay('start_time'))
            .annotate(activity_count=Count('id'))
            .order_by('name', 'weekday')
        )
        # Organize the data in the specified format
        activities = {}
        for entry in weekday_activities:
            activity_name = entry['name']
            weekday = entry['weekday']
            count = entry['activity_count']

            # Initialize the activity_name key if not present
            if activity_name not in activities:
                activities[activity_name] = {'activity_name': activity_name, 'week_count': [0, 0, 0, 0, 0, 0, 0]}

            # Update the count for the corresponding weekday
            activities[activity_name]['week_count'][weekday - 1] = count

        # Convert the dictionary values to a list
        result_list = list(activities.values())
        # Serialize the data
        serialized_data = serializers.ActivitySerializer(result_list, many=True)
        # Access the serialized data as a dictionary
        response_data = serialized_data.data
        return Response({'activities':response_data},status=status.HTTP_200_OK)