// En este documento me encargo de la búsqueda de GIFs desde la API de Giphy.
// Mi objetivo es permitir que el usuario escriba un término, presione Enter o clic en Buscar
// y mostrar los resultados en el contenedor correspondiente.

const SEARCH_KEY = "uHjVQ12FGcuONBHKMciylcBpPRg88ED5"; // reemplazá por tu clave de Giphy

// Esta función inicializa toda la lógica del buscador.
function iniciarBusqueda() {
  // Capturo los elementos del DOM que necesito.
  const inputBusqueda = document.getElementById("entrada-busqueda");
  const contenedorResultados = document.getElementById("contenedor-resultados");
  const botonBuscar = document.getElementById("boton-buscar");

  // Si alguno de los elementos no existe, no ejecuto nada.
  if (!inputBusqueda || !contenedorResultados) return;

  // Agrego el evento para buscar cuando el usuario presione Enter.
  inputBusqueda.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      const termino = inputBusqueda.value.trim();
      if (termino !== "") {
        buscarGifs(termino, contenedorResultados);
      }
    }
  });

  // Agrego el evento para el botón de la lupa.
  if (botonBuscar) {
    botonBuscar.addEventListener("click", () => {
      const termino = inputBusqueda.value.trim();
      if (termino !== "") {
        buscarGifs(termino, contenedorResultados);
      }
    });
  }
}

// Esta función realiza la búsqueda en la API de Giphy.
async function buscarGifs(termino, contenedorResultados) {
  try {
    // Limpio los resultados anteriores.
    contenedorResultados.innerHTML = `<p>Buscando GIFs...</p>`;

    // Realizo la petición a la API.
    const respuesta = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${SEARCH_KEY}&q=${encodeURIComponent(
        termino
      )}&limit=12&rating=g`
    );

    const datos = await respuesta.json();

    // Si no hay resultados, muestro un mensaje.
    if (datos.data.length === 0) {
      contenedorResultados.innerHTML = `<p>No se encontraron resultados para "${termino}".</p>`;
      return;
    }

    // Si hay resultados, los muestro en grilla.
    renderizarResultados(datos.data, contenedorResultados);
  } catch (error) {
    console.error("Error en la búsqueda:", error);
    contenedorResultados.innerHTML = `<p>Error al buscar GIFs. Intentalo más tarde.</p>`;
  }
}

// Esta función muestra los GIFs en el contenedor.
function renderizarResultados(gifs, contenedorResultados) {
  contenedorResultados.innerHTML = ""; // Limpio resultados previos.

  gifs.forEach((gif) => {
    const img = document.createElement("img");
    img.src = gif.images.fixed_height.url;
    img.alt = gif.title || "GIF";
    contenedorResultados.appendChild(img);
  });
}
