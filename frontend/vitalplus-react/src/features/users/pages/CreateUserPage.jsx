import { useEffect, useState } from "react";
import Input from "./../../../shared/components/Input";
import Select from "../../../shared/components/Select";
import Button from "./../../../shared/components/Button";
import { getDocumentTypes } from "../services/selectService";

export default function UserForm() {
  const [documentTypes, setDocumentTypes] = useState([]);

  useEffect(() => {
    getDocumentTypes().then(setDocumentTypes);
  }, []);

  return (
    <div className="w-full flex justify-center pt-4 pb-8">
      <div className="w-full max-w-[1500px] px-10 py-8 relative overflow-hidden">
        <div className="flex items-center justify-between mb-8 relative z-10">
          <h2 className="text-xl font-semibold text-black">Crear cuenta</h2>

          <div className="flex gap-4">
            <Button
              size="md"
              className="px-6 py-2 rounded-md border border-gray-400 text-gray-700 hover:bg-gray-100"
              onClick={(e) => {
                e.preventDefault();
                console.log("Retroceder");
              }}
            >
              Retroceder
            </Button>

            <Button
              variant="primary"
              size="md"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md"
              onClick={(e) => {
                e.preventDefault();
                console.log("Guardar");
              }}
            >
              Guardar
            </Button>
          </div>
        </div>

        <div className="flex gap-10 items-start relative z-10">
          <form className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="w-full">
                <Select
                  label="Tipo de documento"
                  name="documentType"
                  options={documentTypes}
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
                label="Contraseña"
                type="password"
                name="password"
                placeholder="Ingrese contraseña"
              />

              <Input
                label="Confirmar contraseña"
                type="password"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
              />
            </div>
          </form>

          <div className="w-[320px] flex flex-col items-center gap-6">
            <div className="w-56 h-56 rounded-full border border-gray-400 flex items-center justify-center">
              <span className="text-gray-500">Foto</span>
            </div>

            <label
              htmlFor="avatar"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md cursor-pointer shadow"
            >
              Cargar imagen
            </label>

            <input id="avatar" type="file" className="hidden" />
          </div>
        </div>
      </div>
    </div>
  );
}