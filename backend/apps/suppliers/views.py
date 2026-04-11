from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Proveedor, Ciudad, TipoDocumento, Direccion

from .serializers import (
    ProveedorListSerializer,
    CiudadSerializer,
    TipoDocumentoSerializer,
    ProveedorDetailSerializer,
    ProveedorCreateSerializer,
    ProveedorUpdateSerializer,
)


@api_view(["GET"])
def lista_proveedores(request):
    # Obtiene todos los proveedores con sus relaciones
    proveedores = (
        Proveedor.objects
        .select_related("tipo_documento_rel", "direccion_rel__ciudad_rel")
        .all()
        .order_by("id_proveedor")
    )

    serializer = ProveedorListSerializer(proveedores, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def detalle_proveedor(request, proveedor_id):
    # Busca un proveedor por id
    try:
        proveedor = (
            Proveedor.objects
            .select_related("tipo_documento_rel", "direccion_rel__ciudad_rel")
            .get(id_proveedor=proveedor_id)
        )
    except Proveedor.DoesNotExist:
        return Response(
            {"error": "Proveedor no encontrado"},
            status=404
        )

    serializer = ProveedorDetailSerializer(proveedor)
    return Response(serializer.data)


@api_view(["POST"])
def crear_proveedor(request):
    # Valida los datos de entrada
    serializer = ProveedorCreateSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    data = serializer.validated_data

    # Busca la ciudad asociada a la dirección
    try:
        ciudad = Ciudad.objects.get(id_ciudad=data["id_ciudad"])
    except Ciudad.DoesNotExist:
        return Response({"error": "La ciudad no existe"}, status=404)

    # Crea primero la dirección relacionada
    direccion_obj = Direccion.objects.create(
        direccion=data["direccion"],
        ciudad_rel=ciudad,
    )

    # Crea el proveedor con la dirección recién creada
    proveedor = Proveedor.objects.create(
        tipo_documento_rel_id=data.get("id_tipo_documento"),
        n_documento=data.get("n_documento"),
        nombre_proveedor=data.get("nombre_proveedor"),
        razon_social=data.get("razon_social"),
        nombres_contacto=data.get("nombres_contacto"),
        apellidos_contacto=data.get("apellidos_contacto"),
        telefono_contacto=data.get("telefono_contacto"),
        correo_electronico=data.get("correo_electronico"),
        direccion_rel=direccion_obj,
        estado=data.get("estado"),
        foto_url=data.get("foto_url"),
    )

    # Consulta de nuevo el proveedor con relaciones para devolverlo completo
    proveedor = (
        Proveedor.objects
        .select_related("tipo_documento_rel", "direccion_rel__ciudad_rel")
        .get(id_proveedor=proveedor.id_proveedor)
    )

    response_serializer = ProveedorDetailSerializer(proveedor)
    return Response(response_serializer.data, status=201)


@api_view(["PUT"])
def actualizar_proveedor(request, proveedor_id):
    # Busca el proveedor a actualizar
    try:
        proveedor = Proveedor.objects.get(id_proveedor=proveedor_id)
    except Proveedor.DoesNotExist:
        return Response({"error": "Proveedor no encontrado"}, status=404)

    # Valida los datos recibidos para actualización
    serializer = ProveedorUpdateSerializer(
        data=request.data,
        context={"proveedor_id": proveedor_id}
    )
    serializer.is_valid(raise_exception=True)

    data = serializer.validated_data

    # Busca la ciudad nueva
    try:
        ciudad = Ciudad.objects.get(id_ciudad=data["id_ciudad"])
    except Ciudad.DoesNotExist:
        return Response({"error": "La ciudad no existe"}, status=404)

    # Actualiza la dirección relacionada si ya existe
    if proveedor.direccion_rel:
        proveedor.direccion_rel.direccion = data["direccion"]
        proveedor.direccion_rel.ciudad_rel = ciudad
        proveedor.direccion_rel.save()
    else:
        # Crea una dirección si el proveedor no tenía una relacionada
        direccion_obj = Direccion.objects.create(
            direccion=data["direccion"],
            ciudad_rel=ciudad,
        )
        proveedor.direccion_rel = direccion_obj

    # Actualiza los campos principales del proveedor
    proveedor.tipo_documento_rel_id = data.get("id_tipo_documento")
    proveedor.n_documento = data.get("n_documento")
    proveedor.nombre_proveedor = data.get("nombre_proveedor")
    proveedor.razon_social = data.get("razon_social")
    proveedor.nombres_contacto = data.get("nombres_contacto")
    proveedor.apellidos_contacto = data.get("apellidos_contacto")
    proveedor.telefono_contacto = data.get("telefono_contacto")
    proveedor.correo_electronico = data.get("correo_electronico")
    proveedor.estado = data.get("estado")
    proveedor.foto_url = data.get("foto_url")
    proveedor.save()

    # Consulta final para devolver el detalle actualizado
    proveedor = (
        Proveedor.objects
        .select_related("tipo_documento_rel", "direccion_rel__ciudad_rel")
        .get(id_proveedor=proveedor_id)
    )

    response_serializer = ProveedorDetailSerializer(proveedor)
    return Response(response_serializer.data, status=200)


@api_view(["GET"])
def lista_ciudades(request):
    # Lista todas las ciudades ordenadas por nombre
    ciudades = Ciudad.objects.all().order_by("nombre_ciudad")
    serializer = CiudadSerializer(ciudades, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def lista_tipos_documento(request):
    # Lista todos los tipos de documento
    tipos_documento = TipoDocumento.objects.all().order_by("id_tipo_documento")
    serializer = TipoDocumentoSerializer(tipos_documento, many=True)
    return Response(serializer.data)