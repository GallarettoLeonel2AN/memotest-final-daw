var primeraCartaSeleccionada = null;
var segundaCartaSeleccionada = null;
var intentos = 0;
var errores = 0;
var paresEncontrados = 0;
var puntaje = 0;
var nivelActualJuego = "";
var nombreJugadorActualJuego = "";
var totalParesJuego = 0;
var tableroBloqueado = false;
var segundosTranscurridos = 0;
var identificadorTemporizador = null;
var temporizadorIniciado = false;


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
var tiempoPartidaElemento = document.getElementById(
    "tiempoPartida"
);
var modalResultado = document.getElementById(
    "modalResultado"
);
var resultadoJugador = document.getElementById(
    "resultadoJugador"
);
var resultadoNivel = document.getElementById(
    "resultadoNivel"
);
var resultadoIntentos = document.getElementById(
    "resultadoIntentos"
);
var resultadoErrores = document.getElementById(
    "resultadoErrores"
);
var resultadoTiempo = document.getElementById(
    "resultadoTiempo"
);
var resultadoPuntaje = document.getElementById(
    "resultadoPuntaje"
);
var botonJugarDeNuevo = document.getElementById(
    "botonJugarDeNuevo"
);

var botonReiniciarPartida = document.getElementById(
    "botonReiniciarPartida"
);

var botonVolverInicio = document.getElementById(
    "botonVolverInicio"
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

function obtenerNombreNivelResultado(nivel) {
    if (nivel === "facil") {
        return "Fácil";
    }

    if (nivel === "medio") {
        return "Medio";
    }

    if (nivel === "dificil") {
        return "Difícil";
    }

    return "";
}

function calcularPuntajeFinal() {
    puntaje = puntaje + 300;
    puntaje = puntaje - segundosTranscurridos;

    if (puntaje < 0) {
        puntaje = 0;
    }

    actualizarEstadisticas();
}

function mostrarResultadoFinal() {
    resultadoJugador.textContent =
        nombreJugadorActualJuego;

    resultadoNivel.textContent =
        obtenerNombreNivelResultado(nivelActualJuego);

    resultadoIntentos.textContent = intentos;
    resultadoErrores.textContent = errores;

    resultadoTiempo.textContent = formatearTiempo(
        segundosTranscurridos
    );

    resultadoPuntaje.textContent = puntaje;

    modalResultado.hidden = false;
}

function verificarFinPartida() {
    if (paresEncontrados === totalParesJuego) {
        tableroBloqueado = true;

        detenerTemporizador();
        calcularPuntajeFinal();
        mostrarResultadoFinal();
    }
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
    verificarFinPartida();
}

function ocultarCartasIncorrectas() {
    ocultarCarta(primeraCartaSeleccionada);
    ocultarCarta(segundaCartaSeleccionada);

    limpiarCartasSeleccionadas();
    desbloquearAccionesPartida();
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
    bloquearAccionesPartida();

    setTimeout(
        ocultarCartasIncorrectas,
        1000
    );
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
        iniciarTemporizador();

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

function formatearTiempo(segundos) {
    var minutos;
    var segundosRestantes;
    var minutosTexto;
    var segundosTexto;

    minutos = Math.floor(segundos / 60);
    segundosRestantes = segundos % 60;

    minutosTexto = minutos.toString();
    segundosTexto = segundosRestantes.toString();

    if (minutos < 10) {
        minutosTexto = "0" + minutosTexto;
    }

    if (segundosRestantes < 10) {
        segundosTexto = "0" + segundosTexto;
    }

    return minutosTexto + ":" + segundosTexto;
}

function actualizarTemporizador() {
    tiempoPartidaElemento.textContent = formatearTiempo(
        segundosTranscurridos
    );
}

function aumentarTiempo() {
    segundosTranscurridos++;

    actualizarTemporizador();
}

function iniciarTemporizador() {
    if (temporizadorIniciado === true) {
        return;
    }

    temporizadorIniciado = true;

    identificadorTemporizador = setInterval(
        aumentarTiempo,
        1000
    );
}

function detenerTemporizador() {
    if (identificadorTemporizador !== null) {
        clearInterval(identificadorTemporizador);
    }

    identificadorTemporizador = null;
    temporizadorIniciado = false;
}

function reiniciarTemporizador() {
    detenerTemporizador();

    segundosTranscurridos = 0;

    actualizarTemporizador();
}

function generarTablero(cartas, nivel , nombreJugador) {
    var tablero;
    var indice;
    var elementoCarta;
    var cantidadPares;

    tablero = document.getElementById("tableroJuego");

    tablero.textContent = "";

    cartasJuegoActual = cartas.slice();

    cantidadPares = cartas.length / 2;

    nombreJugadorActualJuego = nombreJugador.trim();
    modalResultado.hidden = true;

    reiniciarSeleccionDeCartas();
    reiniciarEstadisticas(nivel, cantidadPares);
    reiniciarTemporizador();
    asignarClaseTablero(tablero, nivel);
    desbloquearAccionesPartida();

    for (indice = 0; indice < cartas.length; indice++) {
        elementoCarta = crearElementoCarta(
            cartas[indice]
        );

        tablero.appendChild(elementoCarta);
    }
}

function reiniciarPartidaActual() {
    var cartasMezcladas;

    cartasMezcladas = mezclarCartas(
        cartasJuegoActual.slice()
    );

    generarTablero(
        cartasMezcladas,
        nivelActualJuego,
        nombreJugadorActualJuego
    );
}

function limpiarPartidaActual() {
    var tablero;

    tablero = document.getElementById("tableroJuego");

    reiniciarSeleccionDeCartas();
    reiniciarEstadisticas("", 0);
    reiniciarTemporizador();

    cartasJuegoActual = [];
    nombreJugadorActualJuego = "";

    tablero.textContent = "";
    modalResultado.hidden = true;
}

function bloquearAccionesPartida() {
    botonReiniciarPartida.disabled = true;
    botonVolverInicio.disabled = true;
}

function desbloquearAccionesPartida() {
    botonReiniciarPartida.disabled = false;
    botonVolverInicio.disabled = false;
}

botonJugarDeNuevo.addEventListener(
    "click",
    reiniciarPartidaActual
);
