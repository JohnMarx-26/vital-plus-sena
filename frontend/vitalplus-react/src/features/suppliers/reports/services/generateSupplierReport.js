// Servicio real para obtener proveedores desde backend
import { getSuppliers } from "@/features/suppliers/services/suppliersService";
// Utilidad para transformar datos en dataset de reporte
import { buildReportDataset } from "../utils/buildReportDataset";
// Servicios de exportación
import { generateExcelReport } from "./generateExcelReport";
import { generatePdfReport } from "./generatePdfReport";

// Caso de uso: orquestador de generación de reportes de proveedores
// Patrón: Application Service (coordina utilidades y servicios)
export async function generateSupplierReport({
  format, // "excel" | "pdf"
  selectedFields, // Campos seleccionados por el usuario
  scope, // Alcance del reporte
  nit, // Filtro opcional
}) {
  try {
    // Obtiene los proveedores reales desde backend
    const data = await getSuppliers();

    // Mapea la respuesta del backend al formato que espera el reporte
    const suppliers = data.map((supplier) => ({
      id: supplier.id_proveedor ?? "",
      nit:
        supplier.n_documento !== null && supplier.n_documento !== undefined
          ? String(supplier.n_documento)
          : "",
      name: supplier.nombre_proveedor ?? "",
      razon_social: supplier.razon_social ?? "",
      contact: supplier.nombre_contacto ?? "",
      phone:
        supplier.telefono_contacto !== null &&
        supplier.telefono_contacto !== undefined
          ? String(supplier.telefono_contacto)
          : "",
      email: supplier.correo_electronico ?? "",
      city: supplier.ciudad ?? "",
      address: supplier.direccion ?? "",
      is_active: supplier.estado === "activo",
    }));

    // Construcción del dataset
    const { headers, rows } = buildReportDataset({
      suppliers,
      selectedFields,
      scope,
      nit,
    });

    // Validación: evita generar archivos vacíos
    if (!rows.length) {
      alert("No hay datos para generar el reporte.");
      return;
    }

    // Generación de timestamp para nombres únicos de archivo
    const timestamp = new Date().toISOString().slice(0, 10);

    // Selección de estrategia de exportación según formato
    if (format === "excel") {
      generateExcelReport({
        headers,
        rows,
        fileName: `suppliers-report-${timestamp}.xlsx`,
      });
    }

    if (format === "pdf") {
      generatePdfReport({
        headers,
        rows,
        fileName: `suppliers-report-${timestamp}.pdf`,
      });
    }
  } catch (error) {
    throw new Error(
      error.message || "No se pudo generar el reporte de proveedores"
    );
  }
}