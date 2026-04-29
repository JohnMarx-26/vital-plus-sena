

export async function getSelectCity() {
    const response = await fetch ("/src/data/selects/documentTypesForCity.json");

    return response.json();
}
