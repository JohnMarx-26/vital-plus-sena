import cloudinary.uploader 
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.db import transaction

# se utilizan para llamar el ID disponible que estara de lectura 
# cuando se crea el producto
from rest_framework.decorators import action

from .models import (
    Medicamentos, Inventario, FormasFarmaceuticas,
    Presentaciones, ViaAdministracion, Laboratorios, Proveedores, Categoria
)
from .serializers import (
    MedicamentosWriteSerializer,MedicamentosReadSerializer, InventarioWriteSerializer, InventarioReadSerializer, FormasFarmaceuticasSerializer,
    PresentacionesSerializer, ViaAdministracionSerializer,
    LaboratoriosSerializer, ProveedoresSerializer, CategoriaSerializer
)

class FormasFarmaceuticasViewSet(viewsets.ModelViewSet):
    queryset = FormasFarmaceuticas.objects.all()
    serializer_class = FormasFarmaceuticasSerializer

class PresentacionesViewSet(viewsets.ModelViewSet):
    queryset = Presentaciones.objects.all()
    serializer_class = PresentacionesSerializer

    #Dependiendo la forma farmaceutica se despliega unas presentaciones
    #Se hace  categorizando las presentaciones por id de forma farmaceutica
    def get_queryset(self):
        queryset = Presentaciones.objects.all()
        forma = self.request.query_params.get('forma')
        if forma:
            queryset = queryset.filter(id_forma_farmaceutica=forma)
        return queryset

class ViaAdministracionViewSet(viewsets.ModelViewSet):
    queryset = ViaAdministracion.objects.all()
    serializer_class = ViaAdministracionSerializer

class ProveedoresViewSet(viewsets.ModelViewSet):
    queryset = Proveedores.objects.all()
    serializer_class = ProveedoresSerializer

class LaboratoriosViewSet(viewsets.ModelViewSet):
    queryset = Laboratorios.objects.all()
    serializer_class = LaboratoriosSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class MedicamentosViewSet(viewsets.ModelViewSet):

    queryset = Medicamentos.objects.all()

    def get_queryset(self):
        estado = self.request.query_params.get('estado')
        if estado:
            return Medicamentos.objects.filter(estado_medicamento=estado)
        return Medicamentos.objects.all()

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return MedicamentosWriteSerializer
        return MedicamentosReadSerializer
    
    # Se crea un enpont para mostrar en el input del front 
    #el ID disponible para el producto a crear ya que este 
    #input estará solo en modo lectura
    @action(detail=False, methods=['get'], url_path='siguiente-id')
    def siguiente_id(self, request):
        ultimo = Medicamentos.objects.order_by('-id_medicamento').first()
        siguiente = (ultimo.id_medicamento + 1) if ultimo else 1
        return Response({"siguiente_id": siguiente})
    
    @transaction.atomic
    def create(self, request, *args, **kwargs):
        data = request.data.copy()

        # 1. Subir imagen a Cloudinary si viene en el request
        imagen = request.FILES.get('imagen')
        if imagen:
            resultado = cloudinary.uploader.upload(imagen, folder='medicamentos/')
            data['imagen_url'] = resultado['secure_url']

        # 2. Asignar estado automáticamente
        data['estado_medicamento'] = 'activo'

        # 3. Crear medicamento
        serializer = MedicamentosWriteSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        medicamento = serializer.save()

        # 4. Crear inventario automáticamente
        Inventario.objects.create(
            id_medicamento=medicamento,
            lote=data.get('lote'),
            fecha_de_fabricacion=data.get('fecha_de_fabricacion'),
            fecha_de_vencimiento=data.get('fecha_de_vencimiento'),
            stock=data.get('stock'),
            precio_compra=data.get('precio_compra'),
            precio_venta=data.get('precio_venta'),
            id_proveedor_id=data.get('id_proveedor'),
        )

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class InventarioViewSet(viewsets.ModelViewSet):
    queryset = Inventario.objects.all()

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return InventarioWriteSerializer
        return InventarioReadSerializer