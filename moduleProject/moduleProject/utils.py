from drf_yasg import openapi

def get_header_params():
    header_param = openapi.Parameter("Authorization",openapi.IN_HEADER,description="Auth Token", type=openapi.IN_HEADER) 
    return [header_param]