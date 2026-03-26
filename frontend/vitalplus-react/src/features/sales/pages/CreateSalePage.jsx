// Importaciones
// import VentasForm from "@/features/Sales/components/SalesForm";
import { SaleForm } from "@/features/sales";
import { ProductSection } from "@/features/products";
import { Button, FormLayout } from "@/shared";
import retroceder from "@/assets/svg/icono-retroceder.svg";
import { useNavigate } from "react-router-dom";

    /*se crea una arrow function para los botones del formulario
    a esta funcion se le realiza un callback cuando se ejecuta
    el FormLayout, dentro de esta funcion esta la logica de los botones
    y sus estilos*/

const Botones = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full justify-between px-10 mb-5">
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
    </div>
  );
};

export default function CreateSalePage() {
  return (
    <FormLayout>
      <Botones />
      <SaleForm>
        <ProductSection variant="pos" />
      </SaleForm>
    </FormLayout>
  );
}