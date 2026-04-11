import { useEffect, useState } from "react";
import { Input, Button, Select } from "@/shared";
import Checkbox from "@/shared/components/Checkbox";
import { useNavigate } from "react-router-dom";


import guardar from "@/assets/svg/icono-guardar.svg";
import retroceder from "@/assets/svg/icono-retroceder.svg";


const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";


const permissionGroups = [
  {
    title: "Gestión De Usuarios",
    items: [
      "Crear Usuarios",
      "Visualizar Usuarios",
      "Actualizar Usuarios",
      "Listar Usuarios",
      "Activar/Desactivar Usuarios",
      "Generar Reporte De Usuarios",
    ],
  },
  {
    title: "Gestión De Proveedores",
    items: [
      "Crear Proveedor",
      "Visualizar Proveedor",
      "Actualizar Proveedor",
      "Listar Proveedor",
      "Activar/Desactivar Proveedor",
      "Generar Reporte De Proveedores",
    ],
  },
  {
    title: "Gestión De Compras",
    items: [
      "Crear Orden De Compra",
      "Visualizar Orden De Compra",
      "Actualizar Orden De Compra",
      "Listar Compras",
      "Cancelar Compras",
      "Generar Reporte De Compras",
    ],
  },
  {
    title: "Gestión De Inventario",
    items: [
      "Crear Producto",
      "Visualizar Producto",
      "Actualizar Producto",
      "Listar Producto",
      "Activar/Desactivar Producto",
      "Generar Reporte De Inventario",
    ],
  },
  {
    title: "Gestión De Ventas",
    items: [
      "Crear Venta",
      "Visualizar Venta",
      "Actualizar Venta",
      "Listar Ventas",
      "Anular Venta",
      "Generar Reporte De Venta",
    ],
  },
  {
    title: "Gestión De Reportes y Auditoría",
    items: [
      "Visualizar Reportes Generales",
      "Exportar Reportes (PDF/EXCEL)",
      "Ver Historial De Acciones (Auditoría)",
      "Ver Logs De Cambios",
      "Acceder a Métricas Del Sistema",
    ],
  },
];


const templateOptions = [
  { value: "administrador", label: "Administrador" },
  { value: "farmaceuta", label: "Farmaceuta" },
  { value: "personalizado", label: "Personalizado" },
];


const templateRoleNameMap = {
  administrador: "Administrador",
  farmaceuta: "Farmaceuta",
  personalizado: "",
};


const getAllPermissionKeys = () =>
  permissionGroups.flatMap((group) =>
    group.items.map((item) => `${group.title}|${item}`)
  );


const getTemplatePermissionMap = (template) => {
  const map = {};


  if (template === "administrador") {
    getAllPermissionKeys().forEach((key) => {
      map[key] = true;
    });
    return map;
  }


  if (template === "farmaceuta") {
    permissionGroups.forEach((group) => {
      group.items.forEach((item) => {
        const key = `${group.title}|${item}`;


        const isInventory = group.title === "Gestión De Inventario";
        const isSales = group.title === "Gestión De Ventas";
        const isGeneralReports =
          group.title === "Gestión De Reportes y Auditoría" &&
          item === "Visualizar Reportes Generales";


        map[key] = isInventory || isSales || isGeneralReports;
      });
    });


    return map;
  }


  return {};
};


export default function CreateRoleForm() {
  const navigate = useNavigate();


  const [form, setForm] = useState({
    template: "",
    roleName: "",
    description: "",
  });


  const [errors, setErrors] = useState({});
  const [permissionError, setPermissionError] = useState("");
  const [permissions, setPermissions] = useState({});
  const [existingRoles, setExistingRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState(null);


  const resetFormState = () => {
    setForm({
      template: "",
      roleName: "",
      description: "",
    });
    setPermissions({});
    setErrors({});
    setPermissionError("");
    setEditingRoleId(null);
  };


  const loadExistingRoles = async () => {
    try {
      setLoadingRoles(true);


      const response = await fetch(`${API_BASE_URL}/api/roles/manage/`);
      const data = await response.json();


      if (!response.ok || !data.ok) {
        console.error("No se pudieron cargar los roles");
        return;
      }


      setExistingRoles(data.data || []);
    } catch (error) {
      console.error("Error cargando roles existentes:", error);
    } finally {
      setLoadingRoles(false);
    }
  };


  useEffect(() => {
    loadExistingRoles();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;


    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));


    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };


  const handleTemplateChange = (e) => {
    const { value } = e.target;


    setForm((prev) => ({
      ...prev,
      template: value,
      roleName: templateRoleNameMap[value] || prev.roleName,
    }));


    setPermissions(getTemplatePermissionMap(value));
    setErrors((prev) => ({
      ...prev,
      template: "",
    }));
    setPermissionError("");
  };


  const togglePermission = (groupTitle, item) => {
    const key = `${groupTitle}|${item}`;


    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));


    setPermissionError("");
  };


  const toggleGroupPermissions = (groupTitle, items) => {
    const allChecked = items.every((item) => permissions[`${groupTitle}|${item}`]);


    setPermissions((prev) => {
      const next = { ...prev };


      items.forEach((item) => {
        next[`${groupTitle}|${item}`] = !allChecked;
      });


      return next;
    });


    setPermissionError("");
  };


  const handleEditRole = async (roleId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/roles/${roleId}/`);
      const data = await response.json();


      if (!response.ok || !data.ok) {
        alert(data.mensaje || "No se pudo cargar el rol");
        return;
      }


      const role = data.data;
      const nextPermissions = {};


      (role.permisos || []).forEach((permiso) => {
        const key = `${permiso.modulo}|${permiso.nombre_permiso}`;
        nextPermissions[key] = true;
      });


      setEditingRoleId(role.id_rol);
      setForm({
        template: "personalizado",
        roleName: role.nombre_rol || "",
        description: role.descripcion || "",
      });
      setPermissions(nextPermissions);
      setErrors({});
      setPermissionError("");


      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error cargando detalle del rol:", error);
      alert("No se pudo conectar con el backend");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    const fieldErrors = {};


    if (!form.template) {
      fieldErrors.template = "Debes seleccionar una plantilla";
    }


    if (!form.roleName.trim()) {
      fieldErrors.roleName = "El nombre del rol es obligatorio";
    }


    if (!form.description.trim()) {
      fieldErrors.description = "La descripción es obligatoria";
    }


    const selectedPermissions = Object.entries(permissions)
      .filter(([, checked]) => checked)
      .map(([key]) => {
        const [modulo, nombre_permiso] = key.split("|");
        return { modulo, nombre_permiso };
      });


    if (selectedPermissions.length === 0) {
      setPermissionError("Debes seleccionar al menos un permiso");
    } else {
      setPermissionError("");
    }


    if (
      Object.keys(fieldErrors).length > 0 ||
      selectedPermissions.length === 0
    ) {
      setErrors(fieldErrors);
      return;
    }


    setErrors({});


    const payload = {
      nombre_rol: form.roleName.trim(),
      descripcion: form.description.trim(),
      plantilla_base: form.template,
      permisos: selectedPermissions,
    };


    const isEditing = Boolean(editingRoleId);
    const endpoint = isEditing
      ? `${API_BASE_URL}/api/roles/${editingRoleId}/update/`
      : `${API_BASE_URL}/api/roles/create/`;


    const method = isEditing ? "PUT" : "POST";


    try {
      setIsSubmitting(true);


      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });


      const data = await response.json();


      if (!response.ok) {
        const detalleErrores = data.errores
          ? JSON.stringify(data.errores, null, 2)
          : data.error || data.mensaje;


        alert(detalleErrores || "No se pudo guardar el rol");
        return;
      }


      alert(
        data.mensaje ||
          (isEditing ? "Rol actualizado correctamente" : "Rol creado correctamente")
      );


      resetFormState();
      await loadExistingRoles();
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el backend");
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleDeleteRole = async (roleId, roleName, enUso) => {
    if (enUso) {
      alert("No puedes eliminar un rol que está asignado a funcionarios");
      return;
    }


    const confirmed = window.confirm(
      `¿Seguro que deseas eliminar el rol "${roleName}"?`
    );


    if (!confirmed) return;


    try {
      const response = await fetch(
        `${API_BASE_URL}/api/roles/${roleId}/delete/`,
        {
          method: "DELETE",
        }
      );


      const data = await response.json();


      if (!response.ok) {
        alert(data.mensaje || "No se pudo eliminar el rol");
        return;
      }


      if (editingRoleId === roleId) {
        resetFormState();
      }


      alert(data.mensaje || "Rol eliminado correctamente");
      await loadExistingRoles();
    } catch (error) {
      console.error("Error eliminando rol:", error);
      alert("No se pudo conectar con el backend");
    }
  };


  return (
    <div className="w-full min-h-[calc(100vh-12rem)] flex items-center justify-center py-10">
      <div className="mx-auto w-full max-w-7xl flex flex-col gap-8">
        <form noValidate onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10 items-start">
            <div className="flex flex-col gap-6 self-center">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-text-primary">
                  {editingRoleId ? "Editar rol y permisos" : "Crear rol y gestionar permisos"}
                </h3>


                <p className="text-sm text-text-muted mt-2">
                  {editingRoleId
                    ? "Modifica el rol seleccionado y ajusta sus permisos."
                    : "Selecciona una plantilla, ajusta los permisos y guarda el rol."}
                </p>


                <div className="mt-4 h-px bg-border w-full" />
              </div>


              <Select
                label="Plantilla base"
                name="template"
                value={form.template}
                onChange={handleTemplateChange}
                options={templateOptions}
                error={errors.template}
              />


              <Input
                label="Nombre del rol"
                name="roleName"
                type="text"
                placeholder="Ej: Administrador general"
                value={form.roleName}
                onChange={handleChange}
                error={errors.roleName}
              />


              <Input
                label="Descripción"
                name="description"
                type="text"
                placeholder="Describe brevemente la función del rol"
                value={form.description}
                onChange={handleChange}
                error={errors.description}
              />


              {permissionError && (
                <p className="text-sm text-red-600">{permissionError}</p>
              )}


              <div className="flex items-center justify-between gap-4 pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  className="flex items-center gap-2"
                  onClick={() => navigate(-1)}
                >
                  <img
                    src={retroceder}
                    alt="icono-retroceder"
                    className="w-5 h-5"
                  />
                  Retroceder
                </Button>


                <div className="flex items-center">
                  <Button
                    variant="primary"
                    size="sm"
                    type="submit"
                    className="flex items-center gap-2"
                    disabled={isSubmitting}
                  >
                    <img
                      src={guardar}
                      alt="icono-guardar"
                      className="w-5 h-5"
                    />
                    {isSubmitting
                      ? "Guardando..."
                      : editingRoleId
                        ? "Actualizar"
                        : "Guardar"}
                  </Button>
                </div>
              </div>
            </div>


            <div className="rounded-xl bg-[color:var(--color-secondary-100)] p-6 md:p-8 shadow-sm">
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-text-primary">
                  Permisos del rol
                </h4>
                <p className="text-sm text-text-muted mt-1">
                  La plantilla marca permisos por defecto, pero puedes ajustarlos.
                </p>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-8">
                {permissionGroups.map((group) => {
                  const allChecked = group.items.every(
                    (item) => permissions[`${group.title}|${item}`]
                  );


                  return (
                    <div key={group.title} className="flex flex-col gap-3">
                      <div className="pb-2 border-b border-[color:var(--color-basic-200)]">
                        <Checkbox
                          id={`group-${group.title}`}
                          name={`group-${group.title}`}
                          label={group.title}
                          checked={allChecked}
                          onChange={() =>
                            toggleGroupPermissions(group.title, group.items)
                          }
                          className="font-semibold text-text-primary"
                        />
                      </div>


                      <div className="flex flex-col gap-2">
                        {group.items.map((item) => {
                          const key = `${group.title}|${item}`;


                          return (
                            <Checkbox
                              key={key}
                              id={key}
                              name={key}
                              label={item}
                              checked={!!permissions[key]}
                              onChange={() => togglePermission(group.title, item)}
                              className="text-text-primary"
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </form>


        <div className="rounded-xl border border-[color:var(--color-basic-200)] bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-text-primary">
              Roles existentes
            </h4>
            <p className="text-sm text-text-muted mt-1">
              Aquí puedes revisar, editar y eliminar roles que no estén en uso.
            </p>
          </div>


          {loadingRoles ? (
            <p className="text-sm text-text-muted">Cargando roles...</p>
          ) : existingRoles.length === 0 ? (
            <p className="text-sm text-text-muted">No hay roles creados todavía.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {existingRoles.map((role) => (
                <div
                  key={role.id_rol}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-lg border border-[color:var(--color-basic-200)] p-4"
                >
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-text-primary">
                      {role.nombre_rol}
                    </p>
                    <p className="text-sm text-text-muted">
                      {role.descripcion}
                    </p>
                    <p className="text-xs text-text-muted">
                      Permisos: {role.total_permisos} | Funcionarios asignados: {role.total_funcionarios}
                    </p>
                  </div>


                  <div className="flex items-center gap-3">
                    <Button
                      variant="secondary"
                      size="sm"
                      type="button"
                      onClick={() => handleEditRole(role.id_rol)}
                    >
                      Editar
                    </Button>
                   
                    <Button
                      variant="secondary"
                      size="sm"
                      type="button"
                      disabled={role.en_uso}
                      onClick={() =>
                        handleDeleteRole(role.id_rol, role.nombre_rol, role.en_uso)
                      }
                    >
                      {role.en_uso ? "En uso" : "Eliminar"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
