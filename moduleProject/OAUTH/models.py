from django.db import models

# Create your models here.
class Patient(models.Model):
    id = models.AutoField(primary_key=True)
    fullname = models.CharField(db_column='fullName', max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS')  # Field name made lowercase.
    age = models.IntegerField()
    contact = models.CharField(max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    gender = models.IntegerField(blank=True, null=True)
    weight = models.IntegerField(blank=True, null=True)
    accountid = models.IntegerField(db_column='accountId')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Patient'
