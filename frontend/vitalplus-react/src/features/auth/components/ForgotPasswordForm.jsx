import { useState } from "react";
import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";

export default function ForgotPasswordForm() {
  const [form, setForm] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recuperar contraseña:", form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      <div className="text-center">
        <h3 className="text-2xl font-semibold text-text-primary">
          ¿Olvidaste tu contraseña?
        </h3>
        <p className="text-sm text-text-secondary mt-2">
          Ingresa tu correo y te enviaremos instrucciones.
        </p>
        <div className="mt-4 h-[1px] bg-[color:var(--color-basic-200)] w-full" />
      </div>

      <Input
        label="Correo electrónico"
        name="email"
        placeholder="Ingresa tu correo"
        value={form.email}
        onChange={handleChange}
      />

      <Button variant="primary" size="md" type="submit">
        Enviar enlace
      </Button>

    </form>
  );
}