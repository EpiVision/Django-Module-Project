from rest_framework import views, permissions, status, viewsets
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

    @swagger_auto_schema(
        operation_description="Get activity trend",
        manual_parameters=get_header_params(),
        # responses={200: "Activity trend"},
    )
    def get(self, request):
        # get user devices and get activity trend for each device
        patient = Patient.objects.get(userid=self.request.user.id)
        devices = Devices.objects.filter(accountid=patient.id).values_list(
            "deviceid", flat=True
        )
        # Get the start_time of the last inserted row
        last_inserted_row = Activities.objects.aggregate(Max("start_time"))
        lower_boundary_day = last_inserted_row["start_time__max"] - timedelta(days=7)

        # Query activity name and count of activities for each weekday with a condition on deviceid
        weekday_activities = (
            Activities.objects.filter(
                start_time__gte=lower_boundary_day, deviceid__in=devices
            )
            .values("name", weekday=ExtractWeekDay("start_time"))
            .annotate(activity_count=Count("id"))
            .order_by("name", "weekday")
        )
        # Organize the data in the specified format
        activities = {}
        for entry in weekday_activities:
            activity_name = entry["name"]
            weekday = entry["weekday"]
            count = entry["activity_count"]

            # Initialize the activity_name key if not present
            if activity_name not in activities:
                activities[activity_name] = {
                    "activity_name": activity_name,
                    "week_count": [0, 0, 0, 0, 0, 0, 0],
                }

            # Update the count for the corresponding weekday
            activities[activity_name]["week_count"][weekday - 1] = count

        # Convert the dictionary values to a list
        result_list = list(activities.values())
        # Serialize the data
        serialized_data = serializers.ActivitySerializer(result_list, many=True)
        # Access the serialized data as a dictionary
        response_data = serialized_data.data
        return Response({"activities": response_data}, status=status.HTTP_200_OK)


# ViewSets define the view behavior.
class ActivityViewSet(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Activities.objects.all()
    serializer_class = serializers.ActivitySetSerializer

    @swagger_auto_schema(
        operation_description="Add a new activity of the user",
        manual_parameters=get_header_params(),
        request_body=serializers.ActivitySetSerializer,
        # responses={
        #     200: {"message": "Activity added successfully!"},
        #     400: {"message": "Bad Request!"},
        # },
    )
    def post(self, request):
        try:
            patient = Patient.objects.get(userid=self.request.user.id)
            devices = Devices.objects.filter(accountid=patient)
            print(self.request.data["deviceid"])

            if not self.request.data["deviceid"] in [d.deviceid for d in devices]:
                return Response(
                    {"message": "Device id not found against this user!"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            device = devices.get(deviceid=self.request.data["deviceid"])
            Activities.objects.create(
                name=self.request.data["name"],
                act_level=self.request.data["act_level"],
                deviceid=device,
                start_time=self.request.data["start_time"],
                end_time=self.request.data["end_time"],
                location=self.request.data["location"],
            )
            return Response(
                {"message": "Activity added successfully!"}, status=status.HTTP_200_OK
            )
        except:
            return Response(
                {"message": "Bad Request!"}, status=status.HTTP_400_BAD_REQUEST
            )

    @swagger_auto_schema(
        operation_description="Get all activities of user from its every device",
        manual_parameters=get_header_params(),
        responses={200: serializers.ActivitySetSerializer(many=True)},
    )
    def get(self, request):
        patient = Patient.objects.get(userid=self.request.user.id)
        devices = Devices.objects.filter(accountid=patient).only("deviceid")

        activities = Activities.objects.filter(deviceid__in=devices)

        serializer = serializers.ActivitySetSerializer(activities, many=True)
        res = serializer.data
        return Response({"activities": res}, status=status.HTTP_200_OK)
