import { useEffect, useState } from "react";
import Input from "./../../../shared/components/Input";
import Select from "../../../shared/components/Select";
import Button from "./../../../shared/components/Button";
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
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1200px] px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text-primary">
            Editar usuario
          </h2>

          <Button
            variant="primary"
            size="md"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md shadow-md transition duration-200"
            onClick={(e) => {
              e.preventDefault();
              console.log("Actualizar usuario");
            }}
          >
            Actualizar
          </Button>
        </div>

        <div className="flex gap-16 items-start">
          <form className="flex-1">
            <div className="flex flex-wrap gap-x-12 gap-y-6">

              {/* Tipo de documento */}
              <div className="w-[320px]">
                <Select
                  label="Tipo de documento"
                  name="documentType"
                  options={documentTypes}
                />
              </div>

              <div className="w-[320px]">
                <Select
                  label="Tipo de usuario"
                  name="userType"
                  options={userTypes}
                />
              </div>

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

              <Input
                label="Fecha de creación"
                type="date"
                name="createdAt"
                disabled
              />

              <Input
                label="Fecha de deshabilitación"
                type="date"
                name="disabledAt"
                disabled
              />
            </div>

            <div className="mt-8">
              <Button
                type="button"
                size="md"
                className={`px-6 py-2 rounded-md shadow-md transition duration-200 text-white ${
                  userStatus === "Activo"
                    ? "bg-gray-500 hover:bg-gray-700"
                    : "bg-blue-400 hover:bg-blue-600"
                }`}
                onClick={toggleStatus}
              >
                {userStatus === "Activo"
                  ? "Usuario Inactivo"
                  : "Usuario Activo"}
              </Button>
            </div>
          </form>

          <div className="w-[320px] flex flex-col items-center gap-6">
            <div className="w-44 h-44 rounded-full border border-border flex items-center justify-center">
              <span className="text-text-muted">Foto</span>
            </div>

            <label
              htmlFor="avatar"
              className="bg-brand text-brand-soft px-4 py-2 rounded-md cursor-pointer"
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