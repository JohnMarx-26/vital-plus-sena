// Librería para generación de PDFs en el cliente
import jsPDF from "jspdf";

// Plugin para creación de tablas dentro del PDF
import autoTable from "jspdf-autotable";

// Función utilitaria para generar un reporte en PDF
// Patrón: exportación de datos (dataset → documento estructurado)
export function generatePdfReport({
  headers, // Encabezados de la tabla
  rows, // Datos del reporte
  fileName = "users-report.pdf", // Nombre del archivo de salida
}) {
  // Inicializa el documento PDF
  const doc = new jsPDF();

  // Configuración del título
  doc.setFontSize(16);
  doc.text("Reporte de Usuarios", 14, 20);

  // Generación de tabla automática
  autoTable(doc, {
    startY: 30,
    head: [headers],
    body: rows,
    theme: "grid",

    // Estilos del encabezado
    headStyles: {
      fillColor: [33, 150, 243],
      textColor: 255,
      fontSize: 11,
    },

    // Estilos globales de las celdas
    styles: {
      fontSize: 10,
    },

    // Márgenes del documento
    margin: {
      left: 14,
      right: 14,
    },
  });

  // Genera y descarga el archivo PDF
  doc.save(fileName);
}