from django.http import HttpRequest, HttpResponse, JsonResponse

from . import models

def index(request: HttpRequest):
    if request.method == 'GET':
        return HttpResponse('Groupchat Wrapped API Home', status=200)

def get_result(request: HttpRequest, id: int):
    if request.method == 'GET':
        try:
            result = models.GroupchatWrappedResult.objects.get(id=id)

            return JsonResponse(result.json(), safe=False, status=200)
        except models.GroupchatWrappedResult.DoesNotExist:
            return HttpResponse('not found', status=404)

def save_result(request: HttpRequest):
    if request.method == 'POST':
        # save result into db
        pass
