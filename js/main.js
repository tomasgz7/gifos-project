// En este archivo me encargo de inicializar todo el sitio.
// Mi objetivo es asegurar que, al cargar la página, se activen
// correctamente las funciones de tema, búsqueda y cualquier otro módulo.

document.addEventListener("DOMContentLoaded", () => {
  // Primero verifico si existe la función de inicio del tema.
  // Esto permite que el modo Día/Noche se aplique automáticamente.
  if (typeof iniciarTema === "function") {
    iniciarTema();
  }

  // Luego verifico si está disponible la función de búsqueda.
  // Esto inicializa el buscador en la página principal.
  if (typeof iniciarBusqueda === "function") {
    iniciarBusqueda();
  }

  // En caso de que exista una función para mostrar GIFs sugeridos,
  // también la ejecuto aquí (esto mantiene el comportamiento del original).
  if (typeof iniciarSugerencias === "function") {
    iniciarSugerencias();
  }

  // Si existe la función para cargar los GIFs del usuario,
  // la llamo únicamente en la página “Mis GIFs”.
  if (typeof iniciarMisGifs === "function") {
    iniciarMisGifs();
  }

  // Y si estoy en la sección de grabación, activo la cámara.
  if (typeof iniciarGrabacion === "function") {
    iniciarGrabacion();
  }
});
