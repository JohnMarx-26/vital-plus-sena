import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";
import Select from "@/shared/components/Select";
import { useEffect, useState } from "react";
import { getDocumentTypes } from "../services/selectService";

const defaultFormValues = {
  documentType: "",
  documentNumber: "",
  phone: "",
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  password: "",
  confirmPassword: "",
};

export default function UserForm({
  title = "Formulario de usuario",
  submitLabel = "Guardar",
  onSubmit,
  onCancel,
  initialValues = {},
}) {
  const [documentTypes, setDocumentTypes] = useState([]);
  const [formValues, setFormValues] = useState({
    ...defaultFormValues,
    ...initialValues,
  });
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    getDocumentTypes().then(setDocumentTypes);
  }, []);

  const handleFieldChange = (fieldName, value) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleInputChange = (fieldName, eventOrValue) => {
    const value = eventOrValue?.target ? eventOrValue.target.value : eventOrValue;
    handleFieldChange(fieldName, value);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setAvatarPreview("");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      ...formValues,
      avatar: avatarPreview,
    };

    if (onSubmit) {
      onSubmit(payload);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            size="md"
            className="rounded-md border border-slate-300 px-5 py-2 text-slate-700 hover:bg-slate-100"
            onClick={onCancel}
          >
            Retroceder
          </Button>

          <Button
            type="button"
            size="md"
            className="rounded-md bg-blue-600 px-5 py-2 text-white shadow-md hover:bg-blue-700"
            onClick={handleSubmit}
          >
            {submitLabel}
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-8 xl:flex-row xl:items-start">
        <form className="min-w-0 flex-1" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 2xl:grid-cols-3">
            <div className="min-w-0">
              <Select
                label="Tipo de documento"
                name="documentType"
                options={documentTypes}
                value={formValues.documentType}
                onChange={(event) => handleInputChange("documentType", event)}
              />
            </div>

            <div className="min-w-0">
              <Input
                label="N° documento de identidad"
                name="documentNumber"
                placeholder="Ingrese número de documento"
                value={formValues.documentNumber}
                onChange={(event) => handleInputChange("documentNumber", event)}
              />
            </div>

            <div className="min-w-0">
              <Input
                label="Número telefónico"
                name="phone"
                placeholder="Ingrese número telefónico"
                value={formValues.phone}
                onChange={(event) => handleInputChange("phone", event)}
              />
            </div>

            <div className="min-w-0">
              <Input
                label="Nombres"
                name="firstName"
                placeholder="Ingrese nombres"
                value={formValues.firstName}
                onChange={(event) => handleInputChange("firstName", event)}
              />
            </div>

            <div className="min-w-0">
              <Input
                label="Apellidos"
                name="lastName"
                placeholder="Ingrese apellidos"
                value={formValues.lastName}
                onChange={(event) => handleInputChange("lastName", event)}
              />
            </div>

            <div className="min-w-0">
              <Input
                label="Correo electrónico"
                type="email"
                name="email"
                placeholder="Ingrese su correo electrónico"
                value={formValues.email}
                onChange={(event) => handleInputChange("email", event)}
              />
            </div>

            <div className="min-w-0 sm:col-span-2 2xl:col-span-1">
              <Input
                label="Dirección"
                name="address"
                placeholder="Ingrese dirección"
                value={formValues.address}
                onChange={(event) => handleInputChange("address", event)}
              />
            </div>

            <div className="min-w-0">
              <Input
                label="Contraseña"
                type="password"
                name="password"
                placeholder="Ingrese contraseña"
                value={formValues.password}
                onChange={(event) => handleInputChange("password", event)}
              />
            </div>

            <div className="min-w-0">
              <Input
                label="Confirmar contraseña"
                type="password"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                value={formValues.confirmPassword}
                onChange={(event) =>
                  handleInputChange("confirmPassword", event)
                }
              />
            </div>
          </div>
        </form>

        <div className="flex w-full flex-col items-center gap-6 xl:w-[280px] xl:flex-shrink-0">
          <div className="flex h-48 w-48 items-center justify-center overflow-hidden rounded-full border border-slate-300 sm:h-56 sm:w-56">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Vista previa del usuario"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-slate-500">Foto</span>
            )}
          </div>

          <label
            htmlFor="avatar"
            className="cursor-pointer rounded-md bg-blue-600 px-6 py-2 text-white shadow-md transition hover:bg-blue-700"
          >
            Cargar imagen
          </label>

          <input
            id="avatar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
      </div>
    </div>
  );
}