from django.db import models

class GeneratedLogs(models.Model):
    pat_id = models.IntegerField(primary_key=True)
    activity_name = models.CharField(max_length=50, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    start_time = models.DateTimeField(blank=True, null=True)
    end_time = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'generated__logs'