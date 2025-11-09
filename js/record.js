

// Función: Controla el acceso a la cámara, la grabación del GIF y la vista previa.
// Grabación con MediaRecorder API


(() => {
  
  // Se capturan los elementos del DOM necesarios para el manejo del flujo.
  
  const videoPreview = document.getElementById("vista-previa-camara"); // Video en vivo de la cámara.
  const btnGrabar = document.getElementById("boton-grabar");           // Botón que inicia la grabación.
  const btnDetener = document.getElementById("boton-detener");         // Botón que detiene la grabación.
  const btnSubir = document.getElementById("boton-subir");             // Botón que sube el GIF 
  const contenedorPreviewGif = document.getElementById("vista-previa-gif"); // Contenedor donde se mostrará la vista previa.

  // Si el archivo se carga en otra página y no existen estos elementos, no hace nada.
  if (!videoPreview) return;

  // Variables globales de trabajo
  let mediaStream = null;   // Guarda el flujo de video obtenido de la cámara.
  let mediaRecorder = null; // Instancia del grabador.
  let chunks = [];          // Fragmentos del video capturados durante la grabación.
  let recordedBlob = null;  // Archivo final generado cuando se detiene la grabación.

  
  // Inicialización de la cámara
 
  async function initCamera() {
    try {
      // Se solicita permiso al usuario para acceder a la cámara.
      // Solo se pide video, no audio.
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false
      });

      // Si se acepta, se muestra la imagen en el elemento <video>.
      videoPreview.srcObject = mediaStream;

      // play() inicia el streaming. Es obligatorio en algunos navegadores.
      await videoPreview.play();

      // Guardamos el stream globalmente para poder usarlo al grabar.
      window._gifosStream = mediaStream;

      // Estado inicial de los botones: solo se puede grabar.
      btnGrabar.disabled = false;
      btnDetener.disabled = true;
      btnSubir.disabled = true;

    } catch (e) {
      // Si se niega el permiso o hay un error, se desactiva todo.
      alert("No se pudo acceder a la cámara. Verificá los permisos del navegador.");
      btnGrabar.disabled = true;
      btnDetener.disabled = true;
      btnSubir.disabled = true;
    }
  }

 
  // Inicio y detención de la grabación
 
  function startRecording() {
    // Si no hay flujo de cámara, no se puede grabar.
    const stream = window._gifosStream;
    if (!stream) return;

    // Reinicio de variables por si ya hubo una grabación anterior.
    chunks = [];
    recordedBlob = null;

    // Se crea una instancia del grabador (MediaRecorder) con formato webm.
    mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });

    // Evento que se dispara cada vez que el grabador tiene datos disponibles.
    mediaRecorder.ondataavailable = (e) => {
      // Solo se agregan fragmentos válidos (no vacíos).
      if (e.data.size) chunks.push(e.data);
    };

    // Evento que se dispara cuando se detiene la grabación.
    mediaRecorder.onstop = () => {
      // Combina todos los fragmentos (chunks) en un solo archivo Blob.
      recordedBlob = new Blob(chunks, { type: "video/webm" });

      // Se guarda globalmente para poder usarlo en el próximo paso (upload).
      window._gifosRecordingBlob = recordedBlob;

      // Habilita el botón "Subir" porque ya hay un contenido válido.
      btnSubir.disabled = false;

      // Dispara un evento personalizado para que la vista previa se actualice automáticamente.
      // Este evento lo escucha otra parte del código más abajo.
      document.dispatchEvent(new Event("gifos:recording:finished"));
    };

    // Comienza efectivamente la grabación.
    mediaRecorder.start();

    // Actualización de estado de los botones.
    // “Grabar” se desactiva para evitar múltiples MediaRecorder simultáneos.
    // “Detener” se habilita porque la grabación está activa.
    // “Subir” sigue deshabilitado hasta que haya un Blob generado.
    btnGrabar.disabled = true;
    btnDetener.disabled = false;
    btnSubir.disabled = true;
  }

  // Función que detiene la grabación manualmente.
  function stopRecording() {
    // Se comprueba que haya una grabación activa antes de detenerla.
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop(); // Termina la captura y ejecuta el evento onstop.
      btnDetener.disabled = true; // Se desactiva el botón para evitar dobles clics.
    }
  }

  // Asignación de eventos a los botones principales.
  btnGrabar.addEventListener("click", startRecording);
  btnDetener.addEventListener("click", stopRecording);

  // ============================================================================
  // 3. Vista previa del resultado y opción de repetir
  // ============================================================================
  function renderPreview() {
    // Verifica que haya un Blob antes de intentar mostrarlo.
    const blob = window._gifosRecordingBlob;
    if (!blob) return;

    // Limpia el contenedor de vista previa.
    contenedorPreviewGif.innerHTML = "";

    // Crea un elemento <video> para mostrar el resultado grabado.
    const vid = document.createElement("video");
    vid.src = URL.createObjectURL(blob); // Se crea una URL temporal a partir del Blob.
    vid.autoplay = true;    // El video arranca solo.
    vid.loop = true;        // Reproduce en bucle para simular un GIF.
    vid.muted = true;       // Obligatorio para que autoplay funcione sin interacción.
    vid.playsInline = true; // En iOS evita el modo pantalla completa automático.
    vid.style.maxWidth = "100%";
    vid.style.border = "1px solid #6b6191";

    // Crea un botón para repetir la grabación.
    const btnRepetir = document.createElement("button");
    btnRepetir.textContent = "Repetir captura";
    btnRepetir.style.marginTop = "10px";

    // Al hacer clic en “Repetir”, se borra todo y se vuelve al estado inicial.
    btnRepetir.addEventListener("click", () => {
      contenedorPreviewGif.innerHTML = "";
      window._gifosRecordingBlob = null;
      btnGrabar.disabled = false;
      btnDetener.disabled = true;
      btnSubir.disabled = true;
    });

    // Se agregan el video y el botón al DOM.
    contenedorPreviewGif.appendChild(vid);
    contenedorPreviewGif.appendChild(btnRepetir);
  }

  // Escucha el evento que indica que la grabación terminó.
  // Esto permite actualizar la vista previa automáticamente sin que el usuario toque nada.
  document.addEventListener("gifos:recording:finished", renderPreview);

  
  //  Subida del GIF 
  // ============================================================================
  btnSubir.addEventListener("click", () => {
    // Si se intenta subir sin haber grabado nada, se cancela la acción.
    if (!window._gifosRecordingBlob) {
      alert("Primero grabá un GIF antes de subirlo.");
      return;
    }

    // Llamada a la función de subida (definida en upload.js).
    subirGif(window._gifosRecordingBlob);
  });

 
  //  Inicialización automática
 
  // Al cargar la página, se ejecuta la función de inicio de cámara.
  // Es importante que esto ocurra después de definir todos los eventos.
  initCamera();

})();
