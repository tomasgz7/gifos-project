// En este documento me encargo de subir el GIF grabado a Giphy.
// Mi objetivo es enviar el archivo generado en record.js, mostrar el progreso
// y guardar el ID del GIF subido en localStorage para poder mostrarlo luego en "Mis GIFs".

const API_KEY = "1rUtXF100IXzkDpmrvSnphzoJ3hjYNi9"; // reemplazá por tu propia API Key de Giphy

function subirGif(gifBlob) {
  // Capturo los elementos del DOM que necesito para la interfaz de subida
  const estadoSubida = document.getElementById("estado-subida");
  const vistaPreviaGif = document.getElementById("vista-previa-gif");

  // Creo un objeto FormData para enviar el archivo al endpoint de Giphy
  const formData = new FormData();
  formData.append("file", gifBlob, "myGif.gif");
  formData.append("api_key", API_KEY);

  // Muestro el texto "Subiendo..." mientras se realiza el POST
  estadoSubida.textContent = "Subiendo GIF...";
  estadoSubida.classList.remove("oculto");

  // Realizo la petición a la API de Giphy
  fetch("https://upload.giphy.com/v1/gifs", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // Guardo el ID del nuevo GIF en el localStorage
      const gifId = data.data.id;
      guardarGifEnLocalStorage(gifId);

      // Aviso visualmente que la subida fue exitosa
      estadoSubida.textContent = "GIF subido correctamente";

      // Limpio la vista previa y muestro el GIF final
      vistaPreviaGif.innerHTML = `
        <img src="https://media.giphy.com/media/${gifId}/giphy.gif" alt="GIF subido" />
      `;
    })
    .catch((error) => {
      console.error("Error al subir el GIF:", error);
      estadoSubida.textContent = "Error al subir el GIF";
    });
}

// Esta función guarda los IDs en localStorage.
// Si ya existen GIFs guardados, los mantengo.
function guardarGifEnLocalStorage(gifId) {
  let misGifs = JSON.parse(localStorage.getItem("misGifs")) || [];
  misGifs.push(gifId);
  localStorage.setItem("misGifs", JSON.stringify(misGifs));
}

// Esta función inicializa el proceso de subida al presionar el botón.
function iniciarSubida() {
  const btnSubir = document.getElementById("btnSubir");

  // Me aseguro de que exista el botón antes de agregar el evento
  if (!btnSubir) return;

  btnSubir.addEventListener("click", () => {
    // Valido que exista un gifBlob generado (de record.js)
    if (typeof gifBlob === "undefined" || !gifBlob) {
      alert("Primero grabá un GIF antes de subirlo.");
      return;
    }

    // Llamo a la función principal de subida
    subirGif(gifBlob);
  });
}
