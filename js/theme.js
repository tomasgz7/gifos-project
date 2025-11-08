function iniciarTema() {
  const hojaEstilos = document.getElementById("hoja-estilos");
  const botonTema = document.getElementById("boton-tema");

  let temaActual = localStorage.getItem("tema") || "day";
  hojaEstilos.href = `styles/themes/${temaActual}.css`;

  botonTema.addEventListener("click", () => {
    temaActual = temaActual === "day" ? "night" : "day";
    hojaEstilos.href = `styles/themes/${temaActual}.css`;
    localStorage.setItem("tema", temaActual);
  });
}
iniciarTema();
