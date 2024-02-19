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
        
        if(patient.id == 3):
            last_inserted_row = Activities.objects.get(start_time='2023-11-10 22:20:00.0000000')
            lower_boundary_day = last_inserted_row.start_time - timedelta(days=7)

        print(last_inserted_row)
        # Query activity name and count of activities for each weekday with a condition on deviceid
        if(patient.id == 3):
            weekday_activities = (
                Activities.objects.filter(
                    start_time__gte=lower_boundary_day, start_time__lte = last_inserted_row.start_time , deviceid__in=devices
                )
                .values("name", weekday=ExtractWeekDay("start_time"))
                .annotate(activity_count=Count("id"))
                .order_by("name", "weekday")
            )
        else:
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


class ActivitiesOfDayCountView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Get all activities of patient from its every device and count of each activity for the same day",
        manual_parameters=get_header_params(),
        responses={200: "Activities of the day with count"},
    )
    def get(self, request):
        patient = Patient.objects.get(userid=self.request.user.id)
        devices = Devices.objects.filter(accountid=patient.id).values_list(
            "deviceid", flat=True
        )
        # Fetch the last activity
        last_activity = Activities.objects.last()

        # Extract the day from the last activity
        day_from_query = last_activity.start_time.date()

        # Filter activities for the same day
        activities_on_same_day = Activities.objects.filter(
            start_time__date=day_from_query, deviceid__in=devices
        )

        # Count occurrences of each activity
        activity_count = {}
        for activity in activities_on_same_day:
            activity_name = activity.name
            if activity_name in activity_count:
                activity_count[activity_name] += 1
            else:
                activity_count[activity_name] = 1

        activities_name = list(activity_count.keys())
        activities_count = list(activity_count.values())
        # Construct the response data
        response_data = {
            "day": day_from_query,
            "activities_name": activities_name,
            "activities_count": activities_count,
        }

        return Response(response_data)


class WeeklySleepCountView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Get count of sleep activity for each day of the week for the last 7 days",
        manual_parameters=get_header_params(),
        responses={200: "Weekly sleep count"},
    )
    def get(self, request):
        patient = Patient.objects.get(userid=self.request.user.id)
        devices = Devices.objects.filter(accountid=patient.id).values_list(
            "deviceid", flat=True
        )
        # Fetch the last activity
        # last_activity = Activities.objects.last()
        last_activity = Activities.objects.get(start_time='2023-11-10 22:20:00.0000000')
        

        # Calculate the date 7 days before the last activity
        start_date_last_week = last_activity.start_time.date() - timedelta(days=7)
        start_date_two_weeks_ago = last_activity.start_time.date() - timedelta(days=14)
        
        # Filter activities for the last week
        activities_last_week = Activities.objects.filter(
            start_time__date__gte=start_date_last_week,
            start_time__date__lt=last_activity.start_time.date(),
        )

        # Filter activities for the week before last
        activities_two_weeks_ago = Activities.objects.filter(
            start_time__date__gte=start_date_two_weeks_ago,
            start_time__date__lt=start_date_last_week,
        )

        # Calculate the count of sleep activity for each day of the last week
        sleep_count_last_week = (
            activities_last_week.filter(name="Sleeping")
            .annotate(day_of_week=ExtractWeekDay("start_time"))
            .values("day_of_week")
            .annotate(sleep_count=Count("id"))
            .order_by("day_of_week")
        )

        # Calculate the count of sleep activity for each day of the week before last
        sleep_count_two_weeks_ago = (
            activities_two_weeks_ago.filter(name="Sleeping")
            .annotate(day_of_week=ExtractWeekDay("start_time"))
            .values("day_of_week")
            .annotate(sleep_count=Count("id"))
            .order_by("day_of_week")
        )

        # Map day numbers to day names
        day_names = {
            1: "Monday",
            2: "Tuesday",
            3: "Wednesday",
            4: "Thursday",
            5: "Friday",
            6: "Saturday",
            7: "Sunday",
        }

        # Construct the response data
        weekly_sleep_count = {
            "last_week": {
                day_names[count["day_of_week"]]: count["sleep_count"]
                for count in sleep_count_last_week
            },
            "two_weeks_ago": {
                day_names[count["day_of_week"]]: count["sleep_count"]
                for count in sleep_count_two_weeks_ago
            },
        }

        # Construct the response data
        response = {
            "week1": list(weekly_sleep_count["last_week"].values()),
            "week2": list(weekly_sleep_count["two_weeks_ago"].values()),
        }

        return Response(response)


class WeeklySeizureCountView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Get count of sleep activity for each day of the week for the last 7 days",
        manual_parameters=get_header_params(),
        responses={200: "Weekly sleep count"},
    )
    def get(self, request):
        patient = Patient.objects.get(userid=self.request.user.id)
        devices = Devices.objects.filter(accountid=patient.id).values_list(
            "deviceid", flat=True
        )
        # Fetch the last activity
        # last_activity = Activities.objects.last()
        last_activity = Activities.objects.get(start_time='2023-11-10 22:20:00.0000000')


        # Calculate the date 7 days before the last activity
        start_date_last_week = last_activity.start_time.date() - timedelta(days=7)
        start_date_two_weeks_ago = last_activity.start_time.date() - timedelta(days=14)
        
        # Filter activities for the last week
        activities_last_week = Activities.objects.filter(
            start_time__date__gte=start_date_last_week,
            start_time__date__lt=last_activity.start_time.date(),
        )

        # Filter activities for the week before last
        activities_two_weeks_ago = Activities.objects.filter(
            start_time__date__gte=start_date_two_weeks_ago,
            start_time__date__lt=start_date_last_week,
        )

        # Calculate the count of sleep activity for each day of the last week
        seizure_count_last_week = (
            activities_last_week.filter(name="Seizure")
            .annotate(day_of_week=ExtractWeekDay("start_time"))
            .values("day_of_week")
            .annotate(seizure_count=Count("id"))
            .order_by("day_of_week")
        )

        # Calculate the count of sleep activity for each day of the week before last
        seizure_count_two_weeks_ago = (
            activities_two_weeks_ago.filter(name="Seizure")
            .annotate(day_of_week=ExtractWeekDay("start_time"))
            .values("day_of_week")
            .annotate(seizure_count=Count("id"))
            .order_by("day_of_week")
        )

        # Map day numbers to day names
        day_names = {
            1: "Monday",
            2: "Tuesday",
            3: "Wednesday",
            4: "Thursday",
            5: "Friday",
            6: "Saturday",
            7: "Sunday",
        }

        # Construct the response data
        weekly_seizure_count = {
            "last_week": {
                day_names[count["day_of_week"]]: count["seizure_count"]
                for count in seizure_count_last_week
            },
            "two_weeks_ago": {
                day_names[count["day_of_week"]]: count["seizure_count"]
                for count in seizure_count_two_weeks_ago
            },
        }

        # Construct the response data
        response = {
            "week1": list(weekly_seizure_count["last_week"].values()),
            "week2": list(weekly_seizure_count["two_weeks_ago"].values()),
        }

        return Response(response)
