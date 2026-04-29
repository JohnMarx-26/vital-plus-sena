const API_URL = "http://127.0.0.1:8000/api";

export async function getSuppliers() {
  const response = await fetch(`${API_URL}/proveedores/`);

  if (!response.ok) {
    throw new Error("No se pudo obtener la lista de proveedores");
  }

  return await response.json();
}

export async function getCities() {
  const response = await fetch(`${API_URL}/ciudades/`);

  if (!response.ok) {
    throw new Error("No se pudo obtener la lista de ciudades");
  }

  return await response.json();
}

export async function getDocumentTypes() {
  const response = await fetch(`${API_URL}/tipos-documento/`);

  if (!response.ok) {
    throw new Error("No se pudo obtener la lista de tipos de documento");
  }

  return await response.json();
}

export async function createSupplier(payload) {
  const response = await fetch(`${API_URL}/proveedores/crear/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.detail ||
      data?.error ||
      JSON.stringify(data) ||
      "No se pudo crear el proveedor"
    );
  }

  return data;
}

// Obtiene el detalle de un proveedor por su id
export async function getSupplierById(id) {
  const response = await fetch(`${API_URL}/proveedores/${id}/`);

  if (!response.ok) {
    throw new Error("No se pudo obtener el detalle del proveedor");
  }

  return await response.json();
}

// Actualiza un proveedor existente por id
export async function updateSupplier(id, payload) {
  const response = await fetch(`${API_URL}/proveedores/${id}/actualizar/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.detail ||
      data?.error ||
      JSON.stringify(data) ||
      "No se pudo actualizar el proveedor"
    );
  }

  return data;
}