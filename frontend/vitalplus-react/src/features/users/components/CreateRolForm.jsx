import { useMemo, useState } from "react";
import Input from "../../../shared/components/Input";
import Select from "../../../shared/components/Select";
import Button from "../../../shared/components/Button";

export default function CreateRoleForm() {
  // Opciones mock (desplegables)
  const userTypeOptions = useMemo(
    () => [
      { id: "admin", label: "Administrador" },
      { id: "farm", label: "Farmaceuta" },
    ],
    []
  );

  const groupOptions = useMemo(
    () => [
      { id: "g_admin", label: "Grupo Administrador" },
      { id: "g_farm", label: "Grupo Farmaceuta" },
      { id: "new", label: "Crear Nuevo Grupo +" },
    ],
    []
  );

  // Bloques de permisos (checklist)
  const permissionGroups = useMemo(
    () => [
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
    ],
    []
  );

  // Estado del formulario
  const [form, setForm] = useState({
    userType: "",
    groupType: "",
    userIdentifier: "",
  });

  // Estado de permisos (checklist)
  const [permissions, setPermissions] = useState({});

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const togglePermission = (groupTitle, item) => {
    const key = `${groupTitle}|${item}`;
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleBack = (e) => {
    e.preventDefault();
    console.log("Retroceder");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selected = Object.entries(permissions)
      .filter(([, v]) => v)
      .map(([k]) => k);

    console.log("Crear rol - datos:", form);
    console.log("Permisos seleccionados:", selected);
  };

  // Tokens (bordes y fondo)
  const outerBorder = "border-[color:var(--color-primary-700)]";
  const innerBorder = "border-[color:var(--color-primary-100)]";
  const permsBg = "bg-[color:var(--color-secondary-100)]";

  // Checkbox uniforme
  const checkboxClass = `
    w-5 h-5
    shrink-0
    appearance-none
    rounded-[4px]
    border-2 border-[color:var(--color-basic-300)]
    bg-white
    cursor-pointer
    checked:bg-[color:var(--color-primary-700)]
    checked:border-[color:var(--color-primary-700)]
    focus:outline-none
    focus:ring-2
    focus:ring-[color:var(--color-primary-100)]
  `;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="w-full bg-brand px-8">
        <div className="mx-auto max-w-7xl min-h-[88px] flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-sans text-brand-soft">
            Crear Rol-Gestionar Permisos
          </h2>

          <h1 className="text-2xl md:text-3xl font-sans font-bold tracking-wide text-brand-soft">
            Vital-Plus
          </h1>
        </div>
      </div>

      {/* Borde superior doble */}
      <div className="w-full">
        <div className="h-[10px] bg-[color:var(--color-primary-700)]" />
        <div className="h-[5px] bg-[color:var(--color-primary-100)]" />
      </div>

      {/* Body */}
      <div className="w-full px-6 py-10 bg-[color:var(--semantic-backgroond)]">
        {/* Borde externo */}
        <div
          className={`
            mx-auto
            max-w-7xl
            rounded-xl
            border-2
            ${outerBorder}
            p-2
          `}
        >
          {/* Borde interno */}
          <div
            className={`
              rounded-lg
              border-2
              ${innerBorder}
              p-8
            `}
          >
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10"
            >
              {/* Columna izquierda */}
              <div className="flex flex-col gap-8">
                {/* Usuario Individual */}
                <div className="text-center">
                  <h3 className="text-2xl font-sans text-text-primary">
                    Usuario Individual
                  </h3>
                  <div className="mt-2 h-[2px] bg-[color:var(--color-basic-200)] w-full" />
                </div>

                {/* Select tipo de usuario */}
                <Select
                  label="Tipo de usuario"
                  name="userType"
                  value={form.userType}
                  onChange={handleChange}
                  options={userTypeOptions}
                  placeholder="Seleccionar usuario"
                />

                {/* Input identificación */}
                <Input
                  label="Identificación"
                  name="userIdentifier"
                  placeholder="Ingrese identificación del usuario"
                  value={form.userIdentifier}
                  onChange={handleChange}
                />

                {/* Grupo Usuarios */}
                <div className="text-center mt-2">
                  <h3 className="text-2xl font-sans text-text-primary">
                    Grupo Usuarios
                  </h3>
                  <div className="mt-2 h-[2px] bg-[color:var(--color-basic-200)] w-full" />
                </div>

                {/* Select tipo grupo */}
                <Select
                  label="Tipo Grupo"
                  name="groupType"
                  value={form.groupType}
                  onChange={handleChange}
                  options={groupOptions}
                  placeholder="Tipo Grupo"
                />

                {/* Botones */}
                <div className="flex items-center justify-between mt-4">
                  <Button variant="secondary" size="md" onClick={handleBack}>
                    Retroceder
                  </Button>

                  <Button variant="primary" size="md" type="submit">
                    Guardar
                  </Button>
                </div>
              </div>

              {/* Columna derecha (permisos) */}
              <div className={`rounded-xl ${permsBg} p-8`}>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-10">
                  {permissionGroups.map((group) => (
                    <div key={group.title} className="flex flex-col gap-3">
                      {/* Título del módulo */}
                      <h4 className="grid grid-cols-[24px_1fr] items-start gap-3 text-lg font-sans text-text-primary leading-6 min-h-[56px]">
                        <input
                          type="checkbox"
                          className={checkboxClass}
                          checked={group.items.every(
                            (it) => permissions[`${group.title}|${it}`]
                          )}
                          onChange={() => {
                            const allChecked = group.items.every(
                              (it) => permissions[`${group.title}|${it}`]
                            );
                            setPermissions((prev) => {
                              const next = { ...prev };
                              group.items.forEach((it) => {
                                next[`${group.title}|${it}`] = !allChecked;
                              });
                              return next;
                            });
                          }}
                        />
                        {group.title}
                      </h4>

                      {/* Items del módulo */}
                      <div className="flex flex-col gap-2">
                        {group.items.map((item) => {
                          const key = `${group.title}|${item}`;
                          return (
                            <label
                              key={key}
                              className="grid grid-cols-[24px_1fr] items-start gap-3 text-[13px] text-text-primary leading-5"
                            >
                              <input
                                type="checkbox"
                                className={checkboxClass}
                                checked={!!permissions[key]}
                                onChange={() =>
                                  togglePermission(group.title, item)
                                }
                              />
                              {item}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Borde inferior doble */}
      <div className="w-full">
        <div className="h-[5px] bg-[color:var(--color-primary-100)]" />
        <div className="h-[10px] bg-[color:var(--color-primary-700)]" />
      </div>

      {/* Footer */}
      <div className="w-full bg-brand py-10" />
    </div>
  );
}