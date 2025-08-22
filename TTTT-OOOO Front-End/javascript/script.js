import { ativarO, ativaroT } from "./modulos/modulo_movimentacao.js";
import { começarPartida, terminarPartida } from "./modulos/modulo_inicioFim.js";
let socket;
document.getElementById("Binicio").addEventListener("click", function name(params) {
    params.preventDefault()
    socket = começarPartida();
})

 document.getElementById("buO").addEventListener("click", function(){
    ativarO()
})

document.getElementById("buT").addEventListener("click", function(){
    ativaroT()
})

window.addEventListener('beforeunload', (event) => {
    console.log('Página está sendo recarregada ou fechada.');
    terminarPartida();
});

