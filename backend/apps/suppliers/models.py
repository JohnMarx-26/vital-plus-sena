from django.db import models


class TipoDocumento(models.Model):
    id_tipo_documento = models.AutoField(primary_key=True)
    tipo_documento = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "tipo_documentos"
        ordering = ["id_tipo_documento"]

    def __str__(self):
        return self.tipo_documento or f"TipoDocumento {self.id_tipo_documento}"


class Ciudad(models.Model):
    id_ciudad = models.AutoField(primary_key=True)
    nombre_ciudad = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "ciudades"
        ordering = ["id_ciudad"]

    def __str__(self):
        return self.nombre_ciudad or f"Ciudad {self.id_ciudad}"


class Direccion(models.Model):
    id_direccion = models.AutoField(primary_key=True)
    direccion = models.CharField(max_length=100, blank=True, null=True)
    ciudad_rel = models.ForeignKey(
        Ciudad,
        db_column="id_ciudad",
        on_delete=models.DO_NOTHING,
        blank=True,
        null=True,
        db_constraint=False,
        related_name="direcciones",
    )

    class Meta:
        managed = False
        db_table = "direcciones"
        ordering = ["id_direccion"]

    def __str__(self):
        return self.direccion or f"Direccion {self.id_direccion}"


class Proveedor(models.Model):
    id_proveedor = models.AutoField(primary_key=True)
    tipo_documento_rel = models.ForeignKey(
        TipoDocumento,
        db_column="id_tipo_documento",
        on_delete=models.DO_NOTHING,
        blank=True,
        null=True,
        db_constraint=False,
        related_name="proveedores",
    )
    n_documento = models.BigIntegerField(blank=True, null=True)
    nombre_proveedor = models.CharField(max_length=100, blank=True, null=True)
    razon_social = models.CharField(max_length=100, blank=True, null=True)
    nombres_contacto = models.CharField(max_length=50, blank=True, null=True)
    apellidos_contacto = models.CharField(max_length=50, blank=True, null=True)
    telefono_contacto = models.BigIntegerField(blank=True, null=True)
    correo_electronico = models.CharField(max_length=100, blank=True, null=True)
    direccion_rel = models.ForeignKey(
        Direccion,
        db_column="id_direccion",
        on_delete=models.DO_NOTHING,
        blank=True,
        null=True,
        db_constraint=False,
        related_name="proveedores",
    )
    estado = models.CharField(max_length=8, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "proveedores"
        ordering = ["id_proveedor"]

    def __str__(self):
        return self.nombre_proveedor or f"Proveedor {self.id_proveedor}"