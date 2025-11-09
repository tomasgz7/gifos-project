// En este documento manejo todo el proceso de subida del GIF a Giphy
// después de haberlo grabado con la cámara en record.js.

(() => {
  const API_KEY = "Qp0Z5W8NSq0pDDmY3FpMEN6UVrDFSbQg";

  // Primero obtengo los elementos del DOM que voy a usar
  const ventanaSubiendo = document.getElementById("subiendo-gif");
  const ventanaExito = document.getElementById("gif-exito");
  const gifSubidoImg = document.getElementById("gif-subido");
  const copiarBtn = document.getElementById("copiar-enlace");
  const descargarBtn = document.getElementById("descargar-gif");
  const barra = document.getElementById("myBar");
  const textoTiempo = document.getElementById("tiempo-restante");

  // Estas variables me sirven para guardar temporalmente
  // el blob del GIF grabado y su URL de previsualización
  let recordedBlob = null;
  let previewURL = null;

  // Acá leo los IDs de los GIFs que ya subí y están guardados en localStorage
  function getIds() {
    try {
      const raw = localStorage.getItem("misGifs");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  // Con esta función agrego el nuevo ID al array en localStorage
  function saveId(id) {
    const ids = getIds();
    if (!ids.includes(id)) {
      ids.push(id);
      localStorage.setItem("misGifs", JSON.stringify(ids));
    }
  }

  // Muestro o escondo elementos según el estado del flujo
  function show(el) {
    el.style.display = "block";
  }

  function hide(el) {
    el.style.display = "none";
  }

  // Esta función simula la barra de progreso mientras se sube el GIF
  function simularProgreso() {
    let width = 1;
    barra.style.width = "1%";
    barra.textContent = "1%";
    textoTiempo.textContent = "Tiempo restante: algunos segundos";
    const id = setInterval(() => {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width += 2;
        barra.style.width = width + "%";
        barra.textContent = width + "%";
      }
    }, 50);
  }

  // En esta parte hago la subida real a la API de Giphy
  // Uso un FormData para enviar el archivo grabado (Blob)
  async function uploadToGiphy(blob) {
    const form = new FormData();
    form.append("file", blob, "miGif.gif");

    const res = await fetch(
      `https://upload.giphy.com/v1/gifs?api_key=${API_KEY}`,
      {
        method: "POST",
        body: form,
      }
    );

    const data = await res.json();

    if (!res.ok || !data?.data?.id) {
      throw new Error("Falló la subida a Giphy");
    }

    // Devuelvo el ID del GIF subido
    return data.data.id;
  }

  // Con esta función obtengo la URL final del GIF usando su ID
  async function fetchGiphyURL(id) {
    const res = await fetch(
      `https://api.giphy.com/v1/gifs/${id}?api_key=${API_KEY}`
    );
    const data = await res.json();
    return data?.data?.url || "";
  }

  // Esta es la función principal: se ejecuta cuando hago clic en “Subir Guifo”
  async function handleUpload() {
    // Si todavía no tengo un GIF grabado, aviso al usuario
    if (!recordedBlob) {
      alert("Todavía no hay un GIF grabado.");
      return;
    }

    // Muestro la ventana “Subiendo Guifo” y oculto la de éxito
    show(ventanaSubiendo);
    hide(ventanaExito);
    simularProgreso();

    try {
      // Paso 1: subo el GIF a Giphy
      const gifId = await uploadToGiphy(recordedBlob);

      // Paso 2: guardo el ID en localStorage
      saveId(gifId);

      // Paso 3: obtengo la URL final del GIF subido
      const url = await fetchGiphyURL(gifId);

      // Paso 4: muestro el GIF en la ventana de éxito
      gifSubidoImg.src = previewURL || URL.createObjectURL(recordedBlob);

      // Paso 5: configuro los botones de copiar y descargar
      copiarBtn.onclick = () => {
        const input = document.createElement("input");
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        alert("Copié el link del GIF al portapapeles.");
      };

      descargarBtn.onclick = () => {
        const a = document.createElement("a");
        a.href = previewURL || URL.createObjectURL(recordedBlob);
        a.download = "miGif.gif";
        a.click();
      };

      // Paso 6: cuando todo termina, muestro la ventana “Guifo subido con éxito”
      hide(ventanaSubiendo);
      show(ventanaExito);
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al subir el GIF. Intentá de nuevo.");
      hide(ventanaSubiendo);
    }
  }

  // Cuando termino de grabar el GIF en record.js, se dispara un evento “gif:ready”
  // que me pasa el Blob y la URL del preview. Los guardo para usarlos acá.
  window.addEventListener("gif:ready", (ev) => {
    recordedBlob = ev.detail?.blob || null;
    previewURL = ev.detail?.previewURL || null;
  });

  // Finalmente, creo un objeto global que me permite llamar a la función
  // desde el botón “Subir Guifo” en el HTML.
  window.GIFOS_UPLOAD = { subir: handleUpload };
})();
