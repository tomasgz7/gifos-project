// MAIN.JS — Inicialización general de la aplicación GifOS

//
// Este archivo coordina la ejecución de los distintos módulos:
// - Cambio de tema (theme.js)
// - Búsqueda (search.js)
// - Grabación y subida de GIFs (record.js + upload.js)
// - Mis GIFs (mis-gifs.js)
// - Secciones dinámicas del inicio (sugerencias y tendencias)
//

const API_KEY = "1rUtXF100IXzkDpmrvSnphzoJ3hjYNi9";

// Espera a que todo el DOM esté listo antes de inicializar las funciones
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
