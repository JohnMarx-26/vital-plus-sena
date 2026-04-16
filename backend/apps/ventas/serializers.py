# apps/ventas/serializers.py
from rest_framework import serializers
from .models import Banco, MetodoPago, Cliente


class BancoSerializer(serializers.ModelSerializer):
    id    = serializers.IntegerField(source="id_banco")
    label = serializers.CharField(source="nombre_banco")

    class Meta:
        model  = Banco
        fields = ["id", "label"]


class MetodoPagoSerializer(serializers.ModelSerializer):
    id       = serializers.IntegerField(source="id_metodo_pago")
    label    = serializers.CharField(source="nombre_metodo")
    id_banco = serializers.IntegerField(source="id_banco_id")

    class Meta:
        model  = MetodoPago
        fields = ["id", "label", "id_banco"]


class VentaWriteSerializer(serializers.Serializer):
    # Cliente (entero simple por ahora)
    id_cliente     = serializers.IntegerField()

    # Método de pago
    id_metodo_pago = serializers.IntegerField()

    # Items del carrito
    # cada item: { id_inventario, cantidad, subtotal }
    items = serializers.ListField(
        child=serializers.DictField(),
        min_length=1
    )

    # Totales
    subtotal = serializers.DecimalField(max_digits=10, decimal_places=2)
    iva      = serializers.DecimalField(max_digits=10, decimal_places=2)
    total    = serializers.DecimalField(max_digits=10, decimal_places=2)

    # Funcionario (hardcoded hasta tener auth)
    id_funcionario = serializers.IntegerField(default=1)


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Cliente
        fields = [
            "id_cliente", "id_tipo_documento", "n_documento",
            "nombres_cliente", "apellidos_cliente",
            "correo_electronico", "numero_telefonico",
        ]