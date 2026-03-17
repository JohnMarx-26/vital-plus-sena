import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input, Button } from "@/shared";
import { loginSchema } from "../Schemas/authSchemas";

export default function LoginForm({
  title = "Iniciar sesión",
  description = "Ingresa tus credenciales para continuar",
  redirectTo = "/dashboard",
  redirectToAdmin = "/main",
  isAdmin = false,
  showCreateAccount = true,
  createAccountPath = "/usuarios/crear",
  forgotPasswordPath = "/forgot-password",
  userName = "John",
}) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = loginSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    localStorage.setItem("token", "demo-token");
    localStorage.setItem("userName", userName);
    window.dispatchEvent(new Event("auth-changed"));

    navigate(isAdmin ? redirectToAdmin : redirectTo);
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
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
        value={form.email}
        onChange={handleChange}
        error={errors.email}
      />

      <Input
        label="Contraseña"
        type="password"
        name="password"
        placeholder="Ingresa tu contraseña"
        value={form.password}
        onChange={handleChange}
        error={errors.password}
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