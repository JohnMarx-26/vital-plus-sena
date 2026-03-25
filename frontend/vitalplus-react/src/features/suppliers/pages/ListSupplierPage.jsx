import { SupplierDataTable } from "@/features/suppliers";
import { suppliers } from "@/data/supplier/suppliers";
import { Header, Button } from "@/shared";
import { useNavigate } from "react-router-dom";
import { SupplierColumns } from "../table/SupplierColumns";
import retroceder from "@/assets/svg/icono-retroceder.svg";
import { useState } from "react";
import ReportConfigModal from "../reports/components/ReportConfigModalSupplier";
import { FileDown } from "lucide-react";

/*se crea una arrow function para el boton del formulario
    a esta funcion se le realiza un callback cuando se ejecuta
    el FormLayout, dentro de esta funcion esta la logica de los botones
    y sus estilos*/

const Botones = () => {
  const navigate = useNavigate();
        const [IsReportModalOpen, setIsReportModalOpen] = useState(false);

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

export default function ListSupplierPage() {
  return (
    <div className="w-full h-dvh">
      <Header />
      <Botones />
      <div className="p-6">
        <SupplierDataTable data={suppliers} columns={SupplierColumns} />
      </div>
    </div>
  );
}
