export async function getUserTypes () {
    const response = await fetch ("/src/data/selects/documentTypesForRegister.json");

    return response.json();
}
