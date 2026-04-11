export const getViaTypes = async () => {
    const response = await fetch("http://localhost:8000/api/via-administracion/");
    const data = await response.json();
        return data.map((item) => ({
        id: item.id_via_administracion,
        label: item.descripcion,
        value: item.id_via_administracion,
    }));
};