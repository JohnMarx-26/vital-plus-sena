import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";
import { Link } from "react-router-dom";

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

      <Link
        to="/forgot-password"
        className="text-xs text-text-muted hover:underline"
      >
        ¿Olvidaste tu contraseña?
      </Link>

      <Button
        type="submit"
        variant="primary"
        size="md"
        className="w-[320px]"
      >
        Iniciar sesión
      </Button>

      <Button
        type="button"
        variant="secondary"
        size="md"
        className="w-[320px]"
      >
        Crear Cuenta
      </Button>

    </form>
  );
}