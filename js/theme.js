// En este documento manejo todo lo relacionado con el cambio de tema de la página.
// La idea es alternar entre los modos Día y Noche, cambiar el archivo CSS que se está usando,
// actualizar el logo según el tema, y guardar la preferencia en el localStorage
// para que se mantenga aunque se recargue la página.

function iniciarTema() {
  // Primero obtengo los elementos que voy a modificar.
  // "hojaEstilos" es el <link> que carga el CSS del tema.
  // "botonTema" es el botón que permite cambiar el modo.
  // "logo" es la imagen del logo que también cambia según el tema.
  const hojaEstilos = document.getElementById("hoja-estilos");
  const botonTema = document.getElementById("boton-tema");
  const logo = document.getElementById("logo");

  // Acá defino el tema inicial.
  // Si ya hay un tema guardado en el localStorage, lo uso.
  // Si no hay nada guardado, empiezo en "day".
  let temaActual = localStorage.getItem("tema") || "day";

  // Aplico el archivo CSS correspondiente según el tema.
  hojaEstilos.href = `styles/themes/${temaActual}.css`;

  // También cambio el logo según el tema actual.
  // Si estoy en modo noche, muestro el logo oscuro.
  // Si estoy en modo día, muestro el logo claro.
  if (logo) {
    logo.src =
      temaActual === "night"
        ? "assets/images/gifOF_logo_dark.png"
        : "assets/images/gifOF_logo.png";
  }

  // Por último, actualizo el texto del botón
  // para que diga “MODO DIURNO” si estoy en noche,
  // o “MODO NOCTURNO” si estoy en día.
  if (botonTema) {
    botonTema.textContent =
      temaActual === "night" ? "Sailor Day" : "Sailor Night";
  }

  // Ahora agrego el evento al botón para alternar el tema cuando lo presione.
  botonTema.addEventListener("click", () => {
    // Si el tema actual es "day", paso a "night".
    // Si es "night", vuelvo a "day".
    temaActual = temaActual === "day" ? "night" : "day";

    // Cambio la hoja de estilos para aplicar el nuevo tema.
    hojaEstilos.href = `styles/themes/${temaActual}.css`;

    // Guardo el tema actual en el localStorage
    // para que se mantenga la próxima vez que se abra la página.
    localStorage.setItem("tema", temaActual);

    // Actualizo el logo según el nuevo tema.
    if (logo) {
      logo.src =
        temaActual === "night"
          ? "assets/images/gifOF_logo_dark.png"
          : "assets/images/gifOF_logo.png";
    }

    // Actualizo el texto del botón según el nuevo tema.
    botonTema.textContent =
      temaActual === "night" ? "Sailor Day" : "Sailor Night";
  });
}

// Llamo a la función para que el tema se configure apenas se carga la página.
iniciarTema();
