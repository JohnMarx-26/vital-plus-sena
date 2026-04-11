export const listProductInfo = async () => {
    const response = await fetch("http://localhost:8000/api/medicamentos/")
    const data = await response.json();

    return data.map((item) => ({
        id: item.id_medicamento,
        productName: item.nombre_medicamento,
        pharmaceuticalForm: item.id_forma_farmaceutica?.nombre_forma,
        administrationRoute: item.id_via_administracion?.descripcion,
        requiresPrescription: item.requiere_formula,
        description: item.descripcion,
        status: item.estado_medicamento,
        // inventario
        stock: item.inventario[0]?.stock ?? 0,
        purchasePrice: item.inventario[0]?.precio_compra ?? 0,
        salePrice: item.inventario[0]?.precio_venta ?? 0,
        lotNumber: item.inventario[0]?.lote ?? "",
        manufacturingDate: item.inventario[0]?.fecha_de_fabricacion ?? "",
        expirationDate: item.inventario[0]?.fecha_de_vencimiento ?? "",
    }));
};