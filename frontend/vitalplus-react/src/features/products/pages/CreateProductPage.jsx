// importaciones
import { ProductForm } from "@/features/products";
import { Button, FormLayout } from "@/shared";
import guardar from "@/assets/svg/icono-guardar.svg";
import retroceder from "@/assets/svg/icono-retroceder.svg";
import { useNavigate } from "react-router-dom";

/*
Se crea una arrow function para los botones del formulario
a esta función se le realiza un callback cuando se ejecuta
el FormLayout, dentro de esta función está la lógica de los botones
y sus estilos
*/

const Botones = () => {
  const navigate = useNavigate();

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
          className="flex items-center gap-2"
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
          type="submit"
          form="productForm"
          // onClick={() => alert("Producto creado con Exito")}
          className="flex items-center gap-2"
        >
          <img
            src={guardar}
            alt="icono-guardar"
            className="w-5 h-5 px-[2px]"
          />
          Guardar
        </Button>
      </div>
    </div>
  );
};

export default function CreateProductPage() {
  return (
    <FormLayout>
      <Botones />
      <ProductForm formId="productForm" showActions={false} />
    </FormLayout>
  );
}