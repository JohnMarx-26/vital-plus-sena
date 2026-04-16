from rest_framework.routers import DefaultRouter
from django.urls import path, include
from . import views

router = DefaultRouter()
router.register(r"bancos", views.BancoViewSet, basename="bancos")
router.register(r"metodos_pago", views.MetodoPagoViewSet, basename="metodos_pago")
router.register(r"ventas", views.VentaViewSet, basename="ventas")
router.register(r"anulaciones", views.AnulacionViewSet, basename="anulaciones")
router.register(r"carritos", views.CarritoViewSet, basename="carritos")

urlpatterns = [
    path("", include(router.urls)),
]