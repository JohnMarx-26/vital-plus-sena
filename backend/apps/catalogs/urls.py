from django.urls import path
from .views import lista_bancos

urlpatterns = [
    path("bancos/", lista_bancos, name="lista-bancos"),
]