from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Roles
from .serializers import RolesSerializers

# Aqui dice que esta vista solo responde peticiones GET
@api_view(['GET'])
def listar_roles(request):
    # Trae los registros de la tabla roles
    roles = Roles.objects.all()
    # Convierte los registros a un formato que se pueda devolver como JSON
    serializer = RolesSerializers(roles, many=True)
    # Devuelve la respuesta al frontend o al navegador
    return Response(serializer.data)