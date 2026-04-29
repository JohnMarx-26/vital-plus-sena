// Fuente de datos de usuarios (mock o fuente centralizada)
import { sales } from "@/data/sale/sales";
// Utilidad para transformar datos en dataset de reporte
import { buildReportDataset } from "../utils/buildReportDataset";
// Servicios de exportación
import { generateExcelReport } from "./generateExcelReport";
import { generatePdfReport } from "./generatePdfReport";
// Caso de uso: orquestador de generación de reportes de usuarios
// Patrón: Application Service (coordina utilidades y servicios)
export function generateSaleReport({
  format, // "excel" | "pdf"
  selectedFields, // Campos seleccionados por el usuario
  scope, // Alcance del reporte
  numero_factura, // Filtro opcional
}) {
  // Construcción del dataset (desacoplado de la UI)
  const { headers, rows } = buildReportDataset({
    sales,
    selectedFields,
    scope,
    numero_factura,
  });
  // Validación: evita generar archivos vacíos
  if (!rows.length) {
    alert("No hay datos para generar el reporte.");
    return; // Corte de ejecución
  }
  // Generación de timestamp para nombres únicos de archivo (YYYY-MM-DD)
  const timestamp = new Date().toISOString().slice(0, 10);
  // Selección de estrategia de exportación según formato
  if (format === "excel") {
    generateExcelReport({
      headers,
      rows,
      fileName: `sales-report-${timestamp}.xlsx`,
    });
  }
  if (format === "pdf") {
    generatePdfReport({
      headers,
      rows,
      fileName: `sales-report-${timestamp}.pdf`,
    });
  }
}
