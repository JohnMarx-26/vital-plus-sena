from rest_framework import serializers
from .models import (
    Medicamentos, Inventario, FormasFarmaceuticas,
    Presentaciones, ViaAdministracion, Laboratorios, Proveedores, Categoria,
)

# Serializers simples sin anidación

class FormasFarmaceuticasSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormasFarmaceuticas
        fields = '__all__'

class PresentacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Presentaciones
        fields = '__all__'

class ViaAdministracionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ViaAdministracion
        fields = '__all__'

class ProveedoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedores
        fields = '__all__'

#   Categorias para las cards
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id_categoria', 'nombre_categoria']


# Serilizer anidado porque depende de proveedores
class LaboratoriosSerializer(serializers.ModelSerializer):
    id_proveedor = ProveedoresSerializer()

    class Meta:
        model = Laboratorios
        fields = '__all__'


# ───  accion de escritura WRITE recibe los ID's para hacer POST ───
class MedicamentosWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicamentos
        fields = [
            'nombre_medicamento',
            'id_forma_farmaceutica',
            'id_presentacion',
            'id_via_administracion',
            'id_laboratorio',
            'id_categoria',
            'concentracion',
            'requiere_formula',
            'descripcion',
            'imagen_url',   
            'estado_medicamento',  
        ]

# ─── Inventario simple solo para anidar en Medicamentos (CARDS de front) ───
class InventarioSimpleSerializer(serializers.ModelSerializer):
    nombre_proveedor = serializers.CharField(source='id_proveedor.nombre_proveedor', read_only=True)
    id_proveedor_id = serializers.IntegerField(source='id_proveedor.id_proveedor', read_only=True)

    class Meta:
        model = Inventario
        fields = [
            'id_inventario',
            'stock',
            'precio_compra',
            'precio_venta',
            'precio_descuento',
            'lote',
            'fecha_de_fabricacion',
            'fecha_de_vencimiento',
            'nombre_proveedor',
            'id_proveedor_id',
        ]
# ─── Se devuelven objetos anidados de lectura  GET  ───
class MedicamentosReadSerializer(serializers.ModelSerializer):
    id_forma_farmaceutica = FormasFarmaceuticasSerializer()
    id_presentacion = PresentacionesSerializer()
    id_via_administracion = ViaAdministracionSerializer()
    id_laboratorio = LaboratoriosSerializer()
    id_categoria = CategoriaSerializer() 
    inventario = InventarioSimpleSerializer(many=True, read_only=True)

    class Meta:
        model = Medicamentos
        fields = '__all__'   # ya incluye imagen_url y estado_medicamento automáticamente

# ───  accion de escritura WRITE recibe los ID's para hacer POST ───
class InventarioWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventario
        fields = [
            'id_medicamento',
            'lote',
            'fecha_de_fabricacion',
            'fecha_de_vencimiento',
            'stock',
            'precio_compra',
            'precio_venta',
            'precio_descuento',
            'id_proveedor',
        ]

# ─── Se devuelven objetos anidados de lectura  GET  ───
class InventarioReadSerializer(serializers.ModelSerializer):
    id_medicamento = MedicamentosReadSerializer()
    id_proveedor = ProveedoresSerializer()

    class Meta:
        model = Inventario
        fields = '__all__'