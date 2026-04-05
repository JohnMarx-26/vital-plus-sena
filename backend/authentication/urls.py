from django.urls import path
from .views import listar_roles

urlpatterns = [
    path('roles/', listar_roles, name='listar_roles'),
]