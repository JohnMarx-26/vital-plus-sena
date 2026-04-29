from django.urls import path

from .views import (
    lista_proveedores,
    detalle_proveedor,
    crear_proveedor,
    actualizar_proveedor,
    lista_ciudades,
    lista_tipos_documento,
)

urlpatterns = [
    path("proveedores/", lista_proveedores, name="lista-proveedores"),
    path("ciudades/", lista_ciudades, name="lista-ciudades"),
    path("tipos-documento/", lista_tipos_documento, name="lista-tipos-documento"),
    path("proveedores/<int:proveedor_id>/", detalle_proveedor, name="detalle-proveedor"),
    path("proveedores/crear/", crear_proveedor, name="crear-proveedor"),
    path(
        "proveedores/<int:proveedor_id>/actualizar/",
        actualizar_proveedor,
        name="actualizar-proveedor"
    ),
]