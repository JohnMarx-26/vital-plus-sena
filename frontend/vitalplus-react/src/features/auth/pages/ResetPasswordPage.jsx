import { useState } from "react";
import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";

export default function ResetPasswordPage() {
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
    console.log("Token:", token);
  };

  const outerBorder = "border-[color:var(--color-primary-700)]";
  const innerBorder = "border-[color:var(--color-primary-100)]";

  return (
    <div className="w-full min-h-screen bg-[color:var(--semantic-backgroond)] flex items-center justify-center px-6">

      <div className={`w-full max-w-xl rounded-xl border-2 ${outerBorder} p-2`}>
        <div className={`rounded-lg border-2 ${innerBorder} p-10`}>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">

            <div className="text-center">
              <h3 className="text-2xl font-sans text-text-primary">
                Nueva Contraseña
              </h3>
              <p className="text-sm text-text-secondary mt-2">
                Ingresa y confirma tu nueva contraseña.
              </p>
              <div className="mt-4 h-[2px] bg-[color:var(--color-basic-200)] w-full" />
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

          </form>

        </div>
      </div>

    </div>
  );
}