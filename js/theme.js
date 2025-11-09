// En este documento manejo todo lo relacionado con la selección y cambio de tema.
// El objetivo es reproducir el comportamiento del proyecto original GIFOS:
// un botón “Elegir tema” que abre un menú con las opciones “Sailor Day” y “Sailor Night”.
// Al elegir una opción, se aplica el tema correspondiente, se actualiza el logo,
// y se guarda la preferencia en el localStorage para mantenerla al recargar la página.

function iniciarTema() {
  // Obtengo los elementos principales que voy a manipular.
  // "hojaEstilos" es el <link> donde cargo el archivo CSS del tema actual.
  // "botonTema" es el botón que abre el menú desplegable.
  // "menu" contiene las opciones de tema (Sailor Day / Sailor Night).
  // "logo" es la imagen principal que cambia según el tema.
  const hojaEstilos = document.getElementById("hoja-estilos");
  const botonTema = document.getElementById("boton-tema");
  const menu = document.getElementById("menu-tema");
  const logo = document.getElementById("logo");

  // Defino el tema inicial leyendo el valor guardado en localStorage.
  // Si no hay nada guardado, arranco con el modo “day”.
  let temaActual = localStorage.getItem("tema") || "day";

  // Aplico el archivo CSS que corresponde al tema guardado.
  hojaEstilos.href = `styles/themes/${temaActual}.css`;

  // Actualizo el logo según el tema actual.
  if (logo) {
    logo.src = temaActual === "night"
      ? "assets/images/gifOF_logo_dark.png"
      : "assets/images/gifOF_logo.png";
  }

  // Al hacer clic en el botón “Elegir tema”, muestro u oculto el menú desplegable.
  botonTema.addEventListener("click", () => {
    menu.classList.toggle("oculto");
  });

  // Escucho los clics dentro del menú de opciones.
  // Cuando elijo una opción, aplico el tema seleccionado.
  menu.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      // Guardo el nuevo tema seleccionado.
      temaActual = e.target.getAttribute("data-tema");

      // Aplico el CSS correspondiente.
      hojaEstilos.href = `styles/themes/${temaActual}.css`;

      // Cambio el logo según el nuevo tema.
      if (logo) {
        logo.src = temaActual === "night"
          ? "assets/images/gifOF_logo_dark.png"
          : "assets/images/gifOF_logo.png";
      }

      // Guardo la elección en localStorage.
      localStorage.setItem("tema", temaActual);

      // Cierro el menú después de hacer clic.
      menu.classList.add("oculto");
    }
  });

  // Cierro el menú si hago clic fuera del contenedor de tema.
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".contenedor-tema")) {
      menu.classList.add("oculto");
    }
  });
}

// Llamo a la función apenas se carga la página
// para aplicar el tema guardado y dejar todo listo.
iniciarTema();
