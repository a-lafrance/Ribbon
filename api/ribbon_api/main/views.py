from django.http import HttpRequest, HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from . import models

import json

def index(request: HttpRequest):
    if request.method == 'GET':
        return HttpResponse('Ribbon API Home', status=200)

def get_result(request: HttpRequest, id: int):
    if request.method == 'GET':
        try:
            result = models.GroupchatWrappedResult.objects.get(id=id)
            return JsonResponse(result.json(), safe=False, status=200)
        except models.GroupchatWrappedResult.DoesNotExist:
            return HttpResponse('not found', status=404)

@csrf_exempt
def save_result(request: HttpRequest):
    if request.method == 'POST':
        params = json.loads(request.body)

        try:
            result = models.GroupchatWrappedResult.create_from_json(params)
            return JsonResponse(result.json(), safe=False, status=200)
        except KeyError:
            return HttpResponse('invalid params', status=400)
