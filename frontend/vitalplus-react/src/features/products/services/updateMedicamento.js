const API_URL = "http://localhost:8000/api";

export const updateMedicamento = async (id, formData) => {
    const data = new FormData();

    // ============= Medicamento ===============
    data.append("nombre_medicamento", formData.productName);
    data.append("id_laboratorio", parseInt(formData.lab));
    data.append("concentracion", formData.concentration);
    data.append("requiere_formula", formData.requiresPrescription ? "Si" : "No");
    data.append("descripcion", formData.description);

    // Campos exclusivos de Medicamento
    if (formData.pharmaceuticalForm) {
        data.append("id_forma_farmaceutica", parseInt(formData.pharmaceuticalForm));
    }
    if (formData.presentation) {
        data.append("id_presentacion", parseInt(formData.presentation));
    }
    if (formData.administrationRoute) {
    data.append("id_via_administracion", parseInt(formData.administrationRoute));
    }

    // Categoría
    const idCategoria = formData.category ? parseInt(formData.category) : 1;
    data.append("id_categoria", idCategoria);

    // Imagen solo si el usuario subió una nueva
    if (formData.avatarFile) {
        data.append("imagen", formData.avatarFile);
    }

    // ========== Inventario ==========
    data.append("lote", formData.lotNumber);
    data.append("fecha_de_fabricacion", formData.manufacturingDate);
    data.append("fecha_de_vencimiento", formData.expirationDate);
    data.append("stock", formData.stock);
    data.append("precio_compra", formData.purchasePrice);
    data.append("precio_venta", formData.salePrice);
    data.append("precio_descuento", parseFloat(formData.salePriceDiscount || 0).toFixed(2));
    data.append("id_proveedor", formData.supplier);

    const response = await fetch(`${API_URL}/medicamentos/${id}/`, {
        method: "PATCH",
        body: data,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(JSON.stringify(error));
    }

    return await response.json();
    };