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
    listar_permisos,
    create_role,
    manage_roles,
    delete_role,
    role_detail,
    update_role,
)

urlpatterns = [
    path('roles/', listar_roles, name='listar_roles'),
    path('permisos/', listar_permisos, name='listar_permisos'),
    path('roles/create/', create_role, name='create_role'),
    path('roles/manage/', manage_roles, name='manage_roles'),
    path('roles/<int:role_id>/', role_detail, name='role_detail'),
    path('roles/<int:role_id>/update/', update_role, name='update_role'),
    path('roles/<int:role_id>/delete/', delete_role, name='delete_role'),
    path('auth/funcionarios/login/', login_funcionario, name='login_funcionario'),
    path('auth/clientes/login/', login_cliente, name='login_cliente'),
    path('auth/clientes/register/', register_cliente, name='register_cliente'),
    path('auth/funcionarios/register/', register_funcionario, name='register_funcionario'),
    path('auth/forgot-password/', forgot_password, name='forgot_password'),
    path('auth/validate-reset-token/', validate_reset_token, name='validate_reset_token'),
    path('auth/reset-password/', reset_password, name='reset_password'),
]