// importaciones
import ProveedorForm from "@/features/suppliers/components/SupplierForm";
import Button from "@/shared/components/Button" 
import guardar from "@/assets/svg/icono-guardar.svg"
import retroceder from "@/assets/svg/icono-retroceder.svg"
import { SquarePen } from "lucide-react"
import FormLayout from "@/shared/layout/FormLayout";

    /*se crea una arrow function para los botones del formulario
    a esta funcion se le realiza un callback cuando se ejecuta
    el FormLayout, dentro de esta funcion esta la logica de los botones
    y sus estilos*/

    const Botones = () => {
        return ( 
            <div className="flex w-full justify-between px-10">

                <div>
                    {/* Boton Retroceder */}
                    <Button
                        variant="secondary"
                        size="sm"
                        type="button"
                        // onClick={() => console.log("Oprimió cancelar")}
                    >
                        <img src={retroceder} alt="icono-retroceder" className="w-5 h-5"/>
                        Retroceder
                    </Button>
                </div>
                <div className="flex w-60 px-1 gap-3">
                    {/* Boton modificar */}
                    <Button
                        variant="secondary"
                        size="sm"
                        type="button"
                        // onClick={() => console.log("Oprimió cancelar")}
                    >
                        <SquarePen className="w-5 h-5"/>
                        Modificar
                    </Button>
                    {/* Boton Guardar  */}
                    <Button
                        variant="secondary"
                        size="sm"
                        type="button"
                        // onClick={() => console.log("Oprimió cancelar")}
                    >
                        {/* Se pone padding en X de 2 px porque el icono estaba muy pegado al texto */}
                        <img src={guardar} alt="icono-modificar" className="w-5 h-5 px-[2px]"/>
                        Guardar
                    </Button>
                </div>
            </div>   
    );
} 

export default function CreateSupplierPage() {
return (

        <FormLayout>
            <Botones />
                <ProveedorForm />
        </FormLayout>
    );
}