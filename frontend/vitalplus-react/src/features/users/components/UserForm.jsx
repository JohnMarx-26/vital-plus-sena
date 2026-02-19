import Input from "./../../../shared/components/Input";
import Button from "./../../../shared/components/Button"; // ajusta esta ruta si tu Button está en otro lado

export default function UserForm() {
  return (
    <div>
      {/* Formulario para crear el usuario */}
      <form>
        <Input
          label="Nombre"
          placeholder="Ingrese su nombre"
        />

        {/* Actions */}
        <div className="flex items-center justify-center gap-12">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.preventDefault(); // para que no recargue el form
              console.log("Oprimio cancelar");
            }}
          >
            Cancelar
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={(e) => {
              e.preventDefault();
              console.log("Oprimio guardar");
            }}
          >
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
}