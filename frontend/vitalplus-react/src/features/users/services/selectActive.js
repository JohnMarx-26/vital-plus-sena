export async function getSelectActive () {
    const response = await fetch ("/src/data/selects/documentTypesActiveOrNo.json");

    return response.json();
}
