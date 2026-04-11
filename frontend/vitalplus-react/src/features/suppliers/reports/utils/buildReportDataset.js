// Función utilitaria para construir el dataset de un reporte (tabla)
// Patrón: transformación de datos (input → output listo para exportar)
export function buildReportDataset({
  suppliers, // Array de proveedores origen
  selectedFields, // Campos seleccionados para el reporte [{ key, label }]
  scope, // Alcance del reporte: "all" | "nitNumber"
  nit, // Número de nit para filtrar (si aplica)
}) {
  // Copia inmutable del array original
  let filteredSuppliers = [...suppliers];

  // Filtro por alcance
  if (scope === "nitNumber" && nit) {
    filteredSuppliers = filteredSuppliers.filter(
      (supplier) => String(supplier.nit ?? "") === String(nit ?? "")
    );
  }

  // Construcción de encabezados del reporte
  const headers = selectedFields.map((field) => field.label);

  // Construcción de filas del reporte
  const rows = filteredSuppliers.map((supplier) =>
    selectedFields.map((field) => {
      const value = supplier[field.key];
      return value ?? "";
    })
  );

  // Estructura final para exportar
  return {
    headers,
    rows,
  };
}