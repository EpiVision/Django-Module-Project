from django.shortcuts import render
from django.http import HttpResponse
import logging
import datetime
import inspect

# Get an instance of a logger
warning = logging.getLogger('WARNING_LOGGER')
error = logging.getLogger('ERROR_LOGGER')
db_log = logging.getLogger('db_log')


# Create your views here.
def index(request):
    # print('I am in index function')
    # print('This is a warning message at ' + str(datetime.datetime.now()) + ' hour')
    # warning.warning('This is a warning message at ' + str(datetime.datetime.now()) + ' hour')
    # error.error('This is an error message at '+ str(datetime.datetime.now()) + ' hour')
    # customLogger = 
    CustomLogger().debug('This is a debug message')
    # db_log.debug( 'This is a debug message in function name ')
    # try:
    #     a = 1/0
    #     # print(a)
    # except Exception as e:
    #     db_log.exception( 'This is a debug message in function name %s'), str(e)

    # frame = inspect.currentframe()
    # print(inspect.currentframe().f_code.co_name)

    return HttpResponse("<h1>Index API called :)</h1>")


class CustomLogger:
    
    customLogger = None

    def __init__(self):
        self.logger = logging.getLogger('db_log')
    

    def debug(self, message):
        # message = message + str( inspect.currentframe().f_back.f_code.co_name)
        filename,line_number,function_name = inspect.stack()[1][1:4]
        message = message + ' file_Name : ' + filename +  ' function_name : ' + function_name +' line_number : ' + str(line_number) 
        print(message)
        self.logger.debug(message)

    def info(self, message):
        self.logger.info(message)

    def warning(self, message):
        self.logger.warning(message)

    def error(self, message):
        self.logger.error(message)

    def exception(self, message):
        self.logger.exception(message)

    def critical(self, message):
        self.logger.critical(message)

    

     
    # def get_instance(self):
    #     if CustomLogger.customLogger is None:
    #         CustomLogger.customLogger = CustomLogger()
    #         print("New instance")
    #     else:
    #         print("Old instance")
    #     return CustomLogger.customLogger

    def __new__(self):
        if CustomLogger.customLogger is None:
            CustomLogger.customLogger = object.__new__(self)
            # print("New instance")
        # else:
            # print("Old instance")
        return CustomLogger.customLogger
                
    