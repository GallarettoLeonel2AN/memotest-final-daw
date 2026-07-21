function crearParesDeCartas(personajes) {
    var cartas;
    var indice;
    var personaje;
    var primeraCarta;
    var segundaCarta;

    cartas = [];

    for (indice = 0; indice < personajes.length; indice++) {
        personaje = personajes[indice];

        primeraCarta = {
            idCarta: personaje.id + "-a",
            idPersonaje: personaje.id,
            nombre: personaje.name,
            imagen: personaje.image,
            emparejada: false
        };

        segundaCarta = {
            idCarta: personaje.id + "-b",
            idPersonaje: personaje.id,
            nombre: personaje.name,
            imagen: personaje.image,
            emparejada: false
        };

        cartas.push(primeraCarta);
        cartas.push(segundaCarta);
    }

    return cartas;
}

function mezclarCartas(cartas) {
    var indice;
    var indiceAleatorio;
    var cartaTemporal;

    for (indice = cartas.length - 1; indice > 0; indice--) {
        indiceAleatorio = Math.floor(
            Math.random() * (indice + 1)
        );

        cartaTemporal = cartas[indice];
        cartas[indice] = cartas[indiceAleatorio];
        cartas[indiceAleatorio] = cartaTemporal;
    }

    return cartas;
}

function prepararCartas(personajes) {
    var cartas;

    cartas = crearParesDeCartas(personajes);
    cartas = mezclarCartas(cartas);

    return cartas;
}