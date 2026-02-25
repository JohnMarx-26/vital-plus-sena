import Input from "./../../../shared/components/Input";
import Button from "./../../../shared/components/Button";
import Select from "../../../shared/components/Select";
import { useEffect, useState } from "react";
import { getDocumentTypes } from "../services/selectService";

export default function UserForm() {
  const [documentTypes, setDocumentTypes] = useState([]);

  // Estado del formulario (controlado)
  const [form, setForm] = useState({
    name: "",
    email: "",
    documentType: "",
  });

  useEffect(() => {
    getDocumentTypes().then(setDocumentTypes);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(`Campo ${name}:`, value);
  };

  const handleEmailBlur = (e) => {
    console.log("Email (onBlur):", e.target.value);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setForm({
      name: "",
      email: "",
      documentType: "",
    });
    console.log("Oprimió cancelar: formulario limpiado");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica para evidencia
    if (!form.name || !form.email || !form.documentType) {
      console.log("Faltan campos por completar", form);
      return;
    }

    console.log("Oprimió guardar: datos del formulario", form);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nombre"
          name="name"
          placeholder="Ingrese su nombre"
          value={form.name}
          onChange={handleChange}
        />

        <Select
          label="Tipos de documento"
          name="documentType"
          options={documentTypes}
          value={form.documentType}
          onChange={handleChange}
        />

        <Input
          label="Email"
          name="email"
          placeholder="Ingrese su Email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleEmailBlur}
        />

        <div className="flex items-center justify-center gap-12 mt-6">
          <Button variant="secondary" size="sm" onClick={handleCancel}>
            Cancelar
          </Button>

          <Button variant="primary" size="md" type="submit">
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
}