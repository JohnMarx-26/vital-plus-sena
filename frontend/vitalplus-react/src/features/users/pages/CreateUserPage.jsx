// importaciones
import UserForm from "@/features/users/components/UserForm";
import Button from "@/shared/components/Button";
import guardar from "@/assets/svg/icono-guardar.svg";
import retroceder from "@/assets/svg/icono-retroceder.svg";
// import { SquarePen } from "lucide-react";
import FormLayout from "@/shared/layout/FormLayout";
import { useNavigate } from "react-router-dom";

/*
Se crea una arrow function para los botones del formulario
a esta función se le realiza un callback cuando se ejecuta
el FormLayout, dentro de esta función está la lógica de los botones
y sus estilos
*/

const Botones = () => {

    const navigate = useNavigate()

    return (
        <div className="flex w-full justify-between px-10">

            <div>
                {/* Botón Retroceder */}
                <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    //para devolverme al apartado del menu del administrador
                    onClick={() => navigate(-1)}
                >
                    <img src={retroceder} alt="icono-retroceder" className="w-5 h-5" />
                    Retroceder
                </Button>
            </div>

            <div className="flex w-60 px-1 gap-3">

                {/* Botón Guardar */}
                <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={() => alert("Usuario creado con Exito")}
                >
                    {/* padding en X porque el icono estaba muy pegado */}
                    <img src={guardar} alt="icono-modificar" className="w-5 h-5 px-[2px]" />
                    Guardar
                </Button>

            </div>
        </div>
    );
};

export default function CreateUserPage() {
    return (
        <FormLayout>
            <Botones />
            <UserForm />
        </FormLayout>
    );
}