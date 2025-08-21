import { começarPartida, terminarPartida } from "./modulos/modulo_inicioFim.js";
let socket;
document.getElementById("Binicio").addEventListener("click", function name(params) {
    params.preventDefault()
    socket = começarPartida();
})

window.addEventListener('beforeunload', (event) => {
    console.log('Página está sendo recarregada ou fechada.');
    terminarPartida();
});