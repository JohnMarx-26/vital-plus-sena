export const getCategoryTypes = async () => {
  const response = await fetch("http://localhost:8000/api/categorias/");
  const data = await response.json();
  return data
    .filter((item) => item.nombre_categoria.toLowerCase() !== "medicinas")
    .map((item) => ({
      id: item.id_categoria,
      label: item.nombre_categoria,
      value: item.id_categoria,
    }));
};