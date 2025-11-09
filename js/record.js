// Paso 1: permisos y vista previa
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

      // guardo referencia para siguientes pasos
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
