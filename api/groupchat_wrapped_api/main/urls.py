from . import views
from django.urls import path

urlpatterns = [
    path('', views.index),
    path('results/<int:id>', views.get_result),
    path('results', views.save_result)
]
