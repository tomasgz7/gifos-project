// En este documento manejo todo lo relacionado con la cámara y la grabación del GIF.
// Mi objetivo es permitir que el usuario acceda a la cámara, grabe un clip y vea una vista previa
// antes de subirlo a Giphy.

let mediaStream = null; // Guarda la transmisión en vivo de la cámara
let recorder = null; // Controlador de grabación
let recordedChunks = []; // Almacena los fragmentos de video grabados
let gifBlob = null; // Contendrá el archivo final del GIF

// Esta función inicializa toda la lógica de grabación.
function iniciarGrabacion() {
  // Capturo los elementos del DOM necesarios.
  const videoPreview = document.getElementById("vista-previa-camara");
  const btnComenzar = document.getElementById("btnComenzar");
  const btnGrabar = document.getElementById("btnGrabar");
  const btnDetener = document.getElementById("btnDetener");
  const btnSubir = document.getElementById("btnSubir");
  const previewGif = document.getElementById("vista-previa-gif");

  // Primero, cuando el usuario presione “Comenzar”, le pido acceso a la cámara.
  //Condición 7: Captura de video con MediaRecorder
  btnComenzar.addEventListener("click", async () => {
    try {
      // Solicito permisos al navegador para usar la cámara (sin audio).
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });

      // Asigno el stream al elemento <video> para mostrar la vista previa.
      videoPreview.srcObject = mediaStream;
      videoPreview.play();

      // Cambio el estado de los botones.
      btnComenzar.classList.add("oculto");
      btnGrabar.classList.remove("oculto");
    } catch (error) {
      console.error("Error al acceder a la cámara:", error);
      alert(
        "No se pudo acceder a la cámara. Revisá los permisos del navegador."
      );
    }
  });

  // Cuando el usuario presione “Grabar”, empiezo a capturar el video.
  btnGrabar.addEventListener("click", () => {
    // Inicializo el objeto MediaRecorder para grabar el flujo de la cámara.
    recorder = new MediaRecorder(mediaStream, {
      mimeType: "video/webm",
    });

    recordedChunks = [];

    // Cada vez que el MediaRecorder genera datos, los guardo en recordedChunks.
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    // Cuando la grabación finaliza, uno todos los fragmentos en un solo archivo (Blob).
    recorder.onstop = () => {
      // Creo el archivo final a partir de los fragmentos grabados
      gifBlob = new Blob(recordedChunks, { type: "video/webm" });

      //  Hago que gifBlob sea accesible desde otros scripts (como upload.js)
      window.gifBlob = gifBlob;

      // Muestro una vista previa del GIF grabado
      const videoURL = URL.createObjectURL(gifBlob);
      const gifPreviewElement = document.createElement("video");
      gifPreviewElement.src = videoURL;
      gifPreviewElement.controls = true;
      gifPreviewElement.loop = true;

      // Limpio el contenedor y muestro el nuevo video
      previewGif.innerHTML = "";
      previewGif.appendChild(gifPreviewElement);
      previewGif.classList.remove("oculto");

      // Muestro el botón para subir el GIF
      btnSubir.classList.remove("oculto");
    };

    // Inicio la grabación.
    recorder.start();

    // Actualizo el estado de los botones.
    btnGrabar.classList.add("oculto");
    btnDetener.classList.remove("oculto");
  });

  // Cuando se presiona “Detener”, finalizo la grabación.
  btnDetener.addEventListener("click", () => {
    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
      btnDetener.classList.add("oculto");
    }
  });
}
