from django.db import models


class Banco(models.Model):
    id_banco = models.AutoField(primary_key=True)
    nombre_banco = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "bancos"
        ordering = ["id_banco"]

    def __str__(self):
        return self.nombre_banco or f"Banco {self.id_banco}"