from rest_framework import serializers

class ActivitySerializer(serializers.Serializer):
    activity_name = serializers.CharField()
    week_count = serializers.ListField(child=serializers.IntegerField())
# class GeneratedLogsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = GeneratedLogs
#         exclude = ['pat_id',]
#         # fields = '__all__'

# class HorizontalBarChartSerializer(serializers.Serializer):
#     labels = serializers.ListField(child=serializers.CharField())
#     datasets = serializers.ListField(child=serializers.DictField())