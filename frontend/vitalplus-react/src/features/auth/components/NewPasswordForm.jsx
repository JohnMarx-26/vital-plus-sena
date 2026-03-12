import { useState } from "react";
import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";

export default function NewPasswordForm({ onSuccess }) {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
      />

      <Input
        label="Confirmar contraseña"
        name="confirmPassword"
        type="password"
        placeholder="Confirma tu nueva contraseña"
        value={form.confirmPassword}
        onChange={handleChange}
      />

      <Button variant="primary" size="md" type="submit" className="w-full">
        Guardar contraseña
      </Button>
    </form>
  );
}