async function obtenerPersonajes(cantidad) {
    var direccionApi;
    var respuesta;
    var datos;

    direccionApi =
        "https://dragonball-api.com/api/characters?limit=" +
        cantidad;

    respuesta = await fetch(direccionApi);

    if (respuesta.ok === false) {
        throw new Error(
            "No se pudieron obtener los personajes de Dragon Ball."
        );
    }

    datos = await respuesta.json();

    if (datos.items === undefined) {
        throw new Error(
            "La API no devolvió una lista de personajes válida."
        );
    }

    if (datos.items.length < cantidad) {
        throw new Error(
            "La API no devolvió suficientes personajes."
        );
    }

    return datos.items;
}