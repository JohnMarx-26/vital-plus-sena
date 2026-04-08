import { Button, Select, Input } from "@/shared";
import { useEffect, useState } from "react";
import { AvatarUploader } from "@/features/users";
import { userSchema } from "../Schemas/userSchemas";
import { useNavigate } from "react-router-dom";

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

export default function AdminUserForm() {
  const navigate = useNavigate();
  const [roleOptions, setRoleOptions] = useState([]);

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
    password: "",
    confirmPassword: "",
    avatarUrl: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/roles/");
        const data = await response.json();

        const formattedRoles = data.map((role) => ({
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

    const result = userSchema.safeParse(formData);
    const fieldErrors = {};

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });
    }

    if (!formData.role) {
      fieldErrors.role = "Debe seleccionar un rol";
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    const payload = {
      documentType: parseInt(formData.documentType, 10),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      documentNumber: formData.documentNumber.trim(),
      city: parseInt(formData.city, 10),
      address: formData.address.trim(),
      role: parseInt(formData.role, 10),
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      avatarUrl: formData.avatarUrl,
    };

    console.log("Payload funcionario:", payload);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/auth/funcionarios/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log("Respuesta backend funcionario:", data);

      if (!response.ok) {
        const detalleErrores = data.errores
          ? JSON.stringify(data.errores, null, 2)
          : data.error || data.mensaje;

        alert(detalleErrores || "No se pudo registrar el funcionario");
        return;
      }

      alert(data.mensaje || "Funcionario registrado correctamente");

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
        <AvatarUploader
          label="Foto de perfil"
          onChange={handleAvatarChange}
        />
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

          <div className="flex items-center justify-end">
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
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}