var botonModoColor = document.getElementById(
    "botonModoColor"
);

var claveModoColor = "modoColorDragonBall";

function obtenerModoColorGuardado() {
    var modoGuardado;

    try {
        modoGuardado = localStorage.getItem(
            claveModoColor
        );
    } catch (error) {
        modoGuardado = "";
    }

    if (modoGuardado === "noche") {
        return "noche";
    }

    return "dia";
}

function guardarModoColor(modoColor) {
    try {
        localStorage.setItem(
            claveModoColor,
            modoColor
        );
    } catch (error) {
        return;
    }
}

function actualizarBotonModoColor(modoColor) {
    if (botonModoColor === null) {
        return;
    }

    if (modoColor === "noche") {
        botonModoColor.textContent = "";
        botonModoColor.setAttribute(
            "aria-pressed",
            "true"
        );
        botonModoColor.setAttribute(
            "aria-label",
            "Cambiar a modo d\u00eda"
        );

        return;
    }

    botonModoColor.textContent = "";
    botonModoColor.setAttribute(
        "aria-pressed",
        "false"
    );
    botonModoColor.setAttribute(
        "aria-label",
        "Cambiar a modo noche"
    );
}

function aplicarModoColor(modoColor) {
    document.documentElement.classList.remove("modoDia");
    document.body.classList.remove("modoDia");

    if (modoColor === "noche") {
        document.documentElement.classList.add("modoNoche");
        document.body.classList.add("modoNoche");
    } else {
        document.documentElement.classList.remove("modoNoche");
        document.body.classList.remove("modoNoche");
    }

    actualizarBotonModoColor(modoColor);
}

function alternarModoColor() {
    var nuevoModoColor;

    if (document.documentElement.classList.contains("modoNoche")) {
        nuevoModoColor = "dia";
    } else {
        nuevoModoColor = "noche";
    }

    aplicarModoColor(nuevoModoColor);
    guardarModoColor(nuevoModoColor);
}

aplicarModoColor(
    obtenerModoColorGuardado()
);

if (botonModoColor !== null) {
    botonModoColor.addEventListener(
        "click",
        alternarModoColor
    );
}
