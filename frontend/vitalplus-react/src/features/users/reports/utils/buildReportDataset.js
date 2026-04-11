// Función utilitaria para construir el dataset de un reporte (tabla)
// Patrón: transformación de datos (input → output listo para exportar)
export function buildReportDataset({
  users, // Array de usuarios origen
  selectedFields, // Campos seleccionados para el reporte [{ key, label }]
  scope, // Alcance del reporte: "all" | "documentNumber"
  documentNumber, // Número de documento para filtrar (si aplica)
}) {
  // Copia inmutable del array original
  let filteredUsers = [...users];

  // Filtro por alcance
  if (scope === "documentNumber" && documentNumber) {
    filteredUsers = filteredUsers.filter(
      (user) =>
        String(user.documentNumber ?? "") === String(documentNumber ?? "")
    );
  }

  // Construcción de encabezados del reporte
  const headers = selectedFields.map((field) => field.label);

  // Construcción de filas del reporte
  const rows = filteredUsers.map((user) =>
    selectedFields.map((field) => {
      const value = user[field.key];
      return value ?? "";
    })
  );

  // Estructura final para exportar
  return {
    headers,
    rows,
  };
}