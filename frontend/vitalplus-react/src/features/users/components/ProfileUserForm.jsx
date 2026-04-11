import { useEffect, useState } from "react";
import { Button } from "@/shared";
import { SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import usuario from "@/assets/svg/icono-usuario-new.svg";

export default function ProfileUserForm({ user }) {
  const navigate = useNavigate();

  // Estado visual del botón de estado
  const [userStatus, setUserStatus] = useState("Inactivo");

  // Sincroniza el estado visual con la información real del usuario
  useEffect(() => {
    if (user?.status === "activo") {
      setUserStatus("Activo");
    } else {
      setUserStatus("Inactivo");
    }
  }, [user]);

  // Cambia el texto del botón de manera visual
  // Por ahora no actualiza la base de datos
  const toggleStatus = () => {
    setUserStatus((prev) => (prev === "Activo" ? "Inactivo" : "Activo"));
  };

  // Redirige a la pantalla de edición usando el id del usuario
  const handleEdit = () => {
    navigate(`/usuarios/modificar/${user.id}`);
  };

  if (!user) return null;

  const userDetails = [
    { label: "Tipo de documento", value: user.documentType },
    { label: "Número de documento", value: user.documentNumber },
    { label: "Rol", value: user.role },
    { label: "Correo electrónico", value: user.email },
    { label: "Número celular", value: user.phone },
    { label: "Dirección", value: user.address },
    { label: "Fecha creación cuenta", value: user.createdAt },
  ];

  return (
    <section className="flex w-full px-6 py-8 justify-center">
      <div className="mx-auto flex w-full flex-col gap-8 lg:flex-row lg:items-start justify-center">
        <aside className="w-full lg:max-w-sm">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex justify-center">
              <h1 className="border-b-2 border-text-secundary pb-1 text-xl font-medium text-slate-900">
                Opciones de usuario
              </h1>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-52 w-52 items-center justify-center">
                <img
                  src={user.avatarUrl || usuario}
                  alt="Icono usuario"
                  className="h-50 w-50"
                />
              </div>

              <div className="mt-6 w-full max-w-xs border-b border-slate-400 pb-3 text-center">
                <p className="text-sm font-medium text-text-secundary">
                  {user.fullName}
                </p>
              </div>

              <div className="mt-5 flex w-full flex-col items-center gap-4">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button
                    type="button"
                    size="md"
                    className={`px-6 py-2 rounded-md shadow-md text-white ${
                      userStatus === "Activo"
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-gray-500 hover:bg-gray-700"
                    }`}
                    onClick={toggleStatus}
                  >
                    {userStatus === "Activo"
                      ? "Usuario Activo"
                      : "Usuario Inactivo"}
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={handleEdit}
                    className="flex items-center gap-2"
                  >
                    <SquarePen className="w-5 h-5" />
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