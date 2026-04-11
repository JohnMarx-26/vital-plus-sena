from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Banco
from .serializers import BancoSerializer


@api_view(["GET"])
def lista_bancos(request):
    bancos = Banco.objects.all()
    serializer = BancoSerializer(bancos, many=True)
    return Response(serializer.data)