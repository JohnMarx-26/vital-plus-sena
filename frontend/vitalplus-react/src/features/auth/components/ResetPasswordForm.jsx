import { useState } from "react";
import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";
import { UserForm } from "@/features";

export default function ResetPasswordForm() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.password || !form.confirmPassword) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (!token) {
      setError("Token inválido o inexistente");
      return;
    }

    console.log("Nueva contraseña:", form.password);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      <div className="text-center">
        <h3 className="text-2xl font-semibold text-text-primary">
          Nueva Contraseña
        </h3>
        <p className="text-sm text-text-secondary mt-2">
          Ingresa y confirma tu nueva contraseña.
        </p>
        <div className="mt-4 h-[1px] bg-[color:var(--color-basic-200)] w-full" />
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center">
          {error}
        </p>
      )}

      <Input
        label="Nueva contraseña"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Ingresa nueva contraseña"
      />

      <Input
        label="Confirmar contraseña"
        type="password"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
        placeholder="Confirma nueva contraseña"
      />

      <Button variant="primary" size="md" type="submit">
        Restablecer contraseña
      </Button>

      {/* Solo para evidenciar el encapsulamiento */}
      <UserForm />

    </form>
  );
}