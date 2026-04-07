from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Roles, Funcionarios, Clientes
from .serializers import RolesSerializers, FuncionarioLoginSerializer , ClienteLoginSerializer

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
                'mensaje' : 'Datos inválidos',
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