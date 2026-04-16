// src/features/ventas/services/getClienteByDocumento.js
const BASE_URL = "http://localhost:8000/api";

export const getClienteByDocumento = async (documento) => {
  const response = await fetch(
    `${BASE_URL}/clientes/?documento=${documento}`
  );
  if (!response.ok) throw new Error("Error al buscar cliente");

  const data = await response.json();
  if (data.length === 0) return null;

  return data[0];
};