export const getMetodosPago = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/metodos-pago/");
    if (!response.ok) throw new Error("Error al obtener métodos de pago");
    const data = await response.json();
    return data.map((m) => ({
      id:      m.id,
      label:   m.label,
      value:   m.id,
      id_banco: m.id_banco,
    }));
  } catch (error) {
    console.error("getMetodosPago:", error);
    return [];
  }
};