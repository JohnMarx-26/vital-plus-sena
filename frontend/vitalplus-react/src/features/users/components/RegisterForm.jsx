import Input from "../../../shared/components/Input";

export default function RegisterForm() {
  return (
    <form className="flex flex-col gap-4">
      <Input
        label="Nombre de usuario"
        type="text"
        placeholder="Ingrese su nombre de usuario"
      />

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

      <Input
        label="Repetir contraseña"
        type="password"
        placeholder="Repita su contraseña"
      />

      <button
        className="
          bg-[var(--color-primary-400)]
          text-[var(--color-basic-white)]
          py-2
          rounded-md
          hover:bg-[var(--color-primary-400)]
        "
      >
        Crear cuenta
      </button>
    </form>
  );
}