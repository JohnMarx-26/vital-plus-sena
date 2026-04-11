export const getPresentationTypes = async () => {
    const response = await fetch("http://localhost:8000/api/presentaciones/");
    const data = await response.json();
        return data.map((item) => ({
        id: item.id_presentacion,
        label: item.nombre_presentacion,
        value: item.id_presentacion,
    }));
};