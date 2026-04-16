# apps/ventas/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BancoViewSet, MetodoPagoViewSet, VentaViewSet, ClienteViewSet

router = DefaultRouter()
router.register("bancos",        BancoViewSet,      basename="bancos")
router.register("metodos-pago",  MetodoPagoViewSet, basename="metodos-pago")
router.register("ventas",        VentaViewSet,      basename="ventas")
router.register("clientes",     ClienteViewSet,   basename="clientes")


urlpatterns = [
    path("", include(router.urls)),
]