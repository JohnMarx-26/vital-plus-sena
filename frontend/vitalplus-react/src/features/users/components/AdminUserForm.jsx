import { Button, Select, Input } from "@/shared";
import { useEffect, useState } from "react";
import { AvatarUploader } from "@/features/users";
import { userSchema } from "../Schemas/userSchemas";
import { useNavigate } from "react-router-dom";
import { getSelectActive } from "../services/selectActive";

import guardar from "@/assets/svg/icono-guardar.svg";
import retroceder from "@/assets/svg/icono-retroceder.svg";

/*
Se crea una arrow function para los botones del formulario
a esta función se le realiza un callback cuando se ejecuta
el FormLayout, dentro de esta función está la lógica de los botones
y sus estilos
*/

const Botones = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full justify-between px-10">
      {/* Botón Retroceder */}
      <Button
        variant="secondary"
        size="sm"
        type="button"
        onClick={() => navigate(-1)}
        className="flex items-center gap-2"
      >
        <img src={retroceder} alt="icono-retroceder" className="w-5 h-5" />
        Retroceder
      </Button>
    </div>
  );
};

const documentTypeOptions = [
  { value: "1", label: "Cédula de ciudadanía" },
  { value: "2", label: "Cédula de Extranjería" },
  { value: "3", label: "Pasaporte" },
  { value: "4", label: "NIT" },
  { value: "5", label: "PEP" },
  { value: "6", label: "PPT" },
  { value: "7", label: "Tarjeta de Identidad" },
];

const cityOptions = [
  { value: "1", label: "Pereira" },
  { value: "2", label: "Manizales" },
  { value: "3", label: "Medellin" },
  { value: "4", label: "Bogotá" },
  { value: "5", label: "Barranquilla" },
  { value: "6", label: "Bucaramanga" },
  { value: "7", label: "Cali" },
  { value: "8", label: "Ibagué" },
  { value: "9", label: "Armenia" },
];

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export default function AdminUserForm({
  userId = null,
  initialData = null,
  submitLabel = "Guardar",
}) {
  const navigate = useNavigate();
  const [roleOptions, setRoleOptions] = useState([]);
  const [selectActive, setSelectActive] = useState([]);

  const [formData, setFormData] = useState({
    documentType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    documentNumber: "",
    city: "",
    address: "",
    role: "",
    active: "activo",
    password: "",
    confirmPassword: "",
    avatarUrl: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/roles/`);
        const data = await response.json();

        const roles = Array.isArray(data) ? data : data?.data || [];

        const formattedRoles = roles.map((role) => ({
          value: String(role.id_rol),
          label: role.nombre_rol,
        }));

        setRoleOptions(formattedRoles);
      } catch (error) {
        console.error("Error cargando roles:", error);
      }
    };

    loadRoles();
  }, []);

  // Carga las opciones del select activo/inactivo
  useEffect(() => {
    getSelectActive()
      .then(setSelectActive)
      .catch((error) => {
        console.error("Error cargando estado activo/inactivo:", error);
      });
  }, []);

  // Llena el formulario cuando llega la información del usuario a editar
  useEffect(() => {
    if (initialData) {
      setFormData({
        documentType: initialData.documentType || "",
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        documentNumber: initialData.documentNumber || "",
        city: initialData.city || "",
        address: initialData.address || "",
        role: initialData.role || "",
        active: initialData.active || "activo",
        password: "",
        confirmPassword: "",
        avatarUrl: initialData.avatarUrl || null,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleAvatarChange = (_, previewUrl) => {
    setFormData((prev) => ({
      ...prev,
      avatarUrl: previewUrl || null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldErrors = {};

    // En creación usa el schema completo
    if (!userId) {
      const result = userSchema.safeParse(formData);

      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const field = issue.path[0];
          fieldErrors[field] = issue.message;
        });
      }
    } else {
      // Validaciones básicas para edición
      if (!formData.documentType) {
        fieldErrors.documentType = "Debe seleccionar un tipo de documento";
      }
      if (!formData.firstName.trim()) {
        fieldErrors.firstName = "El nombre es obligatorio";
      }
      if (!formData.lastName.trim()) {
        fieldErrors.lastName = "El apellido es obligatorio";
      }
      if (!formData.email.trim()) {
        fieldErrors.email = "El correo es obligatorio";
      }
      if (!formData.phone.trim()) {
        fieldErrors.phone = "El teléfono es obligatorio";
      }
      if (!formData.documentNumber.trim()) {
        fieldErrors.documentNumber = "El número de documento es obligatorio";
      }
      if (!formData.city) {
        fieldErrors.city = "Debe seleccionar una ciudad";
      }
      if (!formData.address.trim()) {
        fieldErrors.address = "La dirección es obligatoria";
      }
    }

    if (!formData.role) {
      fieldErrors.role = "Debe seleccionar un rol";
    }

    if (!formData.active) {
      fieldErrors.active = "Debe seleccionar un estado";
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    // Payload para crear
    let payload = {
      documentType: parseInt(formData.documentType, 10),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      documentNumber: formData.documentNumber.trim(),
      city: parseInt(formData.city, 10),
      address: formData.address.trim(),
      role: parseInt(formData.role, 10),
      active: formData.active,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      avatarUrl: formData.avatarUrl,
    };

    // En edición no se envían contraseñas
    if (userId) {
      payload = {
        documentType: parseInt(formData.documentType, 10),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        documentNumber: formData.documentNumber.trim(),
        city: parseInt(formData.city, 10),
        address: formData.address.trim(),
        role: parseInt(formData.role, 10),
        active: formData.active,
        avatarUrl: formData.avatarUrl,
      };
    }

    console.log("Payload funcionario:", payload);

    try {
      const url = userId
        ? `${API_BASE_URL}/api/funcionarios/${userId}/update/`
        : `${API_BASE_URL}/api/auth/funcionarios/register/`;

      const method = userId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Respuesta backend funcionario:", data);

      if (!response.ok) {
        const detalleErrores = data.errores
          ? JSON.stringify(data.errores, null, 2)
          : data.error || data.mensaje;

        alert(detalleErrores || "No se pudo procesar el funcionario");
        return;
      }

      alert(
        data.mensaje ||
          (userId
            ? "Funcionario actualizado correctamente"
            : "Funcionario registrado correctamente")
      );

      if (userId) {
        navigate(-1);
        return;
      }

      setFormData({
        documentType: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        documentNumber: "",
        city: "",
        address: "",
        role: "",
        active: "activo",
        password: "",
        confirmPassword: "",
        avatarUrl: null,
      });
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el backend");
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex w-full justify-between px-10">
        <Botones />
      </div>

      {/* CARGAR IMAGEN */}
      <div className="flex h-36 justify-center gap-8">
        <AvatarUploader label="Foto de perfil" onChange={handleAvatarChange} />
      </div>

      {/* CONTENEDOR FORMULARIO */}
      <div className="flex w-1200px h-800px justify-center items-center mt-20 gap-6 ">
        {/* FORMULARIO */}
        <form
          noValidate
          onSubmit={handleSubmit}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 "
          id="adminUserForm"
        >
          <Select
            label="Tipo de documento"
            name="documentType"
            options={documentTypeOptions}
            value={formData.documentType}
            onChange={handleChange}
            error={errors.documentType}
          />

          <Input
            label="Nombres"
            name="firstName"
            type="text"
            placeholder="Ingrese los nombres del funcionario"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />

          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            placeholder="Ingrese el correo electrónico"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <Input
            label="Número de documento"
            name="documentNumber"
            type="text"
            placeholder="Ingrese el número de documento"
            value={formData.documentNumber}
            onChange={handleChange}
            error={errors.documentNumber}
          />

          <Input
            label="Apellidos"
            name="lastName"
            type="text"
            placeholder="Ingrese los apellidos del funcionario"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />

          <Input
            label="Teléfono"
            name="phone"
            type="tel"
            placeholder="Ingrese el número de teléfono"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />

          <Select
            label="Ciudad"
            name="city"
            options={cityOptions}
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
          />

          <Input
            label="Dirección"
            name="address"
            type="text"
            placeholder="Ingrese la dirección del funcionario"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
          />

          <Select
            label="Rol"
            name="role"
            options={roleOptions}
            value={formData.role}
            onChange={handleChange}
            error={errors.role}
          />

          <Select
            label="Activo o Inactivo"
            name="active"
            options={selectActive}
            value={formData.active}
            onChange={handleChange}
            error={errors.active}
          />

          {/* Contraseñas solo en creación */}
          {!userId && (
            <>
              <Input
                label="Contraseña"
                name="password"
                type="password"
                placeholder="Ingrese la contraseña"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />

              <Input
                label="Confirmar contraseña"
                name="confirmPassword"
                type="password"
                placeholder="Confirme la contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />
            </>
          )}

          <div className="sm:col-span-2 lg:col-span-3 flex justify-end mb-2">
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => navigate("/admin/roles/gestionar")}
            >
              Gestionar roles y permisos
            </Button>
          </div>

          {/* Botón Guardar */}
          <div className="sm:col-span-2 lg:col-span-3 flex justify-end mt-0">
            <Button
              variant="secondary"
              size="sm"
              type="submit"
              className="flex items-center gap-2"
              form="adminUserForm"
            >
              <img
                src={guardar}
                alt="icono-guardar"
                className="w-auto flex items-center gap-2"
              />
              {submitLabel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}