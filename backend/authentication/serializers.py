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