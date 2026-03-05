export async function getMenuOptions () {
    const response = await fetch("src/data/selects/menuOptions.json");
    // ahora en vez de una sola opcion de trae un array de varios menus 
    // para que se puedan agrupar varios menus desplegables 
    const data = await response.json();
    return data;
}

