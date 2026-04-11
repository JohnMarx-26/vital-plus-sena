// Hook para manejo de estado local en componentes funcionales
import { useState } from "react";
// Configuración de campos disponibles para el reporte
import { supplierReportFields } from "../config/supplierSupplierFields";
// Caso de uso que orquesta la generación del reporte
import { generateSupplierReport } from "../services/generateSupplierReport";
// Componentes UI reutilizables (design system)
import { Button, Input, Select } from "@/shared";
import Checkbox from "@/shared/components/Checkbox";

// Componente modal para configuración de reportes
export default function SupplierConfigModal({ isOpen, onClose }) {
  // Estado del formato de salida
  const [format, setFormat] = useState("pdf");
  // Estado del alcance del reporte
  const [scope, setScope] = useState("all");
  // Estado para filtro por nit
  const [nit, setNit] = useState("");
  // Estado de carga para evitar múltiples clics
  const [isGenerating, setIsGenerating] = useState(false);
  // Estado de campos seleccionados
  const [selectedFields, setSelectedFields] = useState(() =>
    supplierReportFields.filter((f) => f.default)
  );

  // Control de render
  if (!isOpen) return null;

  // Handler para activar/desactivar campos del reporte
  const handleFieldToggle = (field) => {
    const exists = selectedFields.find((f) => f.key === field.key);

    if (exists) {
      setSelectedFields(selectedFields.filter((f) => f.key !== field.key));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  // Handler principal para generar el reporte
  const handleGenerateReport = async () => {
    try {
      if (!selectedFields.length) {
        alert("Debes seleccionar al menos un campo para el reporte.");
        return;
      }

      if (scope === "nitNumber" && !nit.trim()) {
        alert("Debes ingresar un número de Nit para filtrar.");
        return;
      }

      setIsGenerating(true);

      await generateSupplierReport({
        format,
        selectedFields,
        scope,
        nit: nit.trim(),
      });

      onClose();
    } catch (error) {
      alert(error.message || "No se pudo generar el reporte.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* Contenedor del modal */}
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
        {/* Título */}
        <h2 className="mb-6 text-xl font-semibold">
          Generar reporte de proveedores
        </h2>

        {/* Selección de formato */}
        <div className="mb-4">
          <Select
            label="Formato del reporte"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            options={[
              { label: "PDF", value: "pdf" },
              { label: "Excel", value: "excel" },
            ]}
          />
        </div>

        {/* Selección de campos */}
        <div className="mb-4">
          <p className="mb-2 font-medium">Campos del reporte</p>

          <div className="grid grid-cols-2 gap-2">
            {supplierReportFields.map((field) => {
              const checked = selectedFields.some((f) => f.key === field.key);

              return (
                <Checkbox
                  key={field.key}
                  id={field.key}
                  name={field.key}
                  label={field.label}
                  checked={checked}
                  onChange={() => handleFieldToggle(field)}
                />
              );
            })}
          </div>
        </div>

        {/* Selección de alcance */}
        <div className="mb-4">
          <Select
            label="Alcance del reporte"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            options={[
              { label: "Todos los proveedores", value: "all" },
              { label: "Filtrar por número de Nit", value: "nitNumber" },
            ]}
          />
        </div>

        {/* Campo condicional para filtro por nit */}
        {scope === "nitNumber" && (
          <div className="mb-4">
            <Input
              label="Número de Nit"
              value={nit}
              onChange={(e) => setNit(e.target.value)}
              placeholder="Ingrese número de Nit"
            />
          </div>
        )}

        {/* Acciones del modal */}
        <div className="mt-6 flex justify-end gap-2">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isGenerating}
          >
            Cancelar
          </Button>

          <Button
            variant="primary"
            onClick={handleGenerateReport}
            disabled={isGenerating}
          >
            {isGenerating ? "Generando..." : "Generar reporte"}
          </Button>
        </div>
      </div>
    </div>
  );
}