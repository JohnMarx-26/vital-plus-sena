import SaleDataTable from "../components/SaleDataTable";
import {  SaleColumns }   from "../table/SaleColumns";
import { sales } from "@/data/sale/sales";
import Header from "@/shared/components/Header";
import Button from "@/shared/components/Button" ;
import retroceder from "@/assets/svg/icono-retroceder.svg";
import {useNavigate} from "react-router-dom";



    /*se crea una arrow function para el boton del formulario
    a esta funcion se le realiza un callback cuando se ejecuta
    el FormLayout, dentro de esta funcion esta la logica de los botones
    y sus estilos*/

const Botones = () => {
    
    const navigate = useNavigate()

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
                    <img src={retroceder} alt="icono-retroceder" className="w-5 h-5"/>
                    Retroceder
                </Button>
            </div>
        </div>    
    );
}

export default function ListSupplierPage() {

  return (
    <div className="w-full h-dvh">
      <Header/>
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




