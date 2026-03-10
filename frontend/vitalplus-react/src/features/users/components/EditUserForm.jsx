import { useEffect, useState } from "react";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import Button from "@/shared/components/Button";
import { getDocumentTypes } from "../services/selectService";
import { getUserTypes } from "../services/selectService2";

export default function EditUserForm() {
  const [documentTypes, setDocumentTypes] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const [userStatus, setUserStatus] = useState("Activo");

  useEffect(() => {
    getDocumentTypes().then(setDocumentTypes);
    getUserTypes().then(setUserTypes);
  }, []);

  const toggleStatus = () => {
    setUserStatus((prev) => (prev === "Activo" ? "Inactivo" : "Activo"));
  };

  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-text-primary">
            Editar usuario
          </h2>

          <Button
            variant="primary"
            size="md"
            onClick={(e) => {
              e.preventDefault();
              console.log("Actualizar usuario");
            }}
          >
            Actualizar
          </Button>
        </div>

        {/* Layout: form + foto */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">
          {/* FORM */}
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <Select
                label="Tipo de documento"
                name="documentType"
                options={documentTypes}
              />

              <Select
                label="Tipo de usuario"
                name="userType"
                options={userTypes}
              />

              <Input
                label="N° documento de identidad"
                name="documentNumber"
                placeholder="Ingrese número de documento"
              />

              <Input
                label="Número telefónico"
                name="phone"
                placeholder="Ingrese número telefónico"
              />

              <Input
                label="Número adicional"
                name="extraPhone"
                placeholder="Ingrese número adicional"
              />

              <Input
                label="Nombres"
                name="firstName"
                placeholder="Ingrese nombres"
              />

              <Input
                label="Apellidos"
                name="lastName"
                placeholder="Ingrese apellidos"
              />

              <Input
                label="Correo electrónico"
                type="email"
                name="email"
                placeholder="Ingrese su correo electrónico"
              />

              <Input
                label="Dirección"
                name="address"
                placeholder="Ingrese dirección"
              />

              <Input label="Fecha de creación" type="date" name="createdAt" disabled />
              <Input label="Fecha de deshabilitación" type="date" name="disabledAt" disabled />
            </div>

            <div className="mt-8">
              <Button
                type="button"
                variant={userStatus === "Activo" ? "secondary" : "primary"}
                size="md"
                onClick={toggleStatus}
              >
                {userStatus === "Activo" ? "Usuario Inactivo" : "Usuario Activo"}
              </Button>
            </div>
          </form>

          {/* FOTO */}
          <div className="flex flex-col items-center gap-6">
            <div className="w-44 h-44 rounded-full border border-border flex items-center justify-center">
              <span className="text-text-muted">Foto</span>
            </div>

            <label
              htmlFor="avatar"
              className="inline-flex items-center justify-center h-10 px-4 rounded-md cursor-pointer
                  border border-border bg-brand text-text-inverse hover:bg-brand-hover transition-colors"
            >
              Cambiar imagen
            </label>

            <input id="avatar" type="file" className="hidden" />
          </div>
        </div>
      </div>
    </div>
  );
}