var formularioInicio = document.getElementById(
    "formularioInicio"
);
var nombreJugador = document.getElementById(
    "nombreJugador"
);
var nivelDificultad = document.getElementById(
    "nivelDificultad"
);
var mensajeErrorInicio = document.getElementById(
    "mensajeErrorInicio"
);
var botonIniciarPartida = document.getElementById(
    "botonIniciarPartida"
);
var inicioPartida = document.getElementById(
    "inicioPartida"
);
var seccionJuego = document.getElementById(
    "seccionJuego"
);
var jugadorActual = document.getElementById(
    "jugadorActual"
);
var nivelActual = document.getElementById(
    "nivelActual"
);
var botonCambiarDatos = document.getElementById(
    "botonCambiarDatos"
);
var botonVolverInicio = document.getElementById(
    "botonVolverInicio"
);

var personajesCargados = [];
var cartasPreparadas = [];

function limpiarMensajeInicio() {
    mensajeErrorInicio.textContent = "";
}

function mostrarMensajeInicio(mensaje) {
    mensajeErrorInicio.textContent = mensaje;
}

function bloquearBotonInicio() {
    botonIniciarPartida.disabled = true;
    botonIniciarPartida.textContent =
        "Cargando personajes...";
}

function restaurarBotonInicio() {
    botonIniciarPartida.disabled = false;
    botonIniciarPartida.textContent =
        "Comenzar partida";
}

function obtenerCantidadPersonajes(nivel) {
    if (nivel === "facil") {
        return 8;
    }

    if (nivel === "medio") {
        return 10;
    }

    if (nivel === "dificil") {
        return 18;
    }

    return 0;
}

function obtenerNombreNivel(nivel) {
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

function mostrarJuego(nombre, nivel) {
    jugadorActual.textContent = nombre.trim();
    nivelActual.textContent = obtenerNombreNivel(nivel);

    inicioPartida.hidden = true;
    seccionJuego.hidden = false;
    document.body.classList.add("partidaActiva");
}

async function procesarFormularioInicio(evento) {
    var nombreIngresado;
    var nivelElegido;
    var cantidadPersonajes;

    evento.preventDefault();

    limpiarMensajeInicio();

    nombreIngresado = nombreJugador.value;
    nivelElegido = nivelDificultad.value;

    if (validarNombreJugador(nombreIngresado) === false) {
        mostrarMensajeInicio(
            "El nombre debe tener al menos 3 caracteres."
        );

        nombreJugador.focus();

        return;
    }

    if (validarNivelDificultad(nivelElegido) === false) {
        mostrarMensajeInicio(
            "Seleccioná un nivel de dificultad."
        );

        nivelDificultad.focus();

        return;
    }

    cantidadPersonajes = obtenerCantidadPersonajes(
        nivelElegido
    );

    bloquearBotonInicio();

    try {
        personajesCargados = await obtenerPersonajes(
            cantidadPersonajes
        );

        cartasPreparadas = prepararCartas(
            personajesCargados
        );

        generarTablero(
            cartasPreparadas,
            nivelElegido,
            nombreIngresado
        );

        mostrarJuego(
            nombreIngresado,
            nivelElegido
        );
    } catch (error) {
        mostrarMensajeInicio(error.message);
    }

    restaurarBotonInicio();
}

function volverAlInicio() {
    limpiarPartidaActual();
    limpiarMensajeInicio();

    seccionJuego.hidden = true;
    inicioPartida.hidden = false;

    document.body.classList.remove("partidaActiva");

    nombreJugador.focus();
}

botonCambiarDatos.addEventListener(
    "click",
    volverAlInicio
);

formularioInicio.addEventListener(
    "submit",
    procesarFormularioInicio
);

botonVolverInicio.addEventListener(
    "click",
    volverAlInicio
);
botonReiniciarPartida.addEventListener(
    "click",
    reiniciarPartidaActual
);