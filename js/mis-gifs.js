// En este documento me encargo de mostrar todos los GIFs que el usuario subió.
// Mi objetivo es leer los IDs almacenados en localStorage y traer desde Giphy
// las imágenes para mostrarlas en la grilla principal de "Mis GIFs".

const API_KEY = "1rUtXF100IXzkDpmrvSnphzoJ3hjYNi9"; // reemplazá por tu API Key de Giphy

function cargarMisGifs() {
  const contenedorMisGifs = document.getElementById("contenedor-mis-gifs");
  if (!contenedorMisGifs) return;

  const misGifs = JSON.parse(localStorage.getItem("misGifs")) || [];

  if (misGifs.length === 0) {
    contenedorMisGifs.innerHTML = "<p>Todavía no subiste ningún GIF 😅</p>";
    return;
  }

  obtenerMisGifs(misGifs, contenedorMisGifs);
}

async function obtenerMisGifs(listaIds, contenedor) {
  try {
    const url = `https://api.giphy.com/v1/gifs?api_key=${API_KEY}&ids=${listaIds.join(
      ","
    )}`;

    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    contenedor.innerHTML = "";
    datos.data.forEach((gif) => {
      const img = document.createElement("img");
      img.src = gif.images.fixed_height.url;
      img.alt = gif.title || "GIF subido";
      contenedor.appendChild(img);
    });
  } catch (error) {
    console.error("Error al cargar tus GIFs:", error);
    contenedor.innerHTML = "<p>Error al cargar tus GIFs 😢</p>";
  }
}
