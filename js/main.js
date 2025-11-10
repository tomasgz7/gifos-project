// Este archivo coordina la ejecución de los distintos módulos:
// - Cambio de tema (theme.js)
// - Búsqueda (search.js)
// - Grabación y subida de GIFs (record.js + upload.js)
// - Mis GIFs (mis-gifs.js)
// - Secciones dinámicas del inicio (sugerencias y tendencias)



// Espera a que todo el DOM esté listo antes de inicializar las funciones
// Condición 3: Inicialización dinámica de módulos al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  // Inicialización del tema (día / noche)

  if (typeof iniciarTema === "function") {
    try {
      iniciarTema();
    } catch (e) {
      console.warn(" No se pudo iniciar el tema automáticamente:", e);
    }
  } else {
    // Si theme.js cargó después, lo lanzo al final de la carga
    window.addEventListener("load", () => {
      if (typeof iniciarTema === "function") iniciarTema();
    });
  }

  // Lógica de búsqueda (solo en index.html)

  const inputBusqueda = document.getElementById("entrada-busqueda");
  if (inputBusqueda && typeof iniciarBusqueda === "function") {
    iniciarBusqueda();
  }

  //  Grabación y subida de GIFs (solo en crear-gif.html)

  const vistaCamara = document.getElementById("vista-previa-camara");
  if (vistaCamara) {
    if (typeof iniciarGrabacion === "function") iniciarGrabacion();
    if (typeof iniciarSubida === "function") iniciarSubida();
  }

  //  Cargar Mis GIFs (solo en mis-gifs.html)

  const contenedorMisGifs = document.getElementById("contenedor-mis-gifs");
  if (contenedorMisGifs && typeof cargarMisGifs === "function") {
    cargarMisGifs();
  }

  // Secciones dinámicas del inicio (solo en index.html)

  if (document.getElementById("suggestions")) cargarSugerencias();
  if (document.getElementById("trends")) cargarTendencias();
});

//  SECCIÓN: “LOS MÁS BUSCADOS” (SUGERENCIAS)
//  Condición 6: Tarjetas de sugerencias con botón "Ver más" desde la API
// fetch realiza un GET a la API de Giphy y forEach recorre los resultados
async function cargarSugerencias() {
  try {
    const endpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=4&rating=g`;
    const respuesta = await fetch(endpoint);
    const { data } = await respuesta.json();

    const contenedor = document.getElementById("suggestions");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    data.forEach((gif) => {
      const contenedorGif = document.createElement("div");
      contenedorGif.classList.add("ventana");

      const tituloGif = gif.title.split(" ")[0] || "GIF";

      contenedorGif.innerHTML = `
        <div class="contenedor-titulo">
          <p class="titulo">#${tituloGif}</p>
        </div>
        <div class="contenedor-barra">
          <img src="${gif.images.fixed_height.url}" alt="${gif.title}" class="imagen-sugerencias" />
        </div>
        <div class="contenedor-boton-vermas">
          <button class="boton-vermas" data-busqueda="${tituloGif}">Ver más...</button>
        </div>
      `;

      contenedor.appendChild(contenedorGif);
    });

    // Botones “Ver más” → reutilizan la función buscarGifs() de search.js
    document.querySelectorAll(".boton-vermas").forEach((boton) => {
      boton.addEventListener("click", (e) => {
        const termino = e.target.getAttribute("data-busqueda");
        const contenedorResultados = document.getElementById(
          "contenedor-resultados"
        );

        if (typeof buscarGifs === "function") {
          buscarGifs(termino, contenedorResultados);
        } else {
          console.error(
            " No se encontró la función buscarGifs del módulo search.js"
          );
        }
      });
    });
  } catch (error) {
    console.error(" Error cargando sugerencias:", error);
  }
}

// SECCIÓN: “TENDENCIAS”
//Condición 4: Galería de tendencias traída desde la API de Giphy
// fetch sirve para hacer una petición GET a una API (traer datos)
// async/await permite esperar la respuesta antes de continuar
// response.json convierte la respuesta en un formato que JS pueda usar
// innerHTML se usa para agregar o limpiar contenido HTML dentro de un elemento
// forEach recorre cada GIF y lo agrega dinámicamente al contenedor
async function cargarTendencias() {
  try {
    const endpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=12&rating=g`;
    const respuesta = await fetch(endpoint);
    const { data } = await respuesta.json();

    const contenedor = document.getElementById("trends");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    data.forEach((gif) => {
      const gifItem = document.createElement("div");
      gifItem.classList.add("gif-container");

      gifItem.innerHTML = `
        <img src="${gif.images.fixed_height.url}" alt="${gif.title}" class="trending-gif" />
      `;

      contenedor.appendChild(gifItem);
    });
  } catch (error) {
    console.error("Error cargando tendencias:", error);
  }
}

//  UTILIDADES

function logEstado(mensaje) {
  console.log(`🔹 [GifOS] ${mensaje}`);
}
