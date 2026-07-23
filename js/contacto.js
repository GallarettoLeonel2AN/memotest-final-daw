var formularioContacto = document.getElementById(
    "formularioContacto"
);

var nombreContacto = document.getElementById(
    "nombreContacto"
);

var correoContacto = document.getElementById(
    "correoContacto"
);

var mensajeContacto = document.getElementById(
    "mensajeContacto"
);

var errorNombreContacto = document.getElementById(
    "errorNombreContacto"
);

var errorCorreoContacto = document.getElementById(
    "errorCorreoContacto"
);

var errorMensajeContacto = document.getElementById(
    "errorMensajeContacto"
);

var resultadoFormularioContacto = document.getElementById(
    "resultadoFormularioContacto"
);

function limpiarErroresContacto() {
    errorNombreContacto.textContent = "";
    errorCorreoContacto.textContent = "";
    errorMensajeContacto.textContent = "";
    resultadoFormularioContacto.textContent = "";
}

function validarNombreContacto(nombre) {
    var expresionNombre;
    var nombreLimpio;

    expresionNombre =
        /^[a-zA-Z\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00f1\u00d10-9 ]+$/;

    nombreLimpio = nombre.trim();

    if (nombreLimpio.length === 0) {
        return false;
    }

    return expresionNombre.test(nombreLimpio);
}

function validarCorreoContacto(correo) {
    var expresionCorreo;
    var correoLimpio;

    expresionCorreo =
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    correoLimpio = correo.trim();

    return expresionCorreo.test(correoLimpio);
}

function validarMensajeContacto(mensaje) {
    var mensajeLimpio;

    mensajeLimpio = mensaje.trim();

    return mensajeLimpio.length > 5;
}

function validarFormularioContacto() {
    var formularioValido;

    formularioValido = true;

    if (validarNombreContacto(nombreContacto.value) === false) {
        errorNombreContacto.textContent =
            "Ingres\u00e1 un nombre alfanum\u00e9rico.";

        formularioValido = false;
    }

    if (validarCorreoContacto(correoContacto.value) === false) {
        errorCorreoContacto.textContent =
            "Ingres\u00e1 un correo electr\u00f3nico v\u00e1lido.";

        formularioValido = false;
    }

    if (validarMensajeContacto(mensajeContacto.value) === false) {
        errorMensajeContacto.textContent =
            "El mensaje debe tener m\u00e1s de 5 caracteres.";

        formularioValido = false;
    }

    return formularioValido;
}

function crearDireccionCorreo() {
    var correoDestino;
    var asunto;
    var cuerpoMensaje;
    var direccionCorreo;

    correoDestino = "dragonballmemotest@akiratoriyama.com";

    asunto = "Consulta de " + nombreContacto.value.trim();

    cuerpoMensaje =
        "Nombre: " +
        nombreContacto.value.trim() +
        "\n" +
        "Correo: " +
        correoContacto.value.trim() +
        "\n\n" +
        "Mensaje:\n" +
        mensajeContacto.value.trim();

    direccionCorreo =
        "mailto:" +
        correoDestino +
        "?subject=" +
        encodeURIComponent(asunto) +
        "&body=" +
        encodeURIComponent(cuerpoMensaje);

    return direccionCorreo;
}

function enviarFormularioContacto(evento) {
    var direccionCorreo;

    evento.preventDefault();

    limpiarErroresContacto();

    if (validarFormularioContacto() === false) {
        resultadoFormularioContacto.textContent =
            "Revis\u00e1 los campos marcados.";

        return;
    }

    resultadoFormularioContacto.textContent =
        "Los datos son correctos. Abriendo el correo...";

    direccionCorreo = crearDireccionCorreo();

    window.location.href = direccionCorreo;
}

formularioContacto.addEventListener(
    "submit",
    enviarFormularioContacto
);
