from rest_framework import serializers
from .models import Productos, Categorias
from apps.medicines.serializers import LaboratoriosSerializer, PresentacionesSerializer

class CategoriasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorias
        fields = '__all__'

class ProductosSerializer(serializers.ModelSerializer):
    id_laboratorio = LaboratoriosSerializer()
    id_categoria = CategoriasSerializer()
    id_presentacion = PresentacionesSerializer()

    class Meta:
        model = Productos
        fields = '__all__'
        