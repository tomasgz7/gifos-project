// Función autoejecutable: se ejecuta sola (automaticamente) al cargar el script
(function () {
  //Condición 1: Barra de navegación con dropdown que cambia el tema (día/noche)
  // Esperar siempre a que el DOM esté listo antes de buscar elementos
  // addEventListener escucha un evento (como clic o tecla)
  // y ejecuta la función cuando ese evento sucede.
  document.addEventListener("DOMContentLoaded", function () {
    const hojaEstilos = document.getElementById("hoja-estilos");
    const botonTema = document.getElementById("boton-tema");
    const menuTema = document.getElementById("menu-tema");
    const logo = document.getElementById("logo");

    // Si algo no existe, no hacemos nada
    if (!hojaEstilos || !botonTema || !menuTema) {
      console.warn(
        "Elementos del cambio de tema no encontrados en esta página."
      );
      return;
    }

    // Cargo el tema guardado o uso el de día por defecto
    let temaActual = localStorage.getItem("tema") || "day";
    aplicarTema(temaActual);

    // Abrir / cerrar menú
    botonTema.addEventListener("click", function (e) {
      e.stopPropagation();
      menuTema.classList.toggle("oculto");
    });

    // Cambiar tema al hacer clic en una opción
    menuTema.querySelectorAll("li").forEach(function (opcion) {
      opcion.addEventListener("click", function (e) {
        temaActual = e.target.getAttribute("data-tema");
        aplicarTema(temaActual);
        localStorage.setItem("tema", temaActual);
        menuTema.classList.add("oculto");
      });
    });

    // Cerrar menú si hago clic fuera
    document.addEventListener("click", function (e) {
      if (!menuTema.contains(e.target) && !botonTema.contains(e.target)) {
        menuTema.classList.add("oculto");
      }
    });

    function aplicarTema(tema) {
      // Cambiar hoja de estilo
      hojaEstilos.setAttribute("href", `styles/themes/${tema}.css`);

      // Cambiar logo según el tema
      if (logo) {
        logo.src =
          tema === "night"
            ? "assets/images/gifOF_logo_dark.png"
            : "assets/images/gifOF_logo.png";
      }
    }
  });
})();
