# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Accessibility(models.Model):
    # id = models.IntegerField()
    accountid = models.IntegerField(db_column='accountId')  # Field name made lowercase.
    role_previlege = models.IntegerField()
    package_accessibility = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'Accessibility'


class Accounts(models.Model):
    # id = models.IntegerField()
    username = models.CharField(max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS')
    email = models.CharField(max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS')
    password = models.CharField(max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS')
    oauth_token = models.CharField(max_length=2000, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    oauth_exp = models.TextField()  # This field type is a guess.
    activation_token = models.CharField(max_length=2000, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    role = models.IntegerField()
    is_active = models.BooleanField()

    class Meta:
        managed = False
        db_table = 'Accounts'


class Activities(models.Model):
    name = models.CharField(max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS')
    act_level = models.IntegerField()
    deviceid = models.ForeignKey('Devices', models.DO_NOTHING, db_column='deviceid')
    start_time = models.DateTimeField(blank=True, null=True)
    end_time = models.DateTimeField(blank=True, null=True)
    location = models.CharField(max_length=25, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Activities'


class Assignedmodels(models.Model):
    # id = models.IntegerField()
    modelname = models.CharField(db_column='modelName', max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS')  # Field name made lowercase.
    category = models.IntegerField()
    assigndate = models.TextField(db_column='assignDate')  # Field name made lowercase. This field type is a guess.
    currentaccuracy = models.IntegerField(db_column='currentAccuracy', blank=True, null=True)  # Field name made lowercase.
    accountid = models.IntegerField(db_column='accountId')  # Field name made lowercase.
    is_personalized = models.BooleanField()

    class Meta:
        managed = False
        db_table = 'AssignedModels'


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


class Ema(models.Model):
    # id = models.IntegerField()
    question = models.CharField(max_length=1000, db_collation='SQL_Latin1_General_CP1_CI_AS')
    category = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'EMA'


class Emaresponse(models.Model):
    # id = models.IntegerField()
    emaid = models.IntegerField(db_column='EMAid')  # Field name made lowercase.
    accountid = models.IntegerField(db_column='accountId')  # Field name made lowercase.
    response = models.CharField(max_length=1000, db_collation='SQL_Latin1_General_CP1_CI_AS')

    class Meta:
        managed = False
        db_table = 'EMAResponse'


class Faq(models.Model):
    # id = models.IntegerField()
    question = models.CharField(max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AS')
    answer = models.CharField(max_length=300, db_collation='SQL_Latin1_General_CP1_CI_AS')

    class Meta:
        managed = False
        db_table = 'FAQ'


class Logs(models.Model):
    # id = models.IntegerField()
    activity = models.IntegerField()
    category = models.IntegerField()
    accountid = models.IntegerField(db_column='accountId')  # Field name made lowercase.
    log_time = models.TextField()  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'Logs'


class Lookup(models.Model):
    # id = models.IntegerField()
    category = models.CharField(max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS')
    description = models.CharField(max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS')

    class Meta:
        managed = False
        db_table = 'Lookup'


class Modelpackages(models.Model):
    # id = models.IntegerField()
    modelid = models.IntegerField(db_column='modelId')  # Field name made lowercase.
    packageid = models.IntegerField(db_column='packageId')  # Field name made lowercase.
    description = models.CharField(max_length=1000, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ModelPackages'


class Models(models.Model):
    # id = models.IntegerField()
    modelname = models.CharField(db_column='modelName', max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS')  # Field name made lowercase.
    category = models.IntegerField()
    currentaccuracy = models.IntegerField(db_column='currentAccuracy', blank=True, null=True)  # Field name made lowercase.
    is_personalized = models.BooleanField()

    class Meta:
        managed = False
        db_table = 'Models'


class Notificationhistory(models.Model):
    # id = models.IntegerField()
    seizurehistoryid = models.IntegerField(db_column='seizureHistoryid')  # Field name made lowercase.
    email = models.BooleanField()
    mobile = models.BooleanField()
    desktop = models.BooleanField()

    class Meta:
        managed = False
        db_table = 'NotificationHistory'


class Notificationmanagement(models.Model):
    # id = models.IntegerField()
    accountid = models.IntegerField(db_column='accountId')  # Field name made lowercase.
    email = models.BooleanField()
    mobile = models.BooleanField()

    class Meta:
        managed = False
        db_table = 'NotificationManagement'


class Package(models.Model):
    # id = models.IntegerField()
    name = models.CharField(max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS')
    price = models.IntegerField()
    discount_per = models.IntegerField(blank=True, null=True)
    category = models.IntegerField()
    description = models.CharField(max_length=1000, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Package'


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


class Purchasepackages(models.Model):
    # id = models.IntegerField()
    packageid = models.IntegerField(db_column='packageId')  # Field name made lowercase.
    accountid = models.IntegerField(db_column='accountId')  # Field name made lowercase.
    is_active = models.BooleanField()
    purchasedate = models.TextField(db_column='PurchaseDate')  # Field name made lowercase. This field type is a guess.

    class Meta:
        managed = False
        db_table = 'PurchasePackages'


class Seizurehistory(models.Model):
    # id = models.IntegerField()
    accountid = models.IntegerField(db_column='accountId')  # Field name made lowercase.
    filename = models.CharField(db_column='fileName', max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)  # Field name made lowercase.
    seizureduration = models.IntegerField(db_column='seizureDuration')  # Field name made lowercase.
    seizuretime = models.TextField(db_column='seizureTime')  # Field name made lowercase. This field type is a guess.

    class Meta:
        managed = False
        db_table = 'SeizureHistory'


class AccountEmailaddress(models.Model):
    email = models.CharField(max_length=254, db_collation='SQL_Latin1_General_CP1_CI_AS')
    verified = models.BooleanField()
    primary = models.BooleanField()
    user = models.ForeignKey('AuthUser', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'account_emailaddress'
        unique_together = (('user', 'email'),)


class AccountEmailconfirmation(models.Model):
    created = models.DateTimeField()
    sent = models.DateTimeField(blank=True, null=True)
    key = models.CharField(unique=True, max_length=64, db_collation='SQL_Latin1_General_CP1_CI_AS')
    email_address = models.ForeignKey(AccountEmailaddress, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'account_emailconfirmation'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150, db_collation='SQL_Latin1_General_CP1_CI_AS')

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS')
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AS')

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


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


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class AuthtokenToken(models.Model):
    key = models.CharField(primary_key=True, max_length=40, db_collation='SQL_Latin1_General_CP1_CI_AS')
    created = models.DateTimeField()
    user = models.OneToOneField(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'authtoken_token'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    object_repr = models.CharField(max_length=200, db_collation='SQL_Latin1_General_CP1_CI_AS')
    action_flag = models.SmallIntegerField()
    change_message = models.TextField(db_collation='SQL_Latin1_General_CP1_CI_AS')
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AS')
    model = models.CharField(max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AS')

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoDbLoggerStatuslog(models.Model):
    logger_name = models.CharField(max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AS')
    level = models.SmallIntegerField()
    msg = models.TextField(db_collation='SQL_Latin1_General_CP1_CI_AS')
    trace = models.TextField(db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    create_datetime = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_db_logger_statuslog'


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS')
    name = models.CharField(max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS')
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40, db_collation='SQL_Latin1_General_CP1_CI_AS')
    session_data = models.TextField(db_collation='SQL_Latin1_General_CP1_CI_AS')
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class DjangoSite(models.Model):
    domain = models.CharField(unique=True, max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AS')
    name = models.CharField(max_length=50, db_collation='SQL_Latin1_General_CP1_CI_AS')

    class Meta:
        managed = False
        db_table = 'django_site'


# class GeneratedLogs(models.Model):
#     pat_id = models.IntegerField()
#     activity_name = models.CharField(max_length=50, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
#     start_time = models.DateTimeField(blank=True, null=True)
#     end_time = models.DateTimeField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'generated__logs'


# class GeneratedLogs(models.Model):
#     pat_id = models.IntegerField(blank=True, null=True)
#     activity_name = models.CharField(max_length=50, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
#     start_time = models.TextField(blank=True, null=True)  # This field type is a guess.
#     end_time = models.CharField(max_length=10, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'generated_logs'


class Oauth2ProviderAccesstoken(models.Model):
    id = models.BigAutoField(primary_key=True)
    token = models.CharField(unique=True, max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS')
    expires = models.DateTimeField()
    scope = models.TextField(db_collation='SQL_Latin1_General_CP1_CI_AS')
    application = models.ForeignKey('Oauth2ProviderApplication', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING, blank=True, null=True)
    created = models.DateTimeField()
    updated = models.DateTimeField()
    source_refresh_token = models.OneToOneField('Oauth2ProviderRefreshtoken', models.DO_NOTHING, blank=True, null=True)
    id_token = models.OneToOneField('Oauth2ProviderIdtoken', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'oauth2_provider_accesstoken'


class Oauth2ProviderApplication(models.Model):
    id = models.BigAutoField(primary_key=True)
    client_id = models.CharField(unique=True, max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AS')
    redirect_uris = models.TextField(db_collation='SQL_Latin1_General_CP1_CI_AS')
    client_type = models.CharField(max_length=32, db_collation='SQL_Latin1_General_CP1_CI_AS')
    authorization_grant_type = models.CharField(max_length=32, db_collation='SQL_Latin1_General_CP1_CI_AS')
    client_secret = models.CharField(max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS')
    name = models.CharField(max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS')
    user = models.ForeignKey(AuthUser, models.DO_NOTHING, blank=True, null=True)
    skip_authorization = models.BooleanField()
    created = models.DateTimeField()
    updated = models.DateTimeField()
    algorithm = models.CharField(max_length=5, db_collation='SQL_Latin1_General_CP1_CI_AS')
    post_logout_redirect_uris = models.TextField(db_collation='SQL_Latin1_General_CP1_CI_AS')

    class Meta:
        managed = False
        db_table = 'oauth2_provider_application'


class Oauth2ProviderGrant(models.Model):
    id = models.BigAutoField(primary_key=True)
    code = models.CharField(unique=True, max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS')
    expires = models.DateTimeField()
    redirect_uri = models.TextField(db_collation='SQL_Latin1_General_CP1_CI_AS')
    scope = models.TextField(db_collation='SQL_Latin1_General_CP1_CI_AS')
    application = models.ForeignKey(Oauth2ProviderApplication, models.DO_NOTHING)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    created = models.DateTimeField()
    updated = models.DateTimeField()
    code_challenge = models.CharField(max_length=128, db_collation='SQL_Latin1_General_CP1_CI_AS')
    code_challenge_method = models.CharField(max_length=10, db_collation='SQL_Latin1_General_CP1_CI_AS')
    nonce = models.CharField(max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS')
    claims = models.TextField(db_collation='SQL_Latin1_General_CP1_CI_AS')

    class Meta:
        managed = False
        db_table = 'oauth2_provider_grant'


class Oauth2ProviderIdtoken(models.Model):
    id = models.BigAutoField(primary_key=True)
    jti = models.CharField(unique=True, max_length=32, db_collation='SQL_Latin1_General_CP1_CI_AS')
    expires = models.DateTimeField()
    scope = models.TextField(db_collation='SQL_Latin1_General_CP1_CI_AS')
    created = models.DateTimeField()
    updated = models.DateTimeField()
    application = models.ForeignKey(Oauth2ProviderApplication, models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'oauth2_provider_idtoken'


class Oauth2ProviderRefreshtoken(models.Model):
    id = models.BigAutoField(primary_key=True)
    token = models.CharField(max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS')
    access_token = models.OneToOneField(Oauth2ProviderAccesstoken, models.DO_NOTHING, blank=True, null=True)
    application = models.ForeignKey(Oauth2ProviderApplication, models.DO_NOTHING)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    created = models.DateTimeField()
    updated = models.DateTimeField()
    revoked = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'oauth2_provider_refreshtoken'
        unique_together = (('token', 'revoked'),)


class SocialaccountSocialaccount(models.Model):
    provider = models.CharField(max_length=200, db_collation='SQL_Latin1_General_CP1_CI_AS')
    uid = models.CharField(max_length=191, db_collation='SQL_Latin1_General_CP1_CI_AS')
    last_login = models.DateTimeField()
    date_joined = models.DateTimeField()
    extra_data = models.TextField(db_collation='SQL_Latin1_General_CP1_CI_AS')
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'socialaccount_socialaccount'
        unique_together = (('provider', 'uid'),)


class SocialaccountSocialapp(models.Model):
    provider = models.CharField(max_length=30, db_collation='SQL_Latin1_General_CP1_CI_AS')
    name = models.CharField(max_length=40, db_collation='SQL_Latin1_General_CP1_CI_AS')
    client_id = models.CharField(max_length=191, db_collation='SQL_Latin1_General_CP1_CI_AS')
    secret = models.CharField(max_length=191, db_collation='SQL_Latin1_General_CP1_CI_AS')
    key = models.CharField(max_length=191, db_collation='SQL_Latin1_General_CP1_CI_AS')
    provider_id = models.CharField(max_length=200, db_collation='SQL_Latin1_General_CP1_CI_AS')
    settings = models.TextField(db_collation='SQL_Latin1_General_CP1_CI_AS')

    class Meta:
        managed = False
        db_table = 'socialaccount_socialapp'


class SocialaccountSocialappSites(models.Model):
    id = models.BigAutoField(primary_key=True)
    socialapp = models.ForeignKey(SocialaccountSocialapp, models.DO_NOTHING)
    site = models.ForeignKey(DjangoSite, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'socialaccount_socialapp_sites'
        unique_together = (('socialapp', 'site'),)


class SocialaccountSocialtoken(models.Model):
    token = models.TextField(db_collation='SQL_Latin1_General_CP1_CI_AS')
    token_secret = models.TextField(db_collation='SQL_Latin1_General_CP1_CI_AS')
    expires_at = models.DateTimeField(blank=True, null=True)
    account = models.ForeignKey(SocialaccountSocialaccount, models.DO_NOTHING)
    app = models.ForeignKey(SocialaccountSocialapp, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'socialaccount_socialtoken'
        unique_together = (('app', 'account'),)
