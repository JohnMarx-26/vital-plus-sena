const API_URL = "http://127.0.0.1:8000/api";

export async function getBancos() {
    const response = await fetch(`${API_URL}/bancos/`);

    if (!response.ok) {
        throw new Error("No se pudieron obtener los bancos");
    }

    return await response.json();
    }