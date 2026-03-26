import { Button, Input, Select } from "@/shared";
import { useEffect, useState } from "react";
import { getDocumentTypes } from "../services/selectService";
import { AvatarUploader } from "@/features/users";
import { userSchema } from "../Schemas/userSchemas";
import { useNavigate } from "react-router-dom";

import guardar from "@/assets/svg/icono-guardar.svg";
import retroceder from "@/assets/svg/icono-retroceder.svg";

const Botones = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full justify-between px-10">
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

export default function EditUserForm() {
  const [documentTypes, setDocumentTypes] = useState([]);

  const [formData, setFormData] = useState({
    documentType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    documentNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
    avatarUrl: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    getDocumentTypes().then(setDocumentTypes);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = userSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    console.log("Usuario actualizado:", result.data);
  };

  return (
    <div className="w-full h-full">
      <div className="flex w-full justify-between px-10">
        <Botones />
      </div>

      <div className="flex h-36 justify-center gap-8">
        <AvatarUploader
          label="Foto de perfil"
          onChange={handleAvatarChange}
        />
      </div>

      <div className="flex w-1200px h-800px justify-center items-center mt-20 gap-6">
        <form
          id="editUserForm"
          noValidate
          onSubmit={handleSubmit}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <Select
            label="Tipo de documento"
            name="documentType"
            options={documentTypes}
            value={formData.documentType}
            onChange={handleChange}
            error={errors.documentType}
          />

          <Input
            label="Nombres"
            name="firstName"
            type="text"
            placeholder="Ingrese los nombres del usuario"
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
            placeholder="Ingrese los apellidos del usuario"
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

          <Input
            label="Dirección"
            name="address"
            type="text"
            placeholder="Ingrese la dirección del usuario"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
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
          <div className="sm:col-span-2 lg:col-span-3 flex justify-end mt-0">
          <Button
            variant="secondary"
            size="sm"
            type="submit"
            className="flex items-center gap-2"
            form="editUserForm"
          >
            <img
              src={guardar}
              alt="icono-actualizar"
              className="w-auto flex items-center gap-2"
            />
            Actualizar
          </Button>
          </div>
        </form>
      </div>
    </div>
  );
}