
    //Capturar el input donde escribimos el texto de busqueda
    const campoBusqueda = document.getElementById("entrada-busqueda");

    //Aca capturamos el div donde se van a mostrar los GIFs obtenidos desde la API
    const contenedorBusquedas = document.getElementById("contenedor-resultados");

    //Sin la apikey no podemos hacer consultas ni recibir resultados, es necesario si o si
    const apiKey = "uHjVQ12FGcuONBHKMciylcBpPRg88ED5";

    async function buscarGifs(texto) {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${texto}&limit=10&rating=g`;

        const respuesta = await fetch (url);

        const datos = await respuesta.json();

        mostrarResultados (datos.data);

    }

    function mostrarResultados (listaGifs) {
        contenedorBusquedas.innerHTML = "";

        listaGifs.forEach(gif => {
            const imagen = document.createElement("img");

            imagen.src = gif.images.fixed_height.url;

            imagen.alt = gif.title;

            contenedorBusquedas.appendChild(imagen);
        });
    }

    campoBusqueda.addEventListener ("keydown", e => {
        if (e.key === "Enter") {
            const texto = campoBusqueda.value.trim();

            if (texto !== "") {
                buscarGifs(texto);
            }
        }
    });