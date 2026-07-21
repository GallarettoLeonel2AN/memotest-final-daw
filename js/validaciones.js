function validarNombreJugador(nombre) {
    var nombreLimpio;

    nombreLimpio = nombre.trim();

    return nombreLimpio.length >= 3;
}

function validarNivelDificultad(nivel) {
    return nivel !== "";
}