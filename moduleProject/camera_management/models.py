from django.db import models

# Create your models here.
class Devices(models.Model):
    companyname = models.CharField(db_column='companyName', max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS')  # Field name made lowercase.
    username = models.CharField(db_column='userName', max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS')  # Field name made lowercase.
    password = models.CharField(max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS')
    ipaddress = models.CharField(db_column='ipAddress', max_length=45, db_collation='SQL_Latin1_General_CP1_CI_AS')  # Field name made lowercase.
    rtspport = models.IntegerField(db_column='rtspPort')  # Field name made lowercase.
    channel = models.IntegerField()
    accountid = models.ForeignKey('Patient', models.DO_NOTHING, db_column='accountId')  # Field name made lowercase.
    deviceid = models.AutoField(db_column='deviceId', primary_key=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Devices'

class Patient(models.Model):
    fullname = models.CharField(db_column='fullName', max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS')  # Field name made lowercase.
    age = models.IntegerField()
    contact = models.CharField(max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    gender = models.IntegerField(blank=True, null=True)
    weight = models.IntegerField(blank=True, null=True)
    userid = models.ForeignKey('AuthUser', models.DO_NOTHING, db_column='userId')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Patient'

class AuthUser(models.Model):
    password = models.CharField(max_length=128, db_collation='SQL_Latin1_General_CP1_CI_AS')
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150, db_collation='SQL_Latin1_General_CP1_CI_AS')
    first_name = models.CharField(max_length=150, db_collation='SQL_Latin1_General_CP1_CI_AS')
    last_name = models.CharField(max_length=150, db_collation='SQL_Latin1_General_CP1_CI_AS')
    email = models.CharField(max_length=254, db_collation='SQL_Latin1_General_CP1_CI_AS')
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'
