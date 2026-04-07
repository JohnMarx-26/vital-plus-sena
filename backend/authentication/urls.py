from django.urls import path
from .views import listar_roles, login_funcionario, login_cliente

urlpatterns = [
    path('roles/', listar_roles, name='listar_roles'),
    path('auth/funcionarios/login/', login_funcionario, name='login_funcionario'),
    path('auth/clientes/login/', login_cliente, name='login_cliente')
]