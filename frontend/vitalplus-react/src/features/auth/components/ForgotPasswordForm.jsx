import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "@/shared";
import { forgotPasswordSchema } from "../Schemas/authSchemas";

export default function ForgotPasswordForm({ onSuccess }) {
  const [form, setForm] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const result = forgotPasswordSchema.safeParse(form);

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

  try {
    const response = await fetch("http://127.0.0.1:8000/api/auth/forgot-password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email.trim(),
      }),
    });

    const data = await response.json();
    console.log("Respuesta forgot-password:", data);

    if (!response.ok) {
      alert(data.mensaje || "No se pudo generar el token");
      return;
    }

    sessionStorage.setItem("resetEmail", form.email.trim());

    alert(
      `Token generado correctamente.\n\nToken de prueba: ${data.data.token}`
    );

    if (onSuccess) {
      onSuccess(form.email.trim());
    }

    navigate("/reset-password");
  } catch (error) {
    console.error("Error de conexión:", error);
    alert("No se pudo conectar con el backend");
  }
};

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-text-primary">
          ¿Olvidaste tu contraseña?
        </h3>
        <p className="text-sm text-text-muted mt-2">
          Ingresa tu correo y te enviaremos un token.
        </p>
        <div className="mt-4 h-px bg-border w-full" />
      </div>

      <Input
        label="Correo electrónico"
        name="email"
        type="email"
        placeholder="Ingresa tu correo"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
      />

      <Button variant="primary" size="md" type="submit" className="w-full">
        Enviar enlace
      </Button>
    </form>
  );
}