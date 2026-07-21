var primeraCartaSeleccionada = null;
var segundaCartaSeleccionada = null;
var intentos = 0;
var errores = 0;
var paresEncontrados = 0;
var puntaje = 0;
var nivelActualJuego = "";
var totalParesJuego = 0;
var tableroBloqueado = false;

var cantidadIntentosElemento = document.getElementById(
    "cantidadIntentos"
);
var cantidadErroresElemento = document.getElementById(
    "cantidadErrores"
);
var cantidadParesEncontradosElemento = document.getElementById(
    "cantidadParesEncontrados"
);
var cantidadTotalParesElemento = document.getElementById(
    "cantidadTotalPares"
);
var puntajeActualElemento = document.getElementById(
    "puntajeActual"
);

function obtenerPenalizacion(nivel) {
    if (nivel === "facil") {
        return 10;
    }

    if (nivel === "medio") {
        return 20;
    }

    if (nivel === "dificil") {
        return 30;
    }

    return 0;
}

function actualizarEstadisticas() {
    cantidadIntentosElemento.textContent = intentos;
    cantidadErroresElemento.textContent = errores;
    cantidadParesEncontradosElemento.textContent =
        paresEncontrados;
    cantidadTotalParesElemento.textContent =
        totalParesJuego;
    puntajeActualElemento.textContent = puntaje;
}

function reiniciarEstadisticas(nivel, totalPares) {
    intentos = 0;
    errores = 0;
    paresEncontrados = 0;
    puntaje = 0;
    nivelActualJuego = nivel;
    totalParesJuego = totalPares;

    actualizarEstadisticas();
}
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
    paresEncontrados++;
    puntaje = puntaje + 100;

    primeraCartaSeleccionada.disabled = true;
    segundaCartaSeleccionada.disabled = true;

    primeraCartaSeleccionada.classList.add(
        "cartaEmparejada"
    );

    segundaCartaSeleccionada.classList.add(
        "cartaEmparejada"
    );

    actualizarEstadisticas();
    limpiarCartasSeleccionadas();
}

function ocultarCartasIncorrectas() {
    ocultarCarta(primeraCartaSeleccionada);
    ocultarCarta(segundaCartaSeleccionada);

    limpiarCartasSeleccionadas();
}

function procesarParejaIncorrecta() {
    var penalizacion;

    errores++;

    penalizacion = obtenerPenalizacion(
        nivelActualJuego
    );

    puntaje = puntaje - penalizacion;

    if (puntaje < 0) {
        puntaje = 0;
    }

    actualizarEstadisticas();

    setTimeout(ocultarCartasIncorrectas, 1000);
}

function compararCartasSeleccionadas() {
    var idPrimerPersonaje;
    var idSegundoPersonaje;

    intentos++;

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
    var cantidadPares;

    tablero = document.getElementById("tableroJuego");

    tablero.textContent = "";

    cantidadPares = cartas.length / 2;

    reiniciarSeleccionDeCartas();
    reiniciarEstadisticas(nivel, cantidadPares);
    asignarClaseTablero(tablero, nivel);

    for (indice = 0; indice < cartas.length; indice++) {
        elementoCarta = crearElementoCarta(
            cartas[indice]
        );

        tablero.appendChild(elementoCarta);
    }
}