import SaleDetailForm from "@/features/sales/components/SaleDetailForm";
import FormLayout from "@/shared/layout/FormLayout";
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
        <div className="flex w-full justify-between px-10">

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

export default function SupplierDetailPage (){
    return(
        <FormLayout>
            <Botones />
            <SaleDetailForm/>
        </FormLayout>
    
    );
}