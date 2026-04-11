// Librería para manipulación y generación de archivos Excel
import * as XLSX from "xlsx";

// Función utilitaria para generar un archivo Excel a partir de datos tabulares
export function generateExcelReport({
  headers, // Array de encabezados
  rows, // Array de filas
  fileName = "suppliers-report.xlsx", // Nombre del archivo de salida
}) {
  // Estructura final de la hoja
  const worksheetData = [headers, ...rows];

  // Convierte el array de arrays en una hoja de Excel
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  // Crea un nuevo libro de Excel
  const workbook = XLSX.utils.book_new();

  // Agrega la hoja al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, "Proveedores");

  // Genera y descarga el archivo Excel
  XLSX.writeFile(workbook, fileName);
}