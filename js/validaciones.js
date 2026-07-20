var formularioInicio = document.getElementById("formularioInicio");
var nombreJugador = document.getElementById("nombreJugador");
var nivelDificultad = document.getElementById("nivelDificultad");
var mensajeErrorInicio = document.getElementById("mensajeErrorInicio");

function limpiarMensajeError() {
    mensajeErrorInicio.textContent = "";
}

function mostrarMensajeError(mensaje) {
    mensajeErrorInicio.textContent = mensaje;
}

function validarNombreJugador(nombre) {
    var nombreLimpio;

    nombreLimpio = nombre.trim();

    return nombreLimpio.length >= 3;
}

function validarNivelDificultad(nivel) {
    return nivel !== "";
}

function validarFormularioInicio(evento) {
    var nombreIngresado;
    var nivelElegido;

    evento.preventDefault();

    limpiarMensajeError();

    nombreIngresado = nombreJugador.value;
    nivelElegido = nivelDificultad.value;

    if (validarNombreJugador(nombreIngresado) === false) {
        mostrarMensajeError(
            "El nombre debe tener al menos 3 caracteres."
        );

        nombreJugador.focus();

        return;
    }

    if (validarNivelDificultad(nivelElegido) === false) {
        mostrarMensajeError(
            "Seleccioná un nivel de dificultad."
        );

        nivelDificultad.focus();

        return;
    }

    mostrarMensajeError(
        "Datos correctos. La partida está lista para comenzar."
    );
}

formularioInicio.addEventListener(
    "submit",
    validarFormularioInicio
);