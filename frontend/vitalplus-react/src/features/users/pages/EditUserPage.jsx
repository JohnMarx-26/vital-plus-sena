// importaciones
import { EditUserForm } from "@/features/users";
import { Button, FormLayout } from "@/shared";
import retroceder from "@/assets/svg/icono-retroceder.svg";
import guardar from "@/assets/svg/icono-guardar.svg";
import { useNavigate } from "react-router-dom";

/*
Botones del formulario de edición
*/

const Botones = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full justify-between px-5">
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
          form="editUserForm"
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

export default function EditUserPage() {
  return (
    <FormLayout>
      <Botones />
      <EditUserForm />
    </FormLayout>
  );
}
