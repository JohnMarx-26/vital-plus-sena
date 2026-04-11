from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    MedicamentosViewSet, InventarioViewSet, FormasFarmaceuticasViewSet,
    PresentacionesViewSet, ViaAdministracionViewSet,
    LaboratoriosViewSet, ProveedoresViewSet
)

router = DefaultRouter()
router.register(r'medicamentos', MedicamentosViewSet)
router.register(r'inventario', InventarioViewSet)
router.register(r'formas-farmaceuticas', FormasFarmaceuticasViewSet)
router.register(r'presentaciones', PresentacionesViewSet)
router.register(r'via-administracion', ViaAdministracionViewSet)
router.register(r'laboratorios', LaboratoriosViewSet)
router.register(r'proveedores', ProveedoresViewSet)

urlpatterns = [
    path('', include(router.urls)),
]