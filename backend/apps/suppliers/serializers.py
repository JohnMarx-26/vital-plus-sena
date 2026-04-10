from rest_framework import serializers
from .models import Proveedor, Ciudad, TipoDocumento


class ProveedorListSerializer(serializers.ModelSerializer):
    # Muestra el nombre del tipo de documento relacionado
    tipo_documento = serializers.CharField(
        source="tipo_documento_rel.tipo_documento",
        read_only=True
    )

    # Muestra el nombre de la ciudad relacionada a la dirección
    ciudad = serializers.CharField(
        source="direccion_rel.ciudad_rel.nombre_ciudad",
        read_only=True
    )

    # Muestra el texto de la dirección relacionada
    direccion = serializers.CharField(
        source="direccion_rel.direccion",
        read_only=True
    )

    # Une nombres y apellidos del contacto en un solo campo
    nombre_contacto = serializers.SerializerMethodField()

    class Meta:
        model = Proveedor
        fields = [
            "id_proveedor",
            "tipo_documento",
            "nombre_proveedor",
            "razon_social",
            "nombre_contacto",
            "telefono_contacto",
            "correo_electronico",
            "ciudad",
            "direccion",
            "estado",
        ]

    def get_nombre_contacto(self, obj):
        nombres = obj.nombres_contacto or ""
        apellidos = obj.apellidos_contacto or ""
        return f"{nombres} {apellidos}".strip()


class CiudadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ciudad
        fields = ["id_ciudad", "nombre_ciudad"]


class TipoDocumentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoDocumento
        fields = ["id_tipo_documento", "tipo_documento"]


class ProveedorDetailSerializer(serializers.ModelSerializer):
    # Muestra el nombre del tipo de documento relacionado
    tipo_documento = serializers.CharField(
        source="tipo_documento_rel.tipo_documento",
        read_only=True
    )

    # Muestra el nombre de la ciudad relacionada
    ciudad = serializers.CharField(
        source="direccion_rel.ciudad_rel.nombre_ciudad",
        read_only=True
    )

    # Muestra el texto de la dirección relacionada
    direccion = serializers.CharField(
        source="direccion_rel.direccion",
        read_only=True
    )

    class Meta:
        model = Proveedor
        fields = [
            "id_proveedor",
            "tipo_documento",
            "nombre_proveedor",
            "razon_social",
            "nombres_contacto",
            "apellidos_contacto",
            "telefono_contacto",
            "correo_electronico",
            "ciudad",
            "direccion",
            "estado",
        ]


class ProveedorCreateSerializer(serializers.Serializer):
    id_tipo_documento = serializers.IntegerField(required=False, allow_null=True)
    nombre_proveedor = serializers.CharField(max_length=100)
    razon_social = serializers.CharField(
        max_length=100,
        required=False,
        allow_blank=True,
        allow_null=True
    )
    nombres_contacto = serializers.CharField(
        max_length=50,
        required=False,
        allow_blank=True,
        allow_null=True
    )
    apellidos_contacto = serializers.CharField(
        max_length=50,
        required=False,
        allow_blank=True,
        allow_null=True
    )
    telefono_contacto = serializers.IntegerField(required=False, allow_null=True)
    correo_electronico = serializers.EmailField(max_length=100)
    id_ciudad = serializers.IntegerField()
    direccion = serializers.CharField(max_length=100)
    estado = serializers.ChoiceField(choices=["activo", "inactivo"])

    # Valida que no exista otro proveedor con el mismo correo
    def validate_correo_electronico(self, value):
        if Proveedor.objects.filter(correo_electronico=value).exists():
            raise serializers.ValidationError(
                "Ya existe un proveedor con ese correo electrónico."
            )
        return value


class ProveedorUpdateSerializer(serializers.Serializer):
    id_tipo_documento = serializers.IntegerField(required=False, allow_null=True)
    nombre_proveedor = serializers.CharField(max_length=100)
    razon_social = serializers.CharField(
        max_length=100,
        required=False,
        allow_blank=True,
        allow_null=True
    )
    nombres_contacto = serializers.CharField(
        max_length=50,
        required=False,
        allow_blank=True,
        allow_null=True
    )
    apellidos_contacto = serializers.CharField(
        max_length=50,
        required=False,
        allow_blank=True,
        allow_null=True
    )
    telefono_contacto = serializers.IntegerField(required=False, allow_null=True)
    correo_electronico = serializers.EmailField(max_length=100)
    id_ciudad = serializers.IntegerField()
    direccion = serializers.CharField(max_length=100)
    estado = serializers.ChoiceField(choices=["activo", "inactivo"])

    # Valida el correo excluyendo al proveedor actual
    def validate_correo_electronico(self, value):
        proveedor_id = self.context.get("proveedor_id")

        existe_otro = Proveedor.objects.filter(
            correo_electronico=value
        ).exclude(
            id_proveedor=proveedor_id
        ).exists()

        if existe_otro:
            raise serializers.ValidationError(
                "Ya existe un proveedor con ese correo electrónico."
            )

        return value