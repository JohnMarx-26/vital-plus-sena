from rest_framework import serializers
from .models import Roles

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