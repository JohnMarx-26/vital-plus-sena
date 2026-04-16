# apps/ventas/models.py
from django.db import models


class Banco(models.Model):
    id_banco = models.AutoField(primary_key=True)
    nombre_banco = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = "bancos"

    def __str__(self):
        return self.nombre_banco


class MetodoPago(models.Model):
    id_metodo_pago = models.AutoField(primary_key=True)
    nombre_metodo = models.CharField(max_length=50)
    id_banco = models.ForeignKey(
        Banco, on_delete=models.PROTECT,
        null=True, blank=True, db_column="id_banco"
    )

    class Meta:
        managed = False
        db_table = "metodo_pago"

    def __str__(self):
        return self.nombre_metodo


class Venta(models.Model):
    id_venta = models.AutoField(primary_key=True)
    fecha_venta = models.DateTimeField(auto_now_add=True)
    id_funcionario = models.IntegerField()
    id_cliente = models.IntegerField()          # entero simple, sin FK por ahora
    id_detalle = models.IntegerField(null=True, blank=True)  # se llena después
    total = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        managed = False
        db_table = "ventas"

    def __str__(self):
        return f"Venta #{self.id_venta}"


class DetalleVenta(models.Model):
    id_detalle = models.AutoField(primary_key=True)
    id_inventario = models.IntegerField()
    cantidad = models.IntegerField()
    id_metodo_pago = models.IntegerField()
    iva = models.IntegerField(default=19)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        managed = False
        db_table = "detalle_ventas"


class Factura(models.Model):
    id_factura = models.AutoField(primary_key=True)
    id_venta = models.IntegerField()
    numero_factura = models.IntegerField()       # autoincremental en la BD
    fecha_emision = models.DateTimeField(auto_now_add=True)
    url_factura = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        managed = False
        db_table = "facturas"

class Cliente(models.Model):
    id_cliente         = models.AutoField(primary_key=True)
    id_tipo_documento  = models.IntegerField()
    n_documento        = models.IntegerField(unique=True)
    nombres_cliente    = models.CharField(max_length=50, null=True, blank=True)
    apellidos_cliente  = models.CharField(max_length=50, null=True, blank=True)
    correo_electronico = models.CharField(max_length=100, null=True, blank=True)
    numero_telefonico  = models.BigIntegerField(null=True, blank=True)
    id_direccion       = models.IntegerField(null=True, blank=True)
    contrasena         = models.CharField(max_length=512)
    fecha_registro     = models.DateTimeField(auto_now_add=True, null=True)
    estado_cuenta      = models.CharField(max_length=10, default='activo')
    foto_url           = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        managed  = False
        db_table = "clientes"

    def __str__(self):
        return f"{self.nombres_cliente} {self.apellidos_cliente}"