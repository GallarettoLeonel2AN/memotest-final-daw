# Dragon Ball Memotest

Juego de memoria desarrollado como proyecto final para la materia Desarrollo y Arquitecturas Web.

El objetivo es encontrar todos los pares de personajes de Dragon Ball en el menor tiempo posible, con la menor cantidad de errores y el mayor puntaje.

## Aplicación

- [Jugar Dragon Ball Memotest](https://gallarettoleonel2an.github.io/memotest-final-daw/)
- [Repositorio de GitHub](https://github.com/GallarettoLeonel2AN/memotest-final-daw)

## Temática

El juego utiliza personajes obtenidos desde Dragon Ball API. Cada personaje se duplica para formar un par y las cartas se mezclan aleatoriamente antes de comenzar.

## Reglas

1. Ingresar un nombre de al menos 3 caracteres.
2. Seleccionar una dificultad o el modo progresivo.
3. Revelar dos cartas por turno.
4. Si representan al mismo personaje, quedan descubiertas.
5. Si no coinciden, vuelven a ocultarse después de un segundo.
6. La partida termina al encontrar todos los pares.

## Niveles

| Nivel | Cartas | Pares | Penalización por error |
|---|---:|---:|---:|
| Fácil | 16 | 8 | -10 puntos |
| Medio | 20 | 10 | -20 puntos |
| Difícil | 36 | 18 | -30 puntos |

## Modo progresivo

El modo progresivo comienza en nivel fácil, continúa en nivel medio y finaliza en nivel difícil.

Al completar cada tablero se muestra un resultado intermedio y el jugador puede avanzar al siguiente nivel sin recargar la página.

El puntaje, los intentos, los errores y el tiempo se acumulan entre los tres niveles. Al completar el nivel difícil se muestra el resultado general.

## Sistema de puntaje

- Par correcto: +100 puntos.
- Error: resta puntos según la dificultad.
- Bonus por completar un nivel: +300 puntos.
- Penalización final: -1 punto por cada segundo transcurrido.
- El puntaje mínimo es 0.

## Funcionalidades

- Validación de nombre y dificultad.
- Consumo de Dragon Ball API.
- Tablero generado dinámicamente.
- Mezcla aleatoria de cartas.
- Tres niveles de dificultad.
- Modo progresivo.
- Comparación de pares.
- Bloqueo temporal del tablero.
- Intentos, errores, pares, puntaje y temporizador.
- Modal de resultado final.
- Reinicio sin recargar la página.
- Opción para jugar nuevamente o cambiar los datos.
- Página de contacto con validaciones.
- Navegación entre páginas.
- Enlaces a GitHub y GitHub Pages.
- Diseño responsive con Flexbox.

## API utilizada

Endpoint:

```text
https://dragonball-api.com/api/characters
```

Datos utilizados:

- `id`
- `name`
- `image`

## Tecnologías

- HTML5
- CSS3
- JavaScript
- Flexbox
- Dragon Ball API
- Git
- GitHub
- GitHub Pages

## Organización del proyecto

```text
dragon-ball-memotest/
├── assets/
│   ├── fonts/
│   └── img/
├── css/
│   ├── reset.css
│   └── estilos.css
├── js/
│   ├── api-dragon-ball.js
│   ├── contacto.js
│   ├── juego.js
│   ├── principal.js
│   └── validaciones.js
├── pages/
│   └── contacto.html
├── index.html
├── README.md
└── .gitignore
```

## Integrantes

- Sosa Ulises
- Terrazzino Franco
- Gallaretto Leonel

## Materia

Desarrollo y Arquitecturas Web  
Ingeniería en Sistemas Informáticos  
Universidad Abierta Interamericana  
2026
