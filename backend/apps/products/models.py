from django.db import models

class Categorias(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nombre_categoria = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'categorias'

class Productos(models.Model):
    id_producto = models.AutoField(primary_key=True)
    nombre_producto = models.CharField(max_length=150, blank=True, null=True)
    id_laboratorio = models.ForeignKey('medicines.Laboratorios', models.DO_NOTHING, db_column='id_laboratorio', blank=True, null=True)
    id_presentacion = models.ForeignKey('medicines.Presentaciones', models.DO_NOTHING, db_column='id_presentacion', blank=True, null=True)
    imagen_url = models.CharField(max_length=255, blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    precio_descuento = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    stock = models.IntegerField(blank=True, null=True)
    descripcion = models.CharField(max_length=500, blank=True, null=True)
    fecha_vencimiento = models.DateField(blank=True, null=True)
    estado = models.CharField(max_length=8, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'productos'