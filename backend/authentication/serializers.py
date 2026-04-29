from rest_framework import serializers
from .models import Roles, Funcionarios, TipoDocumentos, Direcciones, Ciudades

# En resumen, Un serializer convierte datos de un modelo a un JSON

class RolesSerializers(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = '__all__'


# Lo que hace esto es que solo valida cuando alguien quiere hacer un login lleguen los datos
class FuncionarioLoginSerializer(serializers.Serializer):
    correo_electronico = serializers.EmailField()
    contrasena = serializers.CharField()


# La misma vaina de arriba pero para clientes
class ClienteLoginSerializer(serializers.Serializer):
    correo_electronico = serializers.EmailField()
    contrasena = serializers.CharField()


class ClienteRegisterSerializer(serializers.Serializer):
    documentType = serializers.IntegerField()
    firstName = serializers.CharField(max_length=60)
    lastName = serializers.CharField(max_length=60)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=10)
    documentNumber = serializers.CharField(max_length=20)
    city = serializers.IntegerField()
    address = serializers.CharField(max_length=120)
    password = serializers.CharField(write_only=True, min_length=8)
    confirmPassword = serializers.CharField(write_only=True, min_length=1)
    avatarUrl = serializers.CharField(
        required=False,
        allow_null=True,
        allow_blank=True
    )

class FuncionarioRegisterSerializer(serializers.Serializer):
    documentType = serializers.IntegerField()
    active = serializers.ChoiceField(choices=["activo", "inactivo"])
    firstName = serializers.CharField(max_length=60)
    lastName = serializers.CharField(max_length=60)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=10)
    documentNumber = serializers.CharField(max_length=20)
    city = serializers.IntegerField()
    address = serializers.CharField(max_length=120)
    role = serializers.IntegerField()
    password = serializers.CharField(write_only=True, min_length=8)
    confirmPassword = serializers.CharField(write_only=True, min_length=1)
    avatarUrl = serializers.CharField(
        required=False,
        allow_null=True,
        allow_blank=True
    )

    def validate_phone(self, value):
        if not value.isdigit() or len(value) != 10:
            raise serializers.ValidationError("El teléfono debe tener 10 dígitos")
        return value

    def validate_documentNumber(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("El número de documento solo debe contener dígitos")
        return value

    def validate(self, attrs):
        if attrs["password"] != attrs["confirmPassword"]:
            raise serializers.ValidationError(
                {"confirmPassword": "Las contraseñas no coinciden"}
            )
        return attrs

    def validate_phone(self, value):
        if not value.isdigit() or len(value) != 10:
            raise serializers.ValidationError("El teléfono debe tener 10 dígitos")
        return value

    def validate_documentNumber(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("El número de documento solo debe contener dígitos")
        return value

    def validate(self, attrs):
        if attrs["password"] != attrs["confirmPassword"]:
            raise serializers.ValidationError(
                {"confirmPassword": "Las contraseñas no coinciden"}
            )
        return attrs

class FuncionarioUpdateSerializer(serializers.Serializer):
    documentType = serializers.IntegerField()
    firstName = serializers.CharField(max_length=60)
    lastName = serializers.CharField(max_length=60)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=10)
    documentNumber = serializers.CharField(max_length=20)
    city = serializers.IntegerField()
    address = serializers.CharField(max_length=120)
    role = serializers.IntegerField()
    active = serializers.ChoiceField(choices=["activo", "inactivo"])
    avatarUrl = serializers.CharField(
        required=False,
        allow_null=True,
        allow_blank=True
    )

    # Valida que el teléfono tenga 10 dígitos
    def validate_phone(self, value):
        if not value.isdigit() or len(value) != 10:
            raise serializers.ValidationError("El teléfono debe tener 10 dígitos")
        return value

    # Valida que el documento solo tenga números
    def validate_documentNumber(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("El número de documento solo debe contener dígitos")
        return value

    # Valida que no exista otro funcionario con el mismo correo
    def validate_email(self, value):
        funcionario_id = self.context.get("funcionario_id")

        existe_otro = Funcionarios.objects.filter(
            correo_electronico=value.strip().lower()
        ).exclude(
            id_funcionario=funcionario_id
        ).exists()

        if existe_otro:
            raise serializers.ValidationError("Ya existe un funcionario con ese correo")

        return value

class FuncionarioDetailSerializer(serializers.ModelSerializer):
    # Devuelve la dirección real en vez del id_direccion
    address = serializers.SerializerMethodField()

    # Devuelve el id de la ciudad para que el select quede seleccionado
    city = serializers.SerializerMethodField()

    class Meta:
        model = Funcionarios
        fields = [
            "id_funcionario",
            "id_tipo_documento",
            "n_documento",
            "nombres_funcionario",
            "apellidos_funcionario",
            "correo_electronico",
            "numero_telefonico",
            "id_rol",
            "estado_cuenta",
            "foto_url",
            "address",
            "city",
        ]

    def get_address(self, obj):
        if not obj.id_direccion:
            return ""

        direccion = Direcciones.objects.filter(
            id_direccion=obj.id_direccion
        ).first()

        return direccion.direccion if direccion else ""

    def get_city(self, obj):
        if not obj.id_direccion:
            return ""

        direccion = Direcciones.objects.filter(
            id_direccion=obj.id_direccion
        ).first()

        return direccion.id_ciudad if direccion else ""


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()


class ValidateResetTokenSerializer(serializers.Serializer):
    email = serializers.EmailField()
    token = serializers.CharField(min_length=4)


class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    token = serializers.CharField(min_length=4)
    password = serializers.CharField(write_only=True, min_length=8)
    confirmPassword = serializers.CharField(write_only=True, min_length=1)

    def validate(self, attrs):
        if attrs["password"] != attrs["confirmPassword"]:
            raise serializers.ValidationError(
                {"confirmPassword": "Las contraseñas no coinciden"}
            )
        return attrs
    
class PermisoSerializer(serializers.Serializer):
    id_permiso = serializers.IntegerField()
    nombre_permiso = serializers.CharField()
    modulo = serializers.CharField()
    descripcion = serializers.CharField(allow_null=True, required=False)


class PermisoSeleccionadoSerializer(serializers.Serializer):
    modulo = serializers.CharField(max_length=100)
    nombre_permiso = serializers.CharField(max_length=100)


class RoleCreateSerializer(serializers.Serializer):
    nombre_rol = serializers.CharField(max_length=30)
    descripcion = serializers.CharField(max_length=100)
    plantilla_base = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    permisos = PermisoSeleccionadoSerializer(many=True)

    def validate_nombre_rol(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("El nombre del rol es obligatorio")
        return value

    def validate_descripcion(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("La descripción es obligatoria")
        return value

    def validate_permisos(self, value):
        if not value:
            raise serializers.ValidationError("Debes seleccionar al menos un permiso")

        seen = set()
        for item in value:
            key = (item["modulo"].strip(), item["nombre_permiso"].strip())
            if key in seen:
                raise serializers.ValidationError("Hay permisos duplicados en la solicitud")
            seen.add(key)

        return value

class FuncionarioListSerializer(serializers.ModelSerializer):
    # Devuelve el nombre del tipo de documento en vez del id
    tipo_documento = serializers.SerializerMethodField()

    # Devuelve la dirección real en vez del id_direccion
    direccion = serializers.SerializerMethodField()

    # Devuelve el nombre de la ciudad asociada a la dirección
    ciudad = serializers.SerializerMethodField()

    # Devuelve el nombre del rol en vez del id_rol
    rol = serializers.SerializerMethodField()

    class Meta:
        model = Funcionarios
        fields = [
            "id_funcionario",
            "nombres_funcionario",
            "apellidos_funcionario",
            "tipo_documento",
            "n_documento",
            "correo_electronico",
            "direccion",
            "ciudad",
            "numero_telefonico",
            "rol",
            "estado_cuenta",
        ]

    # Busca el nombre del tipo de documento
    def get_tipo_documento(self, obj):
        if not obj.id_tipo_documento:
            return ""

        tipo_doc = TipoDocumentos.objects.filter(
            id_tipo_documento=obj.id_tipo_documento
        ).first()

        return tipo_doc.tipo_documento if tipo_doc else ""

    # Busca la dirección real
    def get_direccion(self, obj):
        if not obj.id_direccion:
            return ""

        direccion = Direcciones.objects.filter(
            id_direccion=obj.id_direccion
        ).first()

        return direccion.direccion if direccion else ""

    # Busca la ciudad a partir de la dirección
    def get_ciudad(self, obj):
        if not obj.id_direccion:
            return ""

        direccion = Direcciones.objects.filter(
            id_direccion=obj.id_direccion
        ).first()

        if not direccion or not direccion.id_ciudad:
            return ""

        ciudad = Ciudades.objects.filter(
            id_ciudad=direccion.id_ciudad
        ).first()

        return ciudad.nombre_ciudad if ciudad else ""

    # Busca el nombre del rol
    def get_rol(self, obj):
        if not obj.id_rol:
            return ""

        rol = Roles.objects.filter(
            id_rol=obj.id_rol
        ).first()

        return rol.nombre_rol if rol else ""
