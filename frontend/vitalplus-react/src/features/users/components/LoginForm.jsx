import Input from "../../../shared/components/Input";

export default function LoginForm() {
  return (
    <form className="flex flex-col items-center gap-4">
      <Input
        label="Correo electrónico"
        type="email"
        placeholder="Ingrese su correo"
      />

      <Input
        label="Contraseña"
        type="password"
        placeholder="Ingrese su contraseña"
      />

      

      {/* No es botón, solo texto con estilo */}
      <p className="text-xs text-gray-500 text-center">
        ¿Olvidaste tu contraseña?
      </p>

      {/* No son botones: son contenedores con estilo */}
      <div
        role="button"
        tabIndex={0}
        className="
          w-[320px]
          bg-[var(--color-primary-700)]
          text-[var(--color-basic-white)]
          py-2
          rounded-md
          text-center
          cursor-pointer
          select-none
        "
      >
        Iniciar sesión
      </div>

      <div
        role="button"
        tabIndex={0}
        className="
          w-[320px]
          bg-[var(--color-primary-700)]
          text-[var(--color-basic-white)]
          py-2
          rounded-md
          text-center
          cursor-pointer
          select-none
        "
      >
        Crear Cuenta
      </div>
    </form>
  );
}