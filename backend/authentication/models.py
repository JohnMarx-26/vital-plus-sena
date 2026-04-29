# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

#Models.py, este archivo es importante ya que python necesita una froma de representar el sql dentro del codigo,
#Este models sirve como un traductor, ya que la base real reside en MySQL, ya que trabajamos con una base existente usando inspectdb, managed=False,
#Eso implica que, python las usa pero no intenta administrarlas ni crearlas (Este archivo le enseña a Django como leerlas y usarlas)

class Clientes(models.Model):
    id_cliente = models.AutoField(primary_key=True)
    id_tipo_documento = models.IntegerField(blank=True, null=True)
    n_documento = models.IntegerField(blank=True, null=True)
    nombres_cliente = models.CharField(max_length=50, blank=True, null=True)
    apellidos_cliente = models.CharField(max_length=50, blank=True, null=True)
    correo_electronico = models.CharField(unique=True, max_length=100, blank=True, null=True)
    numero_telefonico = models.BigIntegerField(blank=True, null=True)
    id_direccion = models.IntegerField(blank=True, null=True)
    contrasena = models.CharField(max_length=100, blank=True, null=True)
    fecha_registro = models.DateTimeField(blank=True, null=True)
    estado_cuenta = models.CharField(max_length=8, blank=True, null=True)
    foto_url = models.CharField(db_column='Foto_url', max_length=255, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'clientes'


class Funcionarios(models.Model):
    id_funcionario = models.AutoField(primary_key=True)
    id_tipo_documento = models.IntegerField(blank=True, null=True)
    n_documento = models.IntegerField(blank=True, null=True)
    nombres_funcionario = models.CharField(max_length=50, blank=True, null=True)
    apellidos_funcionario = models.CharField(max_length=50, blank=True, null=True)
    correo_electronico = models.CharField(unique=True, max_length=100, blank=True, null=True)
    numero_telefonico = models.BigIntegerField(blank=True, null=True)
    id_direccion = models.IntegerField(blank=True, null=True)
    contrasena = models.CharField(max_length=100, blank=True, null=True)
    fecha_registro = models.DateTimeField(blank=True, null=True)
    id_rol = models.IntegerField(blank=True, null=True)
    estado_cuenta = models.CharField(max_length=8, blank=True, null=True)
    foto_url = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'funcionarios'


class Roles(models.Model):
    id_rol = models.AutoField(primary_key=True)
    nombre_rol = models.CharField(max_length=30)
    descripcion = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'roles'


class HistorialSesionesClientes(models.Model):
    id_historial_cliente = models.AutoField(primary_key=True)
    id_cliente = models.IntegerField(blank=True, null=True)
    fecha_inicio = models.DateTimeField(blank=True, null=True)
    fecha_fin = models.DateTimeField(blank=True, null=True)
    ip_origen = models.CharField(max_length=45, blank=True, null=True)
    ultimo_acceso = models.DateTimeField(blank=True, null=True)
    estado_sesion = models.CharField(max_length=8, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'historial_sesiones_clientes'


class HistorialSesionesFuncionarios(models.Model):
    id_historial = models.AutoField(primary_key=True)
    id_funcionario = models.IntegerField(blank=True, null=True)
    fecha_inicio = models.DateTimeField(blank=True, null=True)
    fecha_fin = models.DateTimeField(blank=True, null=True)
    ip_origen = models.CharField(max_length=45, blank=True, null=True)
    ultimo_acceso = models.DateTimeField(blank=True, null=True)
    estado_sesion = models.CharField(max_length=8, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'historial_sesiones_funcionarios'


class TipoDocumentos(models.Model):
    id_tipo_documento = models.AutoField(primary_key=True)
    tipo_documento = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tipo_documentos'


class Direcciones(models.Model):
    id_direccion = models.AutoField(primary_key=True)
    direccion = models.CharField(max_length=100, blank=True, null=True)
    id_ciudad = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'direcciones'


class Ciudades(models.Model):
    id_ciudad = models.AutoField(primary_key=True)
    nombre_ciudad = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ciudades'

class Permisos(models.Model):
    id_permiso = models.AutoField(primary_key=True)
    nombre_permiso = models.CharField(max_length=100)
    modulo = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'permisos'


class RolesPermisos(models.Model):
    id_rol_permiso = models.AutoField(primary_key=True)
    id_rol = models.IntegerField()
    id_permiso = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'roles_permisos'
        unique_together = (('id_rol', 'id_permiso'),)