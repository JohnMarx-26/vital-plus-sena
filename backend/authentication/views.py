from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from django.db import transaction
from django.core.cache import cache
import random
import string

from .models import Roles, Funcionarios, Clientes, Direcciones
from .serializers import (
    RolesSerializers,
    FuncionarioLoginSerializer,
    ClienteLoginSerializer,
    ClienteRegisterSerializer,
    FuncionarioRegisterSerializer,
    ForgotPasswordSerializer,
    ValidateResetTokenSerializer,
    ResetPasswordSerializer,
)

# Aqui dice que esta vista solo responde peticiones GET
@api_view(['GET'])
def listar_roles(request):
    # Trae los registros de la tabla roles
    roles = Roles.objects.all()
    # Convierte los registros a un formato que se pueda devolver como JSON
    serializer = RolesSerializers(roles, many=True)
    # Devuelve la respuesta al frontend o al navegador
    return Response(serializer.data)


@api_view(['POST'])
def login_funcionario(request):
    serializer = FuncionarioLoginSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(
            {
                'ok': False,
                'mensaje': 'Datos inválidos',
                'errores': serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    correo = serializer.validated_data['correo_electronico']
    contrasena = serializer.validated_data['contrasena']

    try:
        funcionario = Funcionarios.objects.get(correo_electronico=correo)
    except Funcionarios.DoesNotExist:
        return Response(
            {
                'ok': False,
                'mensaje': 'El funcionario no existe'
            },
            status=status.HTTP_404_NOT_FOUND
        )

    if funcionario.contrasena != contrasena:
        return Response(
            {
                'ok': False,
                'mensaje': 'Contraseña incorrecta'
            },
            status=status.HTTP_401_UNAUTHORIZED
        )

    if (funcionario.estado_cuenta or '').strip().lower() != 'activo':
        return Response(
            {
                'ok': False,
                'mensaje': 'La cuenta no está activa'
            },
            status=status.HTTP_403_FORBIDDEN
        )

    return Response(
        {
            'ok': True,
            'mensaje': 'Login exitoso',
            'data': {
                'id_funcionario': funcionario.id_funcionario,
                'correo_electronico': funcionario.correo_electronico,
                'id_rol': funcionario.id_rol,
                'estado_cuenta': funcionario.estado_cuenta,
            }
        },
        status=status.HTTP_200_OK
    )


@api_view(['POST'])
def login_cliente(request):
    serializer = ClienteLoginSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(
            {
                'ok': False,
                'mensaje': 'Datos inválidos',
                'errores': serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    correo = serializer.validated_data['correo_electronico']
    contrasena = serializer.validated_data['contrasena']

    try:
        cliente = Clientes.objects.get(correo_electronico=correo)
    except Clientes.DoesNotExist:
        return Response(
            {
                'ok': False,
                'mensaje': 'El cliente no existe'
            },
            status=status.HTTP_404_NOT_FOUND
        )

    if cliente.contrasena != contrasena:
        return Response(
            {
                'ok': False,
                'mensaje': 'Contraseña incorrecta'
            },
            status=status.HTTP_401_UNAUTHORIZED
        )

    if (cliente.estado_cuenta or '').strip().lower() != 'activo':
        return Response(
            {
                'ok': False,
                'mensaje': 'La cuenta no está activa'
            },
            status=status.HTTP_403_FORBIDDEN
        )

    return Response(
        {
            'ok': True,
            'mensaje': 'Login exitoso',
            'data': {
                'id_cliente': cliente.id_cliente,
                'correo_electronico': cliente.correo_electronico,
                'estado_cuenta': cliente.estado_cuenta,
            }
        },
        status=status.HTTP_200_OK
    )


@api_view(['POST'])
def register_cliente(request):
    serializer = ClienteRegisterSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(
            {
                'ok': False,
                'mensaje': 'Datos inválidos',
                'errores': serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    data = serializer.validated_data
    correo = data['email'].strip().lower()

    if Clientes.objects.filter(correo_electronico=correo).exists():
        return Response(
            {
                'ok': False,
                'mensaje': 'Ya existe un cliente con ese correo'
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        with transaction.atomic():
            # Campos reales del modelo generado por inspectdb
            campos_direccion = {field.name for field in Direcciones._meta.fields}
            campos_cliente = {field.name for field in Clientes._meta.fields}

            # Crear dirección de forma flexible
            direccion_kwargs = {
                'direccion': data['address'].strip(),
            }

            if 'id_ciudad_id' in campos_direccion:
                direccion_kwargs['id_ciudad_id'] = int(data['city'])
            elif 'id_ciudad' in campos_direccion:
                direccion_kwargs['id_ciudad'] = int(data['city'])
            else:
                raise Exception("No se encontró el campo de ciudad en el modelo Direcciones")

            direccion_creada = Direcciones.objects.create(**direccion_kwargs)

            # Crear cliente de forma flexible
            cliente_kwargs = {
                'n_documento': int(data['documentNumber']),
                'nombres_cliente': data['firstName'].strip(),
                'apellidos_cliente': data['lastName'].strip(),
                'correo_electronico': correo,
                'numero_telefonico': int(data['phone']),
                'contrasena': data['password'],
                'fecha_registro': timezone.now(),
                'estado_cuenta': 'activo',
            }

            if 'id_tipo_documento_id' in campos_cliente:
                cliente_kwargs['id_tipo_documento_id'] = int(data['documentType'])
            elif 'id_tipo_documento' in campos_cliente:
                cliente_kwargs['id_tipo_documento'] = int(data['documentType'])
            else:
                raise Exception("No se encontró el campo de tipo de documento en el modelo Clientes")

            if 'id_direccion_id' in campos_cliente:
                cliente_kwargs['id_direccion_id'] = direccion_creada.id_direccion
            elif 'id_direccion' in campos_cliente:
                cliente_kwargs['id_direccion'] = direccion_creada.id_direccion
            else:
                raise Exception("No se encontró el campo de dirección en el modelo Clientes")

            # Foto opcional, tolerante al nombre del campo
            avatar = data.get('avatarUrl') or None
            if avatar:
                if 'foto_url' in campos_cliente:
                    cliente_kwargs['foto_url'] = avatar
                elif 'Foto_url' in campos_cliente:
                    cliente_kwargs['Foto_url'] = avatar

            cliente = Clientes.objects.create(**cliente_kwargs)

            return Response(
                {
                    'ok': True,
                    'mensaje': 'Cliente registrado correctamente',
                    'data': {
                        'id_cliente': cliente.id_cliente,
                        'correo_electronico': cliente.correo_electronico,
                        'estado_cuenta': cliente.estado_cuenta,
                    }
                },
                status=status.HTTP_201_CREATED
            )

    except Exception as e:
        return Response(
            {
                'ok': False,
                'mensaje': 'No se pudo registrar el cliente',
                'error': str(e)
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    
@api_view(['POST'])
def register_funcionario(request):
    serializer = FuncionarioRegisterSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(
            {
                'ok': False,
                'mensaje': 'Datos inválidos',
                'errores': serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    data = serializer.validated_data
    correo = data['email'].strip().lower()

    if Funcionarios.objects.filter(correo_electronico=correo).exists():
        return Response(
            {
                'ok': False,
                'mensaje': 'Ya existe un funcionario con ese correo'
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        with transaction.atomic():
            direccion_creada = Direcciones.objects.create(
                direccion=data['address'].strip(),
                id_ciudad=int(data['city'])
            )

            funcionario = Funcionarios.objects.create(
                id_tipo_documento=int(data['documentType']),
                n_documento=int(data['documentNumber']),
                nombres_funcionario=data['firstName'].strip(),
                apellidos_funcionario=data['lastName'].strip(),
                correo_electronico=correo,
                numero_telefonico=int(data['phone']),
                id_direccion=direccion_creada.id_direccion,
                contrasena=data['password'],
                fecha_registro=timezone.now(),
                id_rol=int(data['role']),
                estado_cuenta='activo',
                foto_url=data.get('avatarUrl') or None
            )

            return Response(
                {
                    'ok': True,
                    'mensaje': 'Funcionario registrado correctamente',
                    'data': {
                        'id_funcionario': funcionario.id_funcionario,
                        'correo_electronico': funcionario.correo_electronico,
                        'id_rol': funcionario.id_rol,
                        'estado_cuenta': funcionario.estado_cuenta,
                    }
                },
                status=status.HTTP_201_CREATED
            )

    except Exception as e:
        return Response(
            {
                'ok': False,
                'mensaje': 'No se pudo registrar el funcionario',
                'error': str(e)
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    
def generar_token(longitud=6):
    return ''.join(random.choices(string.digits, k=longitud))


@api_view(['POST'])
def forgot_password(request):
    serializer = ForgotPasswordSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(
            {
                'ok': False,
                'mensaje': 'Datos inválidos',
                'errores': serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    email = serializer.validated_data['email'].strip().lower()

    cliente = Clientes.objects.filter(correo_electronico=email).first()
    funcionario = Funcionarios.objects.filter(correo_electronico=email).first()

    if not cliente and not funcionario:
        return Response(
            {
                'ok': False,
                'mensaje': 'No existe una cuenta con ese correo'
            },
            status=status.HTTP_404_NOT_FOUND
        )

    user_type = 'cliente' if cliente else 'funcionario'
    token = generar_token()

    cache.set(
        f'password_reset:{email}',
        {
            'token': token,
            'user_type': user_type,
        },
        timeout=600
    )

    return Response(
        {
            'ok': True,
            'mensaje': 'Token generado correctamente',
            'data': {
                'email': email,
                'token': token,  # solo para pruebas por ahora
                'user_type': user_type,
                'expires_in_seconds': 600,
            }
        },
        status=status.HTTP_200_OK
    )


@api_view(['POST'])
def validate_reset_token(request):
    serializer = ValidateResetTokenSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(
            {
                'ok': False,
                'mensaje': 'Datos inválidos',
                'errores': serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    email = serializer.validated_data['email'].strip().lower()
    token = serializer.validated_data['token'].strip()

    reset_data = cache.get(f'password_reset:{email}')

    if not reset_data:
        return Response(
            {
                'ok': False,
                'mensaje': 'El token expiró o no existe'
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if reset_data['token'] != token:
        return Response(
            {
                'ok': False,
                'mensaje': 'Token inválido'
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    return Response(
        {
            'ok': True,
            'mensaje': 'Token válido',
            'data': {
                'email': email,
                'user_type': reset_data['user_type'],
            }
        },
        status=status.HTTP_200_OK
    )


@api_view(['POST'])
def reset_password(request):
    serializer = ResetPasswordSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(
            {
                'ok': False,
                'mensaje': 'Datos inválidos',
                'errores': serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    email = serializer.validated_data['email'].strip().lower()
    token = serializer.validated_data['token'].strip()
    new_password = serializer.validated_data['password']

    reset_data = cache.get(f'password_reset:{email}')

    if not reset_data:
        return Response(
            {
                'ok': False,
                'mensaje': 'El token expiró o no existe'
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if reset_data['token'] != token:
        return Response(
            {
                'ok': False,
                'mensaje': 'Token inválido'
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    user_type = reset_data['user_type']

    if user_type == 'cliente':
        user = Clientes.objects.filter(correo_electronico=email).first()
    else:
        user = Funcionarios.objects.filter(correo_electronico=email).first()

    if not user:
        return Response(
            {
                'ok': False,
                'mensaje': 'No se encontró la cuenta'
            },
            status=status.HTTP_404_NOT_FOUND
        )

    user.contrasena = new_password
    user.save(update_fields=['contrasena'])

    cache.delete(f'password_reset:{email}')

    return Response(
        {
            'ok': True,
            'mensaje': 'Contraseña actualizada correctamente',
            'data': {
                'email': email,
                'user_type': user_type,
            }
        },
        status=status.HTTP_200_OK
    )