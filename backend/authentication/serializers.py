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
    
# La misma vaina de arriaba pero para clientes
class ClienteLoginSerializer(serializers.Serializer):
    correo_electronico = serializers.EmailField()
    contrasena = serializers.CharField()