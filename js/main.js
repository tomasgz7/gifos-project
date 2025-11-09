// En este archivo manejo toda la inicialización general de mi aplicación GifOS.
// Aquí controlo qué funciones se ejecutan en cada página, y cargo las secciones dinámicas
// como “Los más buscados” y “Tendencias”, igual que en el proyecto original.

const API_KEY = "uHjVQ12FGcuONBHKMciylcBpPRg88ED5";

document.addEventListener("DOMContentLoaded", () => {
  // Inicializo el tema (día/noche)
  if (typeof iniciarTema === "function") iniciarTema();

  // Si existe el buscador, activo la búsqueda (desde search.js)
  if (
    document.getElementById("entrada-busqueda") &&
    typeof iniciarBusqueda === "function"
  ) {
    iniciarBusqueda();
  }

  // Si estoy en la vista de creación de GIFs, activo la cámara
  if (
    document.getElementById("vista-previa-camara") &&
    typeof iniciarGrabacion === "function"
  ) {
    iniciarGrabacion();
  }

  // Si estoy en la sección "Mis GIFs"
  if (
    document.getElementById("contenedor-mis-gifs") &&
    typeof cargarMisGifs === "function"
  ) {
    cargarMisGifs();
  }

  // Cargo las secciones dinámicas del Home
  cargarSugerencias();
  cargarTendencias();
});

// =============================================================
// SECCIÓN: “LOS MÁS BUSCADOS” (SUGERENCIAS)
// =============================================================

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
          <button class="boton-vermas" data-busqueda="${tituloGif}">Ver más...</button>
        </div>
        <div class="contenedor-barra">
          <img src="${gif.images.fixed_height.url}" alt="${gif.title}" class="imagen-sugerencias" />
        </div>
      `;

      contenedor.appendChild(contenedorGif);
    });

    // Los botones "Ver más" llaman a la función del módulo de búsqueda (search.js)
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
            "No se encontró la función buscarGifs del módulo de búsqueda."
          );
        }
      });
    });
  } catch (error) {
    console.error("Error cargando sugerencias:", error);
  }
}

// =============================================================
// SECCIÓN: “TENDENCIAS”
// =============================================================

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

// =============================================================
// UTILIDADES
// =============================================================

function logEstado(mensaje) {
  console.log(`🔹 [GifOS] ${mensaje}`);
}
