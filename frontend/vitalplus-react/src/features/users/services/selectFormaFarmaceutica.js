export async function getFormaTypes () {
    const response = await fetch ("/src/data/selects/documentTypesForForma.json");

    return response.json();
}
