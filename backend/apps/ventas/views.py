from rest_framework import viewsets
from .models import Venta, Anulacion, Carrito, Banco, MetodoPago
from .serializers import (
    VentaSerializer, AnulacionSerializer, CarritoSerializer,
    BancoSerializer, MetodoPagoSerializer,
)

class BancoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Banco.objects.all()
    serializer_class = BancoSerializer

class MetodoPagoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MetodoPago.objects.all()
    serializer_class = MetodoPagoSerializer

class VentaViewSet(viewsets.ModelViewSet):
    queryset = Venta.objects.all()
    serializer_class = VentaSerializer

class AnulacionViewSet(viewsets.ModelViewSet):
    queryset = Anulacion.objects.all()
    serializer_class = AnulacionSerializer

class CarritoViewSet(viewsets.ModelViewSet):
    queryset = Carrito.objects.all()
    serializer_class = CarritoSerializer