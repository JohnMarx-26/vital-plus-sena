// importaciones
import { ProductForm } from "@/features/products";
import { Button, FormLayout } from "@/shared";
import guardar from "@/assets/svg/icono-guardar.svg";
import retroceder from "@/assets/svg/icono-retroceder.svg";
import { useNavigate } from "react-router-dom";

/*
Botones del formulario de edición
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
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <img src={retroceder} alt="icono-retroceder" className="w-5 h-5" />
          Retroceder
        </Button>
      </div>

      <div className="flex w-60 px-1 gap-3">
        {/* Botón Actualizar */}
        <Button
          variant="secondary"
          size="sm"
          type="submit"
          form="editProductForm"
          className="flex items-center gap-2"
        >
          <img
            src={guardar}
            alt="icono-actualizar"
            className="w-5 h-5 px-[2px]"
          />
          Actualizar
        </Button>
      </div>
    </div>
  );
};

export default function EditProductPage() {
  return (
    <FormLayout>
      <Botones />
      <ProductForm formId="editProductForm" showActions={false} />
    </FormLayout>
  );
}