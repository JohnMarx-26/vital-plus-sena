import { SupplierDetailForm } from "@/features/suppliers";
import { Button, FormLayout } from "@/shared/";
import { useNavigate } from "react-router-dom";
import retroceder from "@/assets/svg/icono-retroceder.svg";

/*se crea una arrow function para el boton del formulario
    a esta funcion se le realiza un callback cuando se ejecuta
    el FormLayout, dentro de esta funcion esta la logica de los botones
    y sus estilos*/

const Botones = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full justify-between px-10">
      <div>
        {/* Boton Retroceder */}
        <Button
          variant="secondary"
          size="sm"
          type="button"
          //para devolverme al apartado anterior
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <img src={retroceder} alt="icono-retroceder" className="w-5 h-5" />
          Retroceder
        </Button>
      </div>
    </div>
  );
};

export default function SupplierDetailPage() {
  return (
    <FormLayout>
      <Botones />
      <SupplierDetailForm />
    </FormLayout>
  );
}
