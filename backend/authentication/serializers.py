from rest_framework import serializers
from .models import Roles

# En resumen, Un serializer convierte datos de un modelo a un JSON 

class RolesSerializers(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = '__all__'