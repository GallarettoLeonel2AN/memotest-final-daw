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
var nivelesProgresivos = [
    "facil",
    "medio",
    "dificil"
];

var indiceNivelProgresivo = 0;
var nombreJugadorProgresivo = "";
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

    if (nivel === "progresivo") {
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
function generarNivelProgresivo() {
    var nivel;
    var cantidadPersonajes;
    var personajesNivel;

    nivel = nivelesProgresivos[
        indiceNivelProgresivo
    ];

    cantidadPersonajes = obtenerCantidadPersonajes(
        nivel
    );

    personajesNivel = personajesCargados.slice(
        0,
        cantidadPersonajes
    );

    cartasPreparadas = prepararCartas(
        personajesNivel
    );

    generarTablero(
        cartasPreparadas,
        nivel,
        nombreJugadorProgresivo
    );

    mostrarJuego(
        nombreJugadorProgresivo,
        nivel
    );

    nivelActual.textContent =
        "Progresivo - " +
        obtenerNombreNivel(nivel);
}

function iniciarModoProgresivo(nombre) {
    indiceNivelProgresivo = 0;
    nombreJugadorProgresivo = nombre.trim();

    iniciarModoProgresivoJuego();
    generarNivelProgresivo();
}

function avanzarNivelProgresivo() {
    indiceNivelProgresivo++;

    if (
        indiceNivelProgresivo <
        nivelesProgresivos.length
    ) {
        generarNivelProgresivo();
    }
}

function reiniciarModoProgresivoCompleto() {
    indiceNivelProgresivo = 0;

    iniciarModoProgresivoJuego();
    generarNivelProgresivo();
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

        if (nivelElegido === "progresivo") {
            iniciarModoProgresivo(
                nombreIngresado
            );
        } else {
            iniciarModoNormalJuego();

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
        }
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