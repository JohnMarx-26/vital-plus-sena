import { useEffect, useState } from "react";
import { Input, Button, Select } from "@/shared";
import Checkbox from "@/shared/components/Checkbox";
import { useNavigate } from "react-router-dom";

<<<<<<< HEAD
import guardar from "@/assets/svg/icono-guardar.svg";
import retroceder from "@/assets/svg/icono-retroceder.svg";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

=======

import guardar from "@/assets/svg/icono-guardar.svg";
import retroceder from "@/assets/svg/icono-retroceder.svg";


const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";


>>>>>>> origin/SNEIDER-PROVEEDORES
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

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
const templateOptions = [
  { value: "administrador", label: "Administrador" },
  { value: "farmaceuta", label: "Farmaceuta" },
  { value: "personalizado", label: "Personalizado" },
];

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
const templateRoleNameMap = {
  administrador: "Administrador",
  farmaceuta: "Farmaceuta",
  personalizado: "",
};

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
const getAllPermissionKeys = () =>
  permissionGroups.flatMap((group) =>
    group.items.map((item) => `${group.title}|${item}`)
  );

<<<<<<< HEAD
const getTemplatePermissionMap = (template) => {
  const map = {};

=======

const getTemplatePermissionMap = (template) => {
  const map = {};


>>>>>>> origin/SNEIDER-PROVEEDORES
  if (template === "administrador") {
    getAllPermissionKeys().forEach((key) => {
      map[key] = true;
    });
    return map;
  }

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
  if (template === "farmaceuta") {
    permissionGroups.forEach((group) => {
      group.items.forEach((item) => {
        const key = `${group.title}|${item}`;

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
        const isInventory = group.title === "Gestión De Inventario";
        const isSales = group.title === "Gestión De Ventas";
        const isGeneralReports =
          group.title === "Gestión De Reportes y Auditoría" &&
          item === "Visualizar Reportes Generales";

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
        map[key] = isInventory || isSales || isGeneralReports;
      });
    });

<<<<<<< HEAD
    return map;
  }

  return {};
};

export default function CreateRoleForm() {
  const navigate = useNavigate();

=======

    return map;
  }


  return {};
};


export default function CreateRoleForm() {
  const navigate = useNavigate();


>>>>>>> origin/SNEIDER-PROVEEDORES
  const [form, setForm] = useState({
    template: "",
    roleName: "",
    description: "",
  });

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
  const [errors, setErrors] = useState({});
  const [permissionError, setPermissionError] = useState("");
  const [permissions, setPermissions] = useState({});
  const [existingRoles, setExistingRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState(null);

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
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

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
  const loadExistingRoles = async () => {
    try {
      setLoadingRoles(true);

<<<<<<< HEAD
      const response = await fetch(`${API_BASE_URL}/api/roles/manage/`);
      const data = await response.json();

=======

      const response = await fetch(`${API_BASE_URL}/api/roles/manage/`);
      const data = await response.json();


>>>>>>> origin/SNEIDER-PROVEEDORES
      if (!response.ok || !data.ok) {
        console.error("No se pudieron cargar los roles");
        return;
      }

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
      setExistingRoles(data.data || []);
    } catch (error) {
      console.error("Error cargando roles existentes:", error);
    } finally {
      setLoadingRoles(false);
    }
  };

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
  useEffect(() => {
    loadExistingRoles();
  }, []);

<<<<<<< HEAD
  const handleChange = (e) => {
    const { name, value } = e.target;

=======

  const handleChange = (e) => {
    const { name, value } = e.target;


>>>>>>> origin/SNEIDER-PROVEEDORES
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

<<<<<<< HEAD
  const handleTemplateChange = (e) => {
    const { value } = e.target;

=======

  const handleTemplateChange = (e) => {
    const { value } = e.target;


>>>>>>> origin/SNEIDER-PROVEEDORES
    setForm((prev) => ({
      ...prev,
      template: value,
      roleName: templateRoleNameMap[value] || prev.roleName,
    }));

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
    setPermissions(getTemplatePermissionMap(value));
    setErrors((prev) => ({
      ...prev,
      template: "",
    }));
    setPermissionError("");
  };

<<<<<<< HEAD
  const togglePermission = (groupTitle, item) => {
    const key = `${groupTitle}|${item}`;

=======

  const togglePermission = (groupTitle, item) => {
    const key = `${groupTitle}|${item}`;


>>>>>>> origin/SNEIDER-PROVEEDORES
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

<<<<<<< HEAD
    setPermissionError("");
  };

  const toggleGroupPermissions = (groupTitle, items) => {
    const allChecked = items.every((item) => permissions[`${groupTitle}|${item}`]);

    setPermissions((prev) => {
      const next = { ...prev };

=======

    setPermissionError("");
  };


  const toggleGroupPermissions = (groupTitle, items) => {
    const allChecked = items.every((item) => permissions[`${groupTitle}|${item}`]);


    setPermissions((prev) => {
      const next = { ...prev };


>>>>>>> origin/SNEIDER-PROVEEDORES
      items.forEach((item) => {
        next[`${groupTitle}|${item}`] = !allChecked;
      });

<<<<<<< HEAD
      return next;
    });

    setPermissionError("");
  };

=======

      return next;
    });


    setPermissionError("");
  };


>>>>>>> origin/SNEIDER-PROVEEDORES
  const handleEditRole = async (roleId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/roles/${roleId}/`);
      const data = await response.json();

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
      if (!response.ok || !data.ok) {
        alert(data.mensaje || "No se pudo cargar el rol");
        return;
      }

<<<<<<< HEAD
      const role = data.data;
      const nextPermissions = {};

=======

      const role = data.data;
      const nextPermissions = {};


>>>>>>> origin/SNEIDER-PROVEEDORES
      (role.permisos || []).forEach((permiso) => {
        const key = `${permiso.modulo}|${permiso.nombre_permiso}`;
        nextPermissions[key] = true;
      });

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
      setEditingRoleId(role.id_rol);
      setForm({
        template: "personalizado",
        roleName: role.nombre_rol || "",
        description: role.descripcion || "",
      });
      setPermissions(nextPermissions);
      setErrors({});
      setPermissionError("");

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error cargando detalle del rol:", error);
      alert("No se pudo conectar con el backend");
    }
  };

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldErrors = {};

=======

  const handleSubmit = async (e) => {
    e.preventDefault();


    const fieldErrors = {};


>>>>>>> origin/SNEIDER-PROVEEDORES
    if (!form.template) {
      fieldErrors.template = "Debes seleccionar una plantilla";
    }

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
    if (!form.roleName.trim()) {
      fieldErrors.roleName = "El nombre del rol es obligatorio";
    }

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
    if (!form.description.trim()) {
      fieldErrors.description = "La descripción es obligatoria";
    }

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
    const selectedPermissions = Object.entries(permissions)
      .filter(([, checked]) => checked)
      .map(([key]) => {
        const [modulo, nombre_permiso] = key.split("|");
        return { modulo, nombre_permiso };
      });

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
    if (selectedPermissions.length === 0) {
      setPermissionError("Debes seleccionar al menos un permiso");
    } else {
      setPermissionError("");
    }

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
    if (
      Object.keys(fieldErrors).length > 0 ||
      selectedPermissions.length === 0
    ) {
      setErrors(fieldErrors);
      return;
    }

<<<<<<< HEAD
    setErrors({});

=======

    setErrors({});


>>>>>>> origin/SNEIDER-PROVEEDORES
    const payload = {
      nombre_rol: form.roleName.trim(),
      descripcion: form.description.trim(),
      plantilla_base: form.template,
      permisos: selectedPermissions,
    };

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
    const isEditing = Boolean(editingRoleId);
    const endpoint = isEditing
      ? `${API_BASE_URL}/api/roles/${editingRoleId}/update/`
      : `${API_BASE_URL}/api/roles/create/`;

<<<<<<< HEAD
    const method = isEditing ? "PUT" : "POST";

    try {
      setIsSubmitting(true);

=======

    const method = isEditing ? "PUT" : "POST";


    try {
      setIsSubmitting(true);


>>>>>>> origin/SNEIDER-PROVEEDORES
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

<<<<<<< HEAD
      const data = await response.json();

=======

      const data = await response.json();


>>>>>>> origin/SNEIDER-PROVEEDORES
      if (!response.ok) {
        const detalleErrores = data.errores
          ? JSON.stringify(data.errores, null, 2)
          : data.error || data.mensaje;

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
        alert(detalleErrores || "No se pudo guardar el rol");
        return;
      }

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
      alert(
        data.mensaje ||
          (isEditing ? "Rol actualizado correctamente" : "Rol creado correctamente")
      );

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
      resetFormState();
      await loadExistingRoles();
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el backend");
    } finally {
      setIsSubmitting(false);
    }
  };

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
  const handleDeleteRole = async (roleId, roleName, enUso) => {
    if (enUso) {
      alert("No puedes eliminar un rol que está asignado a funcionarios");
      return;
    }

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
    const confirmed = window.confirm(
      `¿Seguro que deseas eliminar el rol "${roleName}"?`
    );

<<<<<<< HEAD
    if (!confirmed) return;

=======

    if (!confirmed) return;


>>>>>>> origin/SNEIDER-PROVEEDORES
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/roles/${roleId}/delete/`,
        {
          method: "DELETE",
        }
      );

<<<<<<< HEAD
      const data = await response.json();

=======

      const data = await response.json();


>>>>>>> origin/SNEIDER-PROVEEDORES
      if (!response.ok) {
        alert(data.mensaje || "No se pudo eliminar el rol");
        return;
      }

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
      if (editingRoleId === roleId) {
        resetFormState();
      }

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
      alert(data.mensaje || "Rol eliminado correctamente");
      await loadExistingRoles();
    } catch (error) {
      console.error("Error eliminando rol:", error);
      alert("No se pudo conectar con el backend");
    }
  };

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
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

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
                <p className="text-sm text-text-muted mt-2">
                  {editingRoleId
                    ? "Modifica el rol seleccionado y ajusta sus permisos."
                    : "Selecciona una plantilla, ajusta los permisos y guarda el rol."}
                </p>

<<<<<<< HEAD
                <div className="mt-4 h-px bg-border w-full" />
              </div>

=======

                <div className="mt-4 h-px bg-border w-full" />
              </div>


>>>>>>> origin/SNEIDER-PROVEEDORES
              <Select
                label="Plantilla base"
                name="template"
                value={form.template}
                onChange={handleTemplateChange}
                options={templateOptions}
                error={errors.template}
              />

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
              <Input
                label="Nombre del rol"
                name="roleName"
                type="text"
                placeholder="Ej: Administrador general"
                value={form.roleName}
                onChange={handleChange}
                error={errors.roleName}
              />

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
              <Input
                label="Descripción"
                name="description"
                type="text"
                placeholder="Describe brevemente la función del rol"
                value={form.description}
                onChange={handleChange}
                error={errors.description}
              />

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
              {permissionError && (
                <p className="text-sm text-red-600">{permissionError}</p>
              )}

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
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

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
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

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
            <div className="rounded-xl bg-[color:var(--color-secondary-100)] p-6 md:p-8 shadow-sm">
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-text-primary">
                  Permisos del rol
                </h4>
                <p className="text-sm text-text-muted mt-1">
                  La plantilla marca permisos por defecto, pero puedes ajustarlos.
                </p>
              </div>

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-8">
                {permissionGroups.map((group) => {
                  const allChecked = group.items.every(
                    (item) => permissions[`${group.title}|${item}`]
                  );

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
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

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
                      <div className="flex flex-col gap-2">
                        {group.items.map((item) => {
                          const key = `${group.title}|${item}`;

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
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

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
        <div className="rounded-xl border border-[color:var(--color-basic-200)] bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-text-primary">
              Roles existentes
            </h4>
            <p className="text-sm text-text-muted mt-1">
              Aquí puedes revisar, editar y eliminar roles que no estén en uso.
            </p>
          </div>

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
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

<<<<<<< HEAD
=======

>>>>>>> origin/SNEIDER-PROVEEDORES
                  <div className="flex items-center gap-3">
                    <Button
                      variant="secondary"
                      size="sm"
                      type="button"
                      onClick={() => handleEditRole(role.id_rol)}
                    >
                      Editar
                    </Button>
<<<<<<< HEAD
                    
=======
                   
>>>>>>> origin/SNEIDER-PROVEEDORES
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
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/SNEIDER-PROVEEDORES
