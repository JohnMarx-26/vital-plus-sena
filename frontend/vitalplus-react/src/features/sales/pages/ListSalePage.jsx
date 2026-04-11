import SaleDataTable from "../components/SaleDataTable";
import {  SaleColumns }   from "../table/SaleColumns";
import { sales } from "@/data/sale/sales";
import { Header, Button } from "@/shared";
import retroceder from "@/assets/svg/icono-retroceder.svg";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import ReportConfigModal from "../reports/components/ReportConfigModalSale";
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
        {/* Boton de generar reportes*/}
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
      <Header variant="Main"/>
      <Botones />
    <div className="p-6">
      
      <SaleDataTable
        data={sales}
        columns={SaleColumns}
      />

    </div>
    </div>
  )
}




