export async function getViaTypes () {
    const response = await fetch ("/src/data/selects/documentTypesForVia.json");

    return response.json();
}
