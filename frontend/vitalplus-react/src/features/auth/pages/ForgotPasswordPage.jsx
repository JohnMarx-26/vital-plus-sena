import { useState } from "react";
import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";

export default function ForgotPasswordPage() {
  const [form, setForm] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = (e) => {
    e.preventDefault();
    console.log("Volver al login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recuperar contraseña:", form);
  };

  // Tokens visuales (misma lógica que CreateRoleForm)
  const outerBorder = "border-[color:var(--color-primary-700)]";
  const innerBorder = "border-[color:var(--color-primary-100)]";

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full bg-brand px-8">
        <div className="mx-auto max-w-7xl min-h-[88px] flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-sans text-brand-soft">
            Recuperar Contraseña
          </h2>

          <h1 className="text-2xl md:text-3xl font-sans font-bold tracking-wide text-brand-soft">
            Vital-Plus
          </h1>
        </div>
      </div>

      {/* Borde superior doble */}
      <div className="w-full">
        <div className="h-[10px] bg-[color:var(--color-primary-700)]" />
        <div className="h-[5px] bg-[color:var(--color-primary-100)]" />
      </div>

      {/* Body */}
      <div className="flex-1 w-full px-6 py-16 bg-[color:var(--semantic-backgroond)] flex items-center justify-center">
        <div
          className={`mx-auto max-w-xl w-full rounded-xl border-2 ${outerBorder} p-2`}
        >
          <div
            className={`rounded-lg border-2 ${innerBorder} p-10`}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="text-center">
                <h3 className="text-2xl font-sans text-text-primary">
                  ¿Olvidaste tu contraseña?
                </h3>
                <p className="text-sm text-text-secondary mt-2">
                  Ingresa tu correo electrónico y te enviaremos instrucciones para restablecerla.
                </p>
                <div className="mt-4 h-[2px] bg-[color:var(--color-basic-200)] w-full" />
              </div>

              <Input
                label="Correo electrónico"
                name="email"
                placeholder="Ingresa tu correo"
                value={form.email}
                onChange={handleChange}
              />

              <div className="flex items-center justify-between mt-4">
                <Button variant="secondary" size="md" onClick={handleBack}>
                  Volver
                </Button>

                <Button variant="primary" size="md" type="submit">
                  Enviar enlace
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Borde inferior doble */}
      <div className="w-full">
        <div className="h-[5px] bg-[color:var(--color-primary-100)]" />
        <div className="h-[10px] bg-[color:var(--color-primary-700)]" />
      </div>

      {/* Footer */}
      <div className="w-full bg-brand py-10" />
    </div>
  );
}