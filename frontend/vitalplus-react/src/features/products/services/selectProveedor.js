export const getSupplierTypes = async () => {
    const response = await fetch("http://localhost:8000/api/proveedores/");
    const data = await response.json();
        return data.map((item) => ({
        id: item.id_proveedor,
        label: item.nombre_proveedor,
        value: item.id_proveedor,
    }));
};