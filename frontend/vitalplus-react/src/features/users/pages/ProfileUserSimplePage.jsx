import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/shared/components/Button";
import retroceder from "@/assets/svg/icono-retroceder.svg";
import usuario from "@/assets/svg/icono-usuario-new.svg";
import { SquarePen } from "lucide-react";

export default function ProfileUserSimplePage() {
  const navigate = useNavigate();

  const userData = {
    fullName: "Brahian Estiwen Galeano Pinzón",
    documentType: "Cédula de ciudadanía",
    documentNumber: "1090074404",
    userType: "Usuario",
    email: "brahiagaleano@gmail.com",
    phone: "3152405454",
    address: "Risaralda, Pereira, El Japón Mz 10",
    createdAt: "2025/12/15",
    password: "************",
  };

  const [userStatus, setUserStatus] = useState("Activo");

  const toggleStatus = () => {
    setUserStatus((prev) => (prev === "Activo" ? "Inactivo" : "Activo"));
  };

  const handleEdit = () => {
    console.log("Modificar usuario");
  };

  const userDetails = [
    { label: "Tipo de documento", value: userData.documentType },
    { label: "Número de documento", value: userData.documentNumber },
    { label: "Tipo de usuario", value: userData.userType },
    { label: "Correo electrónico", value: userData.email },
    { label: "Número celular", value: userData.phone },
    { label: "Dirección", value: userData.address },
    { label: "Fecha creación cuenta", value: userData.createdAt },
    { label: "Contraseña", value: userData.password },
  ];

  return (
    <section className="w-full px-6 py-8">
      <div className="mb-6 flex w-full justify-between px-4 lg:px-10">
        <Button
          variant="secondary"
          size="sm"
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <img src={retroceder} alt="icono-retroceder" className="h-5 w-5" />
          Retroceder
        </Button>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 lg:flex-row lg:items-start">
        <aside className="w-full lg:max-w-sm">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex justify-center">
              <h1 className="border-b-2 border-slate-900 pb-1 text-xl font-medium text-slate-900">
                Opciones de usuario
              </h1>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-52 w-52 items-center justify-center">
                <img
                  src={usuario}
                  alt="Icono usuario"
                  className="h-36 w-36"
                />
              </div>

              <div className="mt-6 w-full max-w-xs border-b border-slate-400 pb-3 text-center">
                <p className="text-sm font-medium text-slate-800">
                  {userData.fullName}
                </p>
              </div>

              <div className="mt-5 flex w-full flex-col items-center gap-4">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button
                    type="button"
                    size="md"
                    className={`rounded-md px-6 py-2 text-white shadow-md ${
                      userStatus === "Activo"
                        ? "bg-gray-500 hover:bg-gray-700"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    onClick={toggleStatus}
                  >
                    {userStatus === "Activo"
                      ? "Usuario Inactivo"
                      : "Usuario Activo"}
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={handleEdit}
                    className="flex items-center gap-2"
                  >
                    <SquarePen className="h-5 w-5" />
                    Modificar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="w-full max-w-[700px]">
          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6">
              {userDetails.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-[220px_1fr] items-start gap-x-8"
                >
                  <span className="text-sm font-medium text-slate-700">
                    {item.label}:
                  </span>

                  <span className="break-words text-sm text-slate-900">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}