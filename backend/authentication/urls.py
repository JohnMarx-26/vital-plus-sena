from django.urls import path
from .views import (
    listar_roles,
    login_funcionario,
    login_cliente,
    register_cliente,
    register_funcionario,
    forgot_password,
    validate_reset_token,
    reset_password,
)

urlpatterns = [
    path('roles/', listar_roles, name='listar_roles'),
    path('auth/funcionarios/login/', login_funcionario, name='login_funcionario'),
    path('auth/clientes/login/', login_cliente, name='login_cliente'),
    path('auth/clientes/register/', register_cliente, name='register_cliente'),
    path('auth/funcionarios/register/', register_funcionario, name='register_funcionario'),
    path('auth/forgot-password/', forgot_password, name='forgot_password'),
    path('auth/validate-reset-token/', validate_reset_token, name='validate_reset_token'),
    path('auth/reset-password/', reset_password, name='reset_password'),
]