export const getLabTypes = async () => {
    const response = await fetch("http://localhost:8000/api/laboratorios/");
    const data = await response.json();
    return data.map((item) => ({
    id: item.id_laboratorio,
    label: item.nombre_laboratorio,
    value: item.id_laboratorio,
    }));
};