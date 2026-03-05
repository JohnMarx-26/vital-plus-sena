import Input from "../../../shared/components/Input";

export default function LoginForm() {
  return (
    <form className="flex flex-col gap-4">

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

      <button
        className="
          bg-blue-600
          text-white
          py-2
          rounded-md
          hover:bg-blue-700
        "
      >
        Iniciar sesión
      </button>

    </form>
  );
}
