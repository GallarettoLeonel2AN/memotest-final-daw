var formularioInicio = document.getElementById("formularioInicio");
var nombreJugador = document.getElementById("nombreJugador");
var nivelDificultad = document.getElementById("nivelDificultad");
var mensajeErrorInicio = document.getElementById(
    "mensajeErrorInicio"
);
var botonIniciarPartida = document.getElementById(
    "botonIniciarPartida"
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
    botonIniciarPartida.textContent = "Cargando personajes...";
}

function restaurarBotonInicio() {
    botonIniciarPartida.disabled = false;
    botonIniciarPartida.textContent = "Comenzar partida";
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

    mostrarMensajeInicio(
        "Se prepararon " +
        cartasPreparadas.length +
        " cartas correctamente."
    );
    } catch (error) {
        mostrarMensajeInicio(error.message);
    }

    restaurarBotonInicio();
}

formularioInicio.addEventListener(
    "submit",
    procesarFormularioInicio
);