import { useState } from "react";
import { Input, Button } from "@/shared";
import { forgotPasswordSchema } from "../Schemas/authSchemas";

export default function ForgotPasswordForm({ onSuccess }) {
  const [form, setForm] = useState({ email: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
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

    if (onSuccess) {
      onSuccess(form.email);
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