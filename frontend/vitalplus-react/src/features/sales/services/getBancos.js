
export const getBancos = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/bancos/"); 
    if (!response.ok) throw new Error("Error al obtener bancos");
    const data = await response.json();

    return data.map((b) => ({
      id: b.id_banco,
      label: b.nombre_banco,
      value: b.id_banco,
    }));
  } catch (error) {
    console.error("getBancos:", error);
    return [];
  }
};