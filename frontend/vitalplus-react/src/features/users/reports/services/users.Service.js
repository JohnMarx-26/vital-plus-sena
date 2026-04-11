const API_URL = "http://127.0.0.1:8000/api";

export async function getUsers() {
  const response = await fetch(`${API_URL}/funcionarios/`);

  if (!response.ok) {
    throw new Error("No se pudo obtener la lista de usuarios");
  }

  return await response.json();
}