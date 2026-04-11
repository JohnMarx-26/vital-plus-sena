import UserDataTable from "../components/UserDataTable";
import { UserColumns } from "../table/UserColumns";
import { useState } from "react";
import { users } from "@/data/user/users";
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
  return (
    <div className="w-full h-dvh">
      <Header variant="Main" />
      <Botones />
      <div className="p-6">
        <UserDataTable data={users} columns={UserColumns} />
      </div>
    </div>
  );
}
