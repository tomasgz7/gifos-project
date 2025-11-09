
// Archivo: upload.js
// Función: Subir el GIF grabado a la API de Giphy


const apiKey = "uHjVQ12FGcuONBHKMciylcBpPRg88ED5";

// Función principal para subir el GIF grabado
async function subirGif(blob) {
  try {
    // Muestro mensaje o loader durante la subida
    console.log("Subiendo GIF a Giphy...");

    // Creo el objeto FormData, que actúa como un formulario HTML
    const formData = new FormData();
    formData.append("file", blob, "miGif.gif");
    formData.append("api_key", apiKey);

    // Hago la petición POST a Giphy
    const respuesta = await fetch("https://upload.giphy.com/v1/gifs", {
      method: "POST",
      body: formData
    });

    // Transformo la respuesta en JSON
    const datos = await respuesta.json();

    // Guardo el ID del GIF subido
    const gifId = datos.data.id;

    console.log("GIF subido con éxito. ID:", gifId);

    // Guardo el ID en LocalStorage para la sección “Mis GIFs”
    guardarGifEnLocalStorage(gifId);

    alert("GIF subido correctamente a Giphy.");

  } catch (error) {
    console.error("Error al subir el GIF:", error);
    alert("Hubo un error al subir el GIF. Revisá la consola.");
  }
}
