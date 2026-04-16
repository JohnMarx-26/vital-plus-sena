# apps/ventas/views.py
from django.db import transaction
from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Banco, MetodoPago, Venta, DetalleVenta, Factura, Cliente
from .serializers import (BancoSerializer, MetodoPagoSerializer, VentaWriteSerializer, ClienteSerializer)


class BancoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset         = Banco.objects.all()
    serializer_class = BancoSerializer


class MetodoPagoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset         = MetodoPago.objects.all()
    serializer_class = MetodoPagoSerializer


class ClienteViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ClienteSerializer

    def get_queryset(self):
        qs        = Cliente.objects.all()
        documento = self.request.query_params.get("documento")
        if documento:
            qs = qs.filter(n_documento=documento)
        return qs


class VentaViewSet(viewsets.ViewSet):

    @transaction.atomic
    def create(self, request):
        serializer = VentaWriteSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        primer_detalle_id = None

        for item in data["items"]:
            detalle = DetalleVenta.objects.create(
                id_inventario  = item["id_inventario"],
                cantidad       = item["cantidad"],
                id_metodo_pago = data["id_metodo_pago"],
                iva            = 19,
                subtotal       = item["subtotal"],
            )
            if primer_detalle_id is None:
                primer_detalle_id = detalle.id_detalle

        venta = Venta.objects.create(
            id_funcionario = data["id_funcionario"],
            id_cliente     = data["id_cliente"],
            id_detalle     = primer_detalle_id,
            total          = data["total"],
        )

        factura = Factura.objects.create(
            id_venta    = venta.id_venta,
            url_factura = None,
        )

        # Releer para obtener numero_factura generado por la BD
        factura = Factura.objects.get(id_factura=factura.id_factura)

        return Response(
            {
                "mensaje"        : "Venta registrada correctamente",
                "id_venta"       : venta.id_venta,
                "numero_factura" : factura.numero_factura,
                "id_factura"     : factura.id_factura,
            },
            status=status.HTTP_201_CREATED,
        )