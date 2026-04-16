export const getMetodosPago = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/metodos_pago/");
    if (!response.ok) throw new Error("Error al obtener métodos de pago");
    const data = await response.json();

    return data.map((m) => ({
      id: m.id_metodo_pago,
      label: m.nombre_metodo,
      value: m.id_metodo_pago,
      id_banco: m.banco?.id_banco, 
    }));
  } catch (error) {
    console.error("getMetodosPago:", error);
    return [];
  }
};