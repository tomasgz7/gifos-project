
(() => {
  const videoPreview = document.getElementById("vista-previa-camara");
  const btnGrabar = document.getElementById("boton-grabar");
  const btnDetener = document.getElementById("boton-detener");
  const btnSubir = document.getElementById("boton-subir");

  if (!videoPreview) return;

  async function initCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false
      });
      videoPreview.srcObject = stream;
      await videoPreview.play();

      btnGrabar.disabled = false;
      btnDetener.disabled = true;
      btnSubir.disabled = true;

  
      window._gifosStream = stream;
    } catch (e) {
      alert("No se pudo acceder a la cámara. Revisá permisos del navegador.");
      btnGrabar.disabled = true;
      btnDetener.disabled = true;
      btnSubir.disabled = true;
    }
  }

  initCamera();
})();

//grabar y detener
(() => {
  const videoPreview = document.getElementById("vista-previa-camara");
  const btnGrabar = document.getElementById("boton-grabar");
  const btnDetener = document.getElementById("boton-detener");
  const btnSubir = document.getElementById("boton-subir");
  const contenedorPreviewGif = document.getElementById("vista-previa-gif");

  if (!videoPreview) return;

  let mediaRecorder = null;
  let chunks = [];
  let recordedBlob = null;

  function startRecording() {
    const stream = window._gifosStream;
    if (!stream) return;

    chunks = [];
    recordedBlob = null;

    mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    mediaRecorder.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
    mediaRecorder.onstop = () => {
      recordedBlob = new Blob(chunks, { type: "video/webm" });
      window._gifosRecordingBlob = recordedBlob; // para el upload
      // la preview se renderiza 
      btnSubir.disabled = false;
    };

    mediaRecorder.start();

    // estados
    btnGrabar.disabled = true;
    btnDetener.disabled = false;
    btnSubir.disabled = true;
  }

  function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      btnDetener.disabled = true;
    }
  }

  btnGrabar.addEventListener("click", startRecording);
  btnDetener.addEventListener("click", stopRecording);
})();
