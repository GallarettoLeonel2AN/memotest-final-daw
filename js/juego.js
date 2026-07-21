var primeraCartaSeleccionada = null;
var segundaCartaSeleccionada = null;
var tableroBloqueado = false;

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

function revelarCarta(elementoCarta) {
    elementoCarta.classList.add("cartaRevelada");
}

function ocultarCarta(elementoCarta) {
    elementoCarta.classList.remove("cartaRevelada");
}

function limpiarCartasSeleccionadas() {
    primeraCartaSeleccionada = null;
    segundaCartaSeleccionada = null;
    tableroBloqueado = false;
}

function procesarParejaCorrecta() {
    primeraCartaSeleccionada.disabled = true;
    segundaCartaSeleccionada.disabled = true;

    primeraCartaSeleccionada.classList.add(
        "cartaEmparejada"
    );

    segundaCartaSeleccionada.classList.add(
        "cartaEmparejada"
    );

    limpiarCartasSeleccionadas();
}

function ocultarCartasIncorrectas() {
    ocultarCarta(primeraCartaSeleccionada);
    ocultarCarta(segundaCartaSeleccionada);

    limpiarCartasSeleccionadas();
}

function procesarParejaIncorrecta() {
    setTimeout(ocultarCartasIncorrectas, 1000);
}

function compararCartasSeleccionadas() {
    var idPrimerPersonaje;
    var idSegundoPersonaje;

    idPrimerPersonaje =
        primeraCartaSeleccionada.getAttribute(
            "data-id-personaje"
        );

    idSegundoPersonaje =
        segundaCartaSeleccionada.getAttribute(
            "data-id-personaje"
        );

    if (idPrimerPersonaje === idSegundoPersonaje) {
        procesarParejaCorrecta();

        return;
    }

    procesarParejaIncorrecta();
}

function seleccionarCarta(evento) {
    var cartaSeleccionada;

    cartaSeleccionada = evento.currentTarget;

    if (tableroBloqueado === true) {
        return;
    }

    if (cartaSeleccionada === primeraCartaSeleccionada) {
        return;
    }

    revelarCarta(cartaSeleccionada);

    if (primeraCartaSeleccionada === null) {
        primeraCartaSeleccionada = cartaSeleccionada;

        return;
    }

    segundaCartaSeleccionada = cartaSeleccionada;
    tableroBloqueado = true;

    compararCartasSeleccionadas();
}

function crearElementoCarta(carta) {
    var elementoCarta;
    var reversoCarta;
    var imagenCarta;
    var nombreCarta;

    elementoCarta = document.createElement("button");
    reversoCarta = document.createElement("span");
    imagenCarta = document.createElement("img");
    nombreCarta = document.createElement("span");

    elementoCarta.type = "button";
    elementoCarta.className = "carta";

    elementoCarta.setAttribute(
        "data-id-carta",
        carta.idCarta
    );

    elementoCarta.setAttribute(
        "data-id-personaje",
        carta.idPersonaje
    );

    reversoCarta.className = "reversoCarta";
    reversoCarta.textContent = "?";

    imagenCarta.className = "imagenCarta";
    imagenCarta.src = carta.imagen;
    imagenCarta.alt = carta.nombre;

    nombreCarta.className = "nombreCarta";
    nombreCarta.textContent = carta.nombre;

    elementoCarta.appendChild(reversoCarta);
    elementoCarta.appendChild(imagenCarta);
    elementoCarta.appendChild(nombreCarta);

    elementoCarta.addEventListener(
        "click",
        seleccionarCarta
    );

    return elementoCarta;
}

function asignarClaseTablero(tablero, nivel) {
    tablero.className = "";

    if (nivel === "facil") {
        tablero.classList.add("tableroFacil");

        return;
    }

    if (nivel === "medio") {
        tablero.classList.add("tableroMedio");

        return;
    }

    if (nivel === "dificil") {
        tablero.classList.add("tableroDificil");
    }
}

function reiniciarSeleccionDeCartas() {
    primeraCartaSeleccionada = null;
    segundaCartaSeleccionada = null;
    tableroBloqueado = false;
}

function generarTablero(cartas, nivel) {
    var tablero;
    var indice;
    var elementoCarta;

    tablero = document.getElementById("tableroJuego");

    tablero.textContent = "";

    reiniciarSeleccionDeCartas();
    asignarClaseTablero(tablero, nivel);

    for (indice = 0; indice < cartas.length; indice++) {
        elementoCarta = crearElementoCarta(
            cartas[indice]
        );

        tablero.appendChild(elementoCarta);
    }
}