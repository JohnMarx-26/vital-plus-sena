import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "@/shared";
import { resetTokenSchema } from "../Schemas/authSchemas";

export default function ResetPasswordForm({ email = "", onSuccess }) {
  const [form, setForm] = useState({
    token: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const storedEmail = sessionStorage.getItem("resetEmail") || "";
  const currentEmail = email || storedEmail;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const result = resetTokenSchema.safeParse(form);

  if (!result.success) {
    const fieldErrors = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0];
      fieldErrors[field] = issue.message;
    });

    setErrors(fieldErrors);
    return;
  }

  if (!currentEmail) {
    alert("No se encontró el correo para validar el token");
    return;
  }

  setErrors({});

  try {
    const response = await fetch("http://127.0.0.1:8000/api/auth/validate-reset-token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: currentEmail,
        token: form.token.trim(),
      }),
    });

    const data = await response.json();
    console.log("Respuesta validate-reset-token:", data);

    if (!response.ok) {
      alert(data.mensaje || "Token inválido");
      return;
    }

    sessionStorage.setItem("resetToken", form.token.trim());

    if (onSuccess) {
      onSuccess(form.token.trim());
    }

    alert(data.mensaje || "Token válido");
    navigate("/new-password");
  } catch (error) {
    console.error("Error de conexión:", error);
    alert("No se pudo conectar con el backend");
  }
};

  return (
    <form noValidate  onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-text-primary">
          Validar token
        </h3>

        <p className="text-sm text-text-muted mt-2">
          Ingresa el token enviado a tu correo.
        </p>

        <div className="mt-4 h-px bg-border w-full" />
      </div>

      {currentEmail && (
        <p className="text-sm text-text-muted text-center">
          Correo: {currentEmail}
        </p>
      )}

      <Input
        label="Token"
        name="token"
        type="text"
        placeholder="Ingresa tu token"
        value={form.token}
        onChange={handleChange}
        error={errors.token}
      />

      <Button variant="primary" size="md" type="submit" className="w-full">
        Validar token
      </Button>
    </form>
  );
}