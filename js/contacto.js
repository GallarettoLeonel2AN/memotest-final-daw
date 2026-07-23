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
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9 ]+$/;

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
            "Ingresá un nombre alfanumérico.";

        formularioValido = false;
    }

    if (validarCorreoContacto(correoContacto.value) === false) {
        errorCorreoContacto.textContent =
            "Ingresá un correo electrónico válido.";

        formularioValido = false;
    }

    if (validarMensajeContacto(mensajeContacto.value) === false) {
        errorMensajeContacto.textContent =
            "El mensaje debe tener más de 5 caracteres.";

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
            "Revisá los campos marcados.";

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