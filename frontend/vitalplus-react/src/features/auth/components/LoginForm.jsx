import { Link, useNavigate } from "react-router-dom";
import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";

export default function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("token", "demo-token");
    localStorage.setItem("userName", "John");
    window.dispatchEvent(new Event("auth-changed"));

    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      <div className="text-center">
        <h3 className="text-2xl font-semibold text-text-primary">
          Iniciar sesión
        </h3>
        <p className="text-sm text-text-muted mt-2">
          Ingresa tus credenciales para continuar
        </p>
        <div className="mt-4 h-px bg-border w-full" />
      </div>

      <Input
        label="Correo electrónico"
        type="email"
        name="email"
        placeholder="Ingrese su correo"
      />

      <Input
        label="Contraseña"
        type="password"
        name="password"
        placeholder="Ingrese su contraseña"
      />

      <Link
        to="/forgot-password"
        className="text-xs text-text-muted hover:underline text-center"
      >
        ¿Olvidaste tu contraseña?
      </Link>

      <Button
        type="submit"
        className="
          w-full
          h-12
          rounded-xl
          bg-[color:var(--color-primary-700)]
          hover:bg-[color:var(--color-primary-600)]
          text-white
          font-medium
        "
      >
        Iniciar sesión
      </Button>

      <Button
        type="button"
        className="
          w-full
          h-12
          rounded-xl
          bg-[color:var(--color-primary-700)]
          hover:bg-[color:var(--color-primary-600)]
          text-white
          font-medium
        "
        onClick={() => navigate("/usuarios/crear")}
      >
        Crear Cuenta
      </Button>

    </form>
  );
}