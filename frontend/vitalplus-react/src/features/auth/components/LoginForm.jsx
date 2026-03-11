import { Link, useNavigate } from "react-router-dom";
import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";

export default function LoginForm({
  title = "Iniciar sesión",
  description = "Ingresa tus credenciales para continuar",
  redirectTo = "/dashboard",
  redirectToAdmin ="/main",
  isAdmin = false,
  showCreateAccount = true,
  createAccountPath = "/usuarios/crear",
  forgotPasswordPath = "/forgot-password",
  userName = "John",
}) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("token", "demo-token");
    localStorage.setItem("userName", userName);
    window.dispatchEvent(new Event("auth-changed"));

    navigate(isAdmin ? redirectToAdmin : redirectTo);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-text-primary">{title}</h3>

        <p className="text-sm text-text-muted mt-2">{description}</p>

        <div className="mt-4 h-px bg-border w-full" />
      </div>

      <Input
        label="Correo electrónico"
        type="email"
        name="email"
        placeholder="Ingresa tu correo"
      />

      <Input
        label="Contraseña"
        type="password"
        name="password"
        placeholder="Ingresa tu contraseña"
      />

      <Link
        to={forgotPasswordPath}
        className="text-xs text-text-muted hover:underline text-center"
      >
        ¿Olvidaste tu contraseña?
      </Link>

      <Button variant="primary" size="md" type="submit" className="w-full">
        Iniciar sesión
      </Button>

      {showCreateAccount && (
        <Button
          variant="primary"
          size="md"
          type="button"
          className="w-full"
          onClick={() => navigate(createAccountPath)}
        >
          Crear cuenta
        </Button>
      )}
    </form>
  );
}