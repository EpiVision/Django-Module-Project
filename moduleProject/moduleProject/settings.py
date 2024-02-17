"""
Django settings for moduleProject project.

Generated by 'django-admin startproject' using Django 4.2.2.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-@$(vk!57mys%5pnnx60^_h^6+9vq!@ncbn#8p=i*%l$a(7)wj)'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['13.51.167.106', 'localhost', '127.0.0.1']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'django_db_logger',
    'logs', #new
    'OAUTH',
    'charts',
    'modeldb',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'oauth2_provider',
    'rest_framework',
    'rest_framework.authtoken', #new
    'drf_yasg',
    'corsheaders',
    'camera_management',
    'alarm_module'
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'allauth.account.middleware.AccountMiddleware'
]

ROOT_URLCONF = 'moduleProject.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'moduleProject.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    # 'default': {
    #     'ENGINE': 'django.db.backends.sqlite3',
    #     'NAME': BASE_DIR / 'db.sqlite3',
    # }

    # 'default': {
    #     # 'ENGINE': 'sql_server.pyodbc',
    #     'ENGINE': 'mssql',
    #     'NAME': 'Epi_Vision_Local_DB',
    #     'USER': 'DESKTOP-2NARHO8\Muhammad Ali Murtaza',
    #     'PASSWORD': '22033',
    #     'HOST': 'localhost',
    #     'PORT': '',
    #     'OPTIONS': {
    #         'driver': 'ODBC Driver 17 for SQL Server',
    #     },
    # }

        'default': {
        # 'ENGINE': 'sql_server.pyodbc',
        'ENGINE': 'mssql',
        'HOST': '65.108.97.18',
        'NAME': 'epivisiondb',
        'USER': 'epivisionuser',
        'PASSWORD': '3R6nhb87#',
        'OPTIONS': {
            'driver': 'ODBC Driver 17 for SQL Server',
        },
    }

}

LOGGING = {
    'version': 1,
    # The version number of our log
    'disable_existing_loggers': False,

    # "formatters": {
    #     "verbose": {
    #         "format": "{levelname} {asctime} {module} {process:d} {thread:d} {message}",
    #         "style": "{",
    #     },
    #     "simple": {
    #         "format": "{levelname} {message}",
    #         "style": "{",
    #     },
    # },

    # "filters": {
    #     "special": {
    #         "()": "moduleProject.logging.SpecialFilter",
    #         "foo": "bar",
    #     },
    #     # "require_debug_true": {
    #     #     "()": "django.utils.log.RequireDebugTrue",
    #     # },
    # },

    # django uses some of its own loggers for internal operations. In case you want to disable them just replace the False above with true.
    # A handler for WARNING. It is basically writing the WARNING messages into a file called WARNING.log
    'handlers': {
        'WARNING_FILE': {
            'level': 'WARNING',
            'class': 'logging.FileHandler',
            'filename': BASE_DIR / 'warning.log',
        }, 'ERROR_FILE': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': BASE_DIR / 'error.log',

        },
        'db_log': {
            'level': 'DEBUG',
            'class': 'django_db_logger.db_log_handler.DatabaseLogHandler',
            
            # "filters": ["special"],
        },

    },
    # A logger for WARNING which has a handler called 'file'. A logger can have multiple handler
    'loggers': {
        # notice the blank '', Usually you would put built in loggers like django or root here based on your needs
        'WARNING_LOGGER': {
            # notice how file variable is called in handler which has been defined above
            'handlers': ['WARNING_FILE'],
            'level': 'WARNING',
            'propagate': True,
        },
        'ERROR_LOGGER': {
            # notice how file variable is called in handler which has been defined above
            'handlers': ['ERROR_FILE'],
            'level': 'ERROR',
            'propagate': True,
        },
        'db_log': {
            # notice how file variable is called in handler which has been defined above
            'handlers': ['db_log'],
            'level': 'DEBUG',
            'formatter': 'verbose',
            'propagate': True,
        },
    },
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend'
]

SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'APP': {
            'client_id': '875401801557-unu2clv61afcctvpg5apbalvrb4oec0u.apps.googleusercontent.com',
            'secret': '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',
            'key': '',
        },
        'SCOPE': [
            'profile',
            'email',
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
        }
    }
}

SITE_ID = 3

LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/'
# provider_login_url = 'https://accounts.google.com/o/oauth2/auth'

OAUTH2_PROVIDER = {
    'SCOPES': {'read': 'Read scope', 'write': 'Write scope', 'groups': 'Access to your groups'}
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        # 'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
        'rest_framework.authentication.TokenAuthentication',
    ),

    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}
CORS_ORIGIN_ALLOW_ALL = True
ACCOUNT_EMAIL_VERIFICATION = "none"