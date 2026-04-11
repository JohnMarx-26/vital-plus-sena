    export const detailProductInfo = async (id) => {
    const response = await fetch(`http://localhost:8000/api/medicamentos/${id}/`);
    const item = await response.json();

    return {
        id: item.id_medicamento,
        title: item.nombre_medicamento,
        lab: item.id_laboratorio?.nombre_laboratorio,
        labId: item.id_laboratorio?.id_laboratorio, 
        image: item.imagen_url,
        description: item.descripcion,
        category: item.id_categoria?.nombre_categoria,
        categoryId: item.id_categoria?.id_categoria,
        presentation: item.id_presentacion?.nombre_presentacion,
        presentationId: item.id_presentacion?.id_presentacion, 
        pharmaceuticalForm: item.id_forma_farmaceutica?.nombre_forma,
        pharmaceuticalFormId: item.id_forma_farmaceutica?.id_forma_farmaceutica,  
        administrationRoute: item.id_via_administracion?.descripcion,
        administrationRouteId: item.id_via_administracion?.id_via_administracion,  
        requiresPrescription: item.requiere_formula,
        status: item.estado_medicamento,
        stock: item.inventario[0]?.stock ?? 0,
        manufacturingDate: item.inventario[0]?.fecha_de_fabricacion ?? "",
        expirationDate: item.inventario[0]?.fecha_de_vencimiento ?? "",
        lotNumber: item.inventario[0]?.lote ?? "",
        price: item.inventario[0]?.precio_venta ?? 0,
        concentration: item.concentracion,
        purchasePrice: item.inventario[0]?.precio_compra ?? 0,
        discount: item.inventario[0]?.precio_descuento ?? 0,
        supplier: item.inventario[0]?.nombre_proveedor,
        supplierId: item.inventario[0]?.id_proveedor_id,
    };
    };
