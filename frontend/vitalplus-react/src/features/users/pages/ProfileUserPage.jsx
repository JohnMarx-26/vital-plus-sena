import { useState } from "react";
import Button from "../../../shared/components/Button";

export default function ProfileUserPage() {
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

  const handleEdit = () => {
    console.log("Modificar usuario");
  };

  return (
    <section className="w-full px-6 py-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 lg:flex-row lg:items-start">
        <aside className="w-full lg:max-w-sm">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex justify-center">
              <h1 className="border-b-2 border-slate-900 pb-1 text-xl font-medium text-slate-900">
                Opciones de usuario
              </h1>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-52 w-52 items-center justify-center rounded-full border-[8px] border-sky-950">
                <svg
                  viewBox="0 0 100 100"
                  className="h-36 w-36 fill-sky-950"
                  aria-hidden="true"
                >
                  <circle cx="50" cy="32" r="16" />
                  <path d="M50 56c-18 0-32 14-32 32h64c0-18-14-32-32-32z" />
                </svg>
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
                    className={`px-6 py-2 rounded-md shadow-md text-white ${
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
                    type="button"
                    size="md"
                    className="flex items-center gap-2 rounded-full border border-slate-400 bg-white px-4 py-2 text-sm text-slate-800 hover:bg-slate-100"
                    onClick={handleEdit}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-4 w-4"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
                    </svg>
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

                  <span className="text-sm text-slate-900 break-words">
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