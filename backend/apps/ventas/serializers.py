from rest_framework import serializers
from .models import Venta, Anulacion, Carrito, Banco, MetodoPago


class BancoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banco
        fields = ["id_banco", "nombre_banco"]


class MetodoPagoSerializer(serializers.ModelSerializer):
    banco = BancoSerializer(source="id_banco", read_only=True)

    class Meta:
        model = MetodoPago
        fields = ["id_metodo_pago", "nombre_metodo", "banco"]


class VentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venta
        fields = "__all__"


class AnulacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anulacion
        fields = "__all__"


class CarritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrito
        fields = "__all__"