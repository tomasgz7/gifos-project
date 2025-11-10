// En este documento me encargo de subir el GIF grabado a Giphy.
// Mi objetivo es enviar el archivo generado en record.js, mostrar el progreso
// y guardar el ID del GIF subido en localStorage para poder mostrarlo luego en "Mis GIFs".


function subirGif(gifBlob) {
  // Capturo los elementos del DOM que necesito para la interfaz de subida
  const estadoSubida = document.getElementById("estado-subida");
  const vistaPreviaGif = document.getElementById("vista-previa-gif");

  // Creo un objeto FormData para enviar el archivo al endpoint de Giphy
  const formData = new FormData();
  formData.append("file", gifBlob, "myGif.gif");
  formData.append("api_key", API_KEY);

 // Muestro el texto "Subiendo..." mientras se realiza el POST
 //Condición extra: Barra o indicador de Upload funcional
 // fetch con método POST envía el GIF a la API de Giphy.
 // Muestra el estado del proceso en pantalla (subiendo / completado).
  estadoSubida.textContent = "Subiendo GIF...";
  estadoSubida.classList.remove("oculto");

  // Realizo la petición a la API de Giphy
  // Condición 8: POST a la API de Giphy para subir el GIF

// fetch con método POST envía datos al servidor
// FormData contiene el GIF capturado para subirlo
// response.json convierte la respuesta para obtener el ID del GIF
  fetch("https://upload.giphy.com/v1/gifs", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
  //Condición 9: LocalStorage para guardar y mostrar mis GIFs
  // localStorage permite guardar datos en el navegador (persisten al recargar)
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
