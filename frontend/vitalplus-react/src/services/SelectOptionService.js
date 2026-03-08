let MenuCache = null;


export async function getMenuOptions () {

    //crea un cache de las rutas o paginas ya visitadas evitan que se reinicie
    //en cada momento el fetch, esto para que no me muestre siempre el sideBar
    if(MenuCache){
        return MenuCache;
    }
    const response = await fetch(
        new URL("/documentTypesForMenu.json", import.meta.url));

        if (!response.ok) {
            throw new Error("No se pudo cargar el menú");
        };
    // ahora en vez de una sola opcion de trae un array de varios menus 
    // para que se puedan agrupar varios menus desplegables 
    const data = await response.json();

    MenuCache = data;

    return data;
}

