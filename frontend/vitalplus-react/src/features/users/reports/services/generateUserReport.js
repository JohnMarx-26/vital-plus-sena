// Servicio real para obtener usuarios desde backend
import { getUsers } from "../services/users.Service";
// Utilidad para transformar datos en dataset de reporte
import { buildReportDataset } from "../utils/buildReportDataset";
// Servicios de exportación
import { generateExcelReport } from "./generateExcelReport";
import { generatePdfReport } from "./generatePdfReport";

// Caso de uso: orquestador de generación de reportes de usuarios
// Patrón: Application Service (coordina utilidades y servicios)
export async function generateUserReport({
  format, // "excel" | "pdf"
  selectedFields, // Campos seleccionados por el usuario
  scope, // Alcance del reporte
  documentNumber, // Filtro opcional
}) {
  try {
    // Obtiene los usuarios reales desde backend
    const data = await getUsers();

    // Mapea la respuesta del backend al formato que espera el reporte
    const users = data.map((user) => ({
      id: user.id_funcionario ?? "",
      name: user.nombres_funcionario ?? "",
      lastName: user.apellidos_funcionario ?? "",
      documentType: user.tipo_documento ?? "",
      documentNumber:
        user.n_documento !== null && user.n_documento !== undefined
          ? String(user.n_documento)
          : "",
      email: user.correo_electronico ?? "",
      address: user.direccion ?? "",
      city: user.ciudad ?? "",
      cellNumber:
        user.numero_telefonico !== null && user.numero_telefonico !== undefined
          ? String(user.numero_telefonico)
          : "",
      role: user.rol ?? "",
      is_active: user.estado_cuenta === "activo",
    }));

    // Construcción del dataset
    const { headers, rows } = buildReportDataset({
      users,
      selectedFields,
      scope,
      documentNumber,
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
        fileName: `users-report-${timestamp}.xlsx`,
      });
    }

    if (format === "pdf") {
      generatePdfReport({
        headers,
        rows,
        fileName: `users-report-${timestamp}.pdf`,
      });
    }
  } catch (error) {
    throw new Error(
      error.message || "No se pudo generar el reporte de usuarios"
    );
  }
}