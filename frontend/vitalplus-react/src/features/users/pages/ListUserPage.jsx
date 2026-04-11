import UserDataTable from "../components/UserDataTable";
import { UserColumns } from "../table/UserColumns";
import { useEffect, useState } from "react";
import retroceder from "@/assets/svg/icono-retroceder.svg";
import { Button, Header } from "@/shared";
import { useNavigate } from "react-router-dom";
import ReportConfigModal from "../reports/components/ReportConfigModal";
import { FileDown } from "lucide-react";

/*se crea una arrow function para el boton del formulario
a esta funcion se le realiza un callback cuando se ejecuta
el FormLayout, dentro de esta funcion esta la logica de los botones
y sus estilos*/

const Botones = () => {
  const [IsReportModalOpen, setIsReportModalOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="flex w-full justify-between px-10 my-8">
      <div>
        {/* Boton Retroceder */}
        <Button
          variant="secondary"
          size="sm"
          type="button"
          //para devolverme al apartado del menu del administrador
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <img src={retroceder} alt="icono-retroceder" className="w-5 h-5" />
          Retroceder
        </Button>
      </div>
      <div>
        {/* Boton de generar reporte */}
        <Button
          variant="primary"
          onClick={() => setIsReportModalOpen(true)}
          size="sm"
          type="button"
          className="flex items- gap-2"
        >
          <FileDown className="w-5 h-5" />
          Descargar factura
        </Button>

        <ReportConfigModal
          isOpen={IsReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default function ListUserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Consulta la lista real de funcionarios al backend
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("http://127.0.0.1:8000/api/funcionarios/");

        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de usuarios");
        }

        const data = await response.json();

        // Adapta la respuesta del backend al formato que espera la tabla
        const formattedUsers = data.map((user) => ({
          id: user.id_funcionario,
          name: user.nombres_funcionario,
          lastName: user.apellidos_funcionario,
          role: user.rol || "",
          documentType: user.tipo_documento || "",
          documentNumber: user.n_documento ?? "",
          email: user.correo_electronico || "",
          address: user.direccion || "",
          city: user.ciudad || "",
          cellNumber: user.numero_telefonico ?? "",
          is_active: user.estado_cuenta === "activo",
        }));

        setUsers(formattedUsers);
      } catch (err) {
        setError(err.message || "No se pudo cargar la lista de usuarios");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="w-full h-dvh">
      <Header variant="Main"/>
      <Botones />
      <div className="p-6">
        {loading && <p>Cargando usuarios...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <UserDataTable data={users} columns={UserColumns} />
        )}
      </div>
    </div>
  );
}