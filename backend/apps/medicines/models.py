from django.db import models

#============ FORMA FARMACEUTICA ================#
class FormasFarmaceuticas(models.Model):
    id_forma_farmaceutica = models.AutoField(primary_key=True)
    nombre_forma = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'formas_farmaceuticas'

#============ PRESENTACIONES ================#
class Presentaciones(models.Model):
    id_presentacion = models.AutoField(primary_key=True)
    nombre_presentacion = models.CharField(max_length=50, blank=True, null=True)
    id_forma_farmaceutica = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'presentaciones'

#============ VIA ADMINISTRACION ================#
class ViaAdministracion(models.Model):
    id_via_administracion = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'via_administracion'

#============ PROVEEDORES ================#
class Proveedores(models.Model):
    id_proveedor = models.AutoField(primary_key=True)
    nombre_proveedor = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'proveedores'

#============ LABORATORIOS ================#
class Laboratorios(models.Model):
    id_laboratorio = models.AutoField(primary_key=True)
    nombre_laboratorio = models.CharField(max_length=50, blank=True, null=True)
    id_proveedor = models.ForeignKey(Proveedores, models.DO_NOTHING, db_column='id_proveedor', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'laboratorios'

#============ CATEGORIAS PARA CARDS ================#
class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nombre_categoria = models.CharField(max_length=100)

    class Meta:
        db_table = 'categorias'  

    def __str__(self):
        return self.nombre_categoria

class Medicamentos(models.Model):
    id_medicamento = models.AutoField(primary_key=True)
    nombre_medicamento = models.CharField(max_length=100, blank=True, null=True)
    id_forma_farmaceutica = models.ForeignKey(FormasFarmaceuticas, models.DO_NOTHING, db_column='id_forma_farmaceutica', blank=True, null=True)
    id_presentacion = models.ForeignKey(Presentaciones, models.DO_NOTHING, db_column='id_presentacion', blank=True, null=True)
    id_via_administracion = models.ForeignKey(ViaAdministracion, models.DO_NOTHING, db_column='id_via_administracion', blank=True, null=True)
    id_laboratorio = models.ForeignKey(Laboratorios, models.DO_NOTHING, db_column='id_laboratorio', blank=True, null=True)
    id_categoria = models.ForeignKey(Categoria, models.DO_NOTHING, db_column='id_categoria', blank=True, null=True)
    concentracion = models.CharField(max_length=50, blank=True, null=True)
    requiere_formula = models.CharField(max_length=2, blank=True, null=True)
    descripcion = models.CharField(max_length=255, blank=True, null=True)
    estado_medicamento = models.CharField(max_length=10, blank=True, null=True)
    imagen_url = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'medicamentos'

#============ INVENTARIO ================#
class Inventario(models.Model):
    id_inventario = models.AutoField(primary_key=True)
    id_medicamento = models.ForeignKey(Medicamentos, models.DO_NOTHING, db_column='id_medicamento', blank=True, null=True, related_name='inventario')
    lote = models.IntegerField(blank=True, null=True)
    fecha_de_fabricacion = models.DateField(blank=True, null=True)
    fecha_de_vencimiento = models.DateField(blank=True, null=True)
    stock = models.IntegerField(blank=True, null=True)
    precio_compra = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    precio_venta = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    precio_descuento = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    id_proveedor = models.ForeignKey(Proveedores, models.DO_NOTHING, db_column='id_proveedor', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'inventario'

