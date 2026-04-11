export const getFormaTypes = async () => {
    const response = await fetch("http://localhost:8000/api/formas-farmaceuticas/");
    const data = await response.json();
    return data.map((item) => ({
    id: item.id_forma_farmaceutica,
    label: item.nombre_forma,
    value: item.id_forma_farmaceutica,
  }));
};