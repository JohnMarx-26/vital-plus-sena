import { useState } from "react";
import { Input, Button } from "@/shared";
import { resetTokenSchema } from "../Schemas/authSchemas";

export default function ResetPasswordForm({ email = "", onSuccess }) {
  const [form, setForm] = useState({
    token: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
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

    setErrors({});

    if (onSuccess) {
      onSuccess(form.token);
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

      {email && (
        <p className="text-sm text-text-muted text-center">
          Correo: {email}
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