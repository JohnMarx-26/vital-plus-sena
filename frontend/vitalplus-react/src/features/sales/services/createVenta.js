    // src/features/ventas/services/createVenta.js
    const BASE_URL = "http://localhost:8000/api";

    export const createVenta = async (payload) => {
    const response = await fetch(`${BASE_URL}/ventas/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(JSON.stringify(error));
    }

    return response.json();
    };
