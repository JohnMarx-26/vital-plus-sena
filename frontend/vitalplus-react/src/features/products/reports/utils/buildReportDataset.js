// Función utilitaria para construir el dataset de un reporte (tabla)
// Patrón: transformación de datos (input → output listo para exportar)
export function buildReportDataset({
  product, // Array de usuarios origen
  selectedFields, // Campos seleccionados para el reporte [{ key, label }]
  scope, // Alcance del reporte: "all" | "document"
  administrationRoute, // Número de documento para filtrar (si aplica)
}) {
  // Copia inmutable del array original (evita mutaciones)
  let filteredProducts = [...product];
  // Filtro por alcance: si es por documento, se aplica filtro específico
  if (scope === "admRoute" && administrationRoute) {
    filteredProducts = filteredProducts.filter(
      (product) => product.administrationRoute === administrationRoute,
    );
  }
  // Construcción de encabezados del reporte
  // Se toma el label de cada campo seleccionado
  const headers = selectedFields.map((field) => field.label);
  // Construcción de filas del reporte
  // Cada usuario se transforma en un array de valores según los campos
  // seleccionados
  const rows = filteredProducts.map((product) =>
    selectedFields.map((field) => {
      const value = product[field.key]; // Acceso dinámico a la propiedad
      // Normalización: evita undefined o null en el reporte
      return value ?? "";
    }),
  );
  // Estructura final desacoplada de la UI
  // Lista para exportar a Excel, PDF o renderizar en tabla
  return {
    headers, // Array de strings (columnas)
    rows, // Array de arrays (filas)
  };
}
