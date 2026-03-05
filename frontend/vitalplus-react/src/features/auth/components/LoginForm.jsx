import Input from "../../../shared/components/Input";

export default function LoginForm() {
  return (
    <form className="flex flex-col items-center gap-4">
      <Input
        label="Correo electrónico"
        type="email"
        name="email"
        placeholder="Ingrese su correo"
        autoComplete="email"
      />

      <Input
        label="Contraseña"
        type="password"
        name="password"
        placeholder="Ingrese su contraseña"
        autoComplete="current-password"
      />

      <p className="text-xs text-gray-500 text-center">
        ¿Olvidaste tu contraseña?
      </p>

      <button
        type="submit"
        className="
          w-[320px]
          bg-[var(--color-primary-700)]
          text-[var(--color-basic-white)]
          py-2
          rounded-md
        "
      >
        Iniciar sesión
      </button>

      <button
        type="button"
        className="
          w-[320px]
          bg-[var(--color-primary-700)]
          text-[var(--color-basic-white)]
          py-2
          rounded-md
        "
      >
        Crear Cuenta
      </button>
    </form>
  );
}