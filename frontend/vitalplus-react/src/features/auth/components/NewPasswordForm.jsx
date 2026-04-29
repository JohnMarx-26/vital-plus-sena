import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "@/shared";
import { newPasswordSchema } from "../Schemas/authSchemas";

export default function NewPasswordForm({ onSuccess }) {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const storedEmail = sessionStorage.getItem("resetEmail") || "";
  const storedToken = sessionStorage.getItem("resetToken") || "";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const result = newPasswordSchema.safeParse(form);

  if (!result.success) {
    const fieldErrors = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0];
      fieldErrors[field] = issue.message;
    });

    setErrors(fieldErrors);
    return;
  }

  if (!storedEmail || !storedToken) {
    alert("Faltan datos del proceso de recuperación");
    return;
  }

  setErrors({});

  try {
    const response = await fetch("http://127.0.0.1:8000/api/auth/reset-password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: storedEmail,
        token: storedToken,
        password: form.password,
        confirmPassword: form.confirmPassword,
      }),
    });

    const data = await response.json();
    console.log("Respuesta reset-password:", data);

    if (!response.ok) {
      alert(data.mensaje || "No se pudo actualizar la contraseña");
      return;
    }

    sessionStorage.removeItem("resetEmail");
    sessionStorage.removeItem("resetToken");

    if (onSuccess) {
      onSuccess();
    }

    alert(data.mensaje || "Contraseña actualizada correctamente");
    navigate("/login");
  } catch (error) {
    console.error("Error de conexión:", error);
    alert("No se pudo conectar con el backend");
  }
};

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-text-primary">
          Nueva contraseña
        </h3>

        <p className="text-sm text-text-muted mt-2">
          Ingresa y confirma tu nueva contraseña.
        </p>

        <div className="mt-4 h-px bg-border w-full" />
      </div>

      <Input
        label="Nueva contraseña"
        name="password"
        type="password"
        placeholder="Ingresa tu nueva contraseña"
        value={form.password}
        onChange={handleChange}
        error={errors.password}
      />

      <Input
        label="Confirmar contraseña"
        name="confirmPassword"
        type="password"
        placeholder="Confirma tu nueva contraseña"
        value={form.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />

      <Button variant="primary" size="md" type="submit" className="w-full">
        Guardar contraseña
      </Button>
    </form>
  );
}