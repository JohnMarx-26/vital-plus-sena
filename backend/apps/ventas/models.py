from django.db import models

class Venta(models.Model):

    class TipoPago(models.TextChoices):
        EFECTIVO = "Efectivo", "Efectivo"
        TARJETA_DEBITO = "Tarjeta débito", "Tarjeta débito"
        TARJETA_CREDITO = "Tarjeta crédito", "Tarjeta crédito"
        TRANSFERENCIA = "Transferencia", "Transferencia"

    class Estado(models.TextChoices):
        COMPLETADA = "Completada", "Completada"
        ANULADA = "Anulada", "Anulada"
        PENDIENTE = "Pendiente", "Pendiente"

    numero_factura = models.CharField(max_length=20, unique=True)
    fecha_hora_venta = models.DateTimeField(auto_now_add=True)
    id_cliente = models.ForeignKey("auth.User", on_delete=models.PROTECT, related_name="compras")
    id_farmaceuta = models.ForeignKey("auth.User", on_delete=models.PROTECT, related_name="ventas")
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    iva = models.DecimalField(max_digits=10, decimal_places=2)
    descuento = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    tipo_pago = models.CharField(max_length=20, choices=TipoPago.choices)
    estado = models.CharField(max_length=15, choices=Estado.choices, default=Estado.PENDIENTE)

    class Meta:
        managed = False
        db_table = "ventas"
        verbose_name = "Venta"
        verbose_name_plural = "Ventas"

    def __str__(self):
        return self.numero_factura


class Anulacion(models.Model):
    id_venta = models.OneToOneField(Venta, on_delete=models.PROTECT, related_name="anulacion")
    observaciones = models.TextField()
    fecha_hora_anulacion = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = "anulaciones"
        verbose_name = "Anulación"
        verbose_name_plural = "Anulaciones"

    def __str__(self):
        return f"Anulación de {self.id_venta.numero_factura}"


class Carrito(models.Model):

    class Estado(models.TextChoices):
        ACTIVO = "Activo", "Activo"
        CONFIRMADO = "Confirmado", "Confirmado"
        CANCELADO = "Cancelado", "Cancelado"

    numero_factura = models.CharField(max_length=20, unique=True)
    id_medicamento = models.ForeignKey("medicines.Medicamentos", on_delete=models.PROTECT)
    cantidad = models.IntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=15, choices=Estado.choices, default=Estado.ACTIVO)

    class Meta:
        managed = False
        db_table = "carritos"
        verbose_name = "Carrito"
        verbose_name_plural = "Carritos"

    def __str__(self):
        return self.numero_factura


class Banco(models.Model):
    id_banco = models.AutoField(primary_key=True)
    nombre_banco = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = "bancos"
        verbose_name = "Banco"
        verbose_name_plural = "Bancos"

    def __str__(self):
        return self.nombre_banco


class MetodoPago(models.Model):
    id_metodo_pago = models.AutoField(primary_key=True)
    nombre_metodo = models.CharField(max_length=50)
    id_banco = models.ForeignKey(Banco, on_delete=models.PROTECT, null=True, blank=True, db_column="id_banco")

    class Meta:
        managed = False
        db_table = "metodo_pago"
        verbose_name = "Método de pago"
        verbose_name_plural = "Métodos de pago"

    def __str__(self):
        return self.nombre_metodo