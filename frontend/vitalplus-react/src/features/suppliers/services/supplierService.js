const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function getSuppliers() {
  const response = await fetch(`${API_BASE_URL}/api/proveedores/`);

  if (!response.ok) {
    throw new Error("No se pudo cargar la lista de proveedores");
  }

  return response.json();
}

export async function getCities() {
  const response = await fetch(`${API_BASE_URL}/api/ciudades/`);

  if (!response.ok) {
    throw new Error("No se pudieron cargar las ciudades");
  }

  return response.json();
}

export async function createSupplier(payload) {
  const response = await fetch(`${API_BASE_URL}/api/proveedores/crear/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.mensaje || "No se pudo crear el proveedor");
  }

  return data;
}