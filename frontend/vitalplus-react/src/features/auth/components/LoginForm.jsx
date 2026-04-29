import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input, Button } from "@/shared";
import { loginSchema } from "../Schemas/authSchemas";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

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
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const handleSubmit = async (e) => {
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
    setServerError("");
    setIsSubmitting(true);

    const endpoint = isAdmin
      ? `${API_BASE_URL}/api/auth/funcionarios/login/`
      : `${API_BASE_URL}/api/auth/clientes/login/`;

    const payload = {
      correo_electronico: form.email,
      contrasena: form.password,
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setServerError(data.mensaje || "No se pudo iniciar sesión");
        return;
      }

      localStorage.setItem("token", "demo-token");
      localStorage.setItem(
        "userName",
        data?.data?.correo_electronico || userName
      );
      localStorage.setItem("userType", isAdmin ? "funcionario" : "cliente");
      localStorage.setItem("authData", JSON.stringify(data.data));

      window.dispatchEvent(new Event("auth-changed"));

      navigate(isAdmin ? redirectToAdmin : redirectTo);
    } catch (error) {
      console.error("Error en login:", error);
      setServerError("No se pudo conectar con el servidor");
    } finally {
      setIsSubmitting(false);
    }
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

      {serverError && (
        <p className="text-sm text-red-600 text-center">{serverError}</p>
      )}

      <Button
        variant="primary"
        size="md"
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
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