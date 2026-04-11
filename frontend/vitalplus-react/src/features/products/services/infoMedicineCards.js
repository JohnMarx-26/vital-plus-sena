/*llamamos la informacion de la BD para generar dinamicamente las 
CARDS de medicamentos*/
export const getMedicamentos = async () => {
    const response = await fetch("http://localhost:8000/api/medicamentos/?estado=activo")
    const data = await response.json();

    /*creamos las categorias para que por base se muestre el ID pero
    nos renderice el nombre, porque para el front es las legible el nombre
    de la categoria que solo el ID de esta*/
    const categoryMap = {
        1: "medicinas",
        2: "dermatologia",
        3: "belleza",
        4: "cuidado-personal",
        5: "maternidad",
    }

    return data.map((item) => ({
    id: item.id_medicamento,
    lab: item.id_laboratorio?.nombre_laboratorio,
    title: item.nombre_medicamento,
    image: item.imagen_url,
    description: item.descripcion,
    //se deja por defecto la categoria de medicamento
    category: categoryMap[item.id_categoria?.id_categoria] ?? "medicinas",
    //presentacion farmaceutica
    presentation:item.id_presentacion?.nombre_presentacion,
    // estos vendrán del inventario cuando el serializer los incluya
    stock: item.inventario[0]?.stock ?? 0,
    price: item.inventario[0]?.precio_venta ?? 0,
    discount: item.inventario[0]?.precio_descuento ?? 0,
    }));
};



