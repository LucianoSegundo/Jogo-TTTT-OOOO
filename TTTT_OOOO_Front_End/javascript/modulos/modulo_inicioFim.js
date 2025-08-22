import { criarWebSocket } from "./modulo_webSocket.js";
let socket = "aaa";
function começarPartida(params) {

    socket = criarWebSocket('wss://jogo-tttt-oooo-back-end.onrender.com');

    console.log("Teste bem sucedido")


    if (socket !== "aaa") {

        document.getElementById("homepage").style.display = "none";
        document.getElementById("jogo").style.display = "flex";


        return socket;
    }
}
function terminarPartida(params) {
    if (socket !== "aaa") {
        socket.close()
        document.getElementById("jogo").style.display = "none";
        document.getElementById("homepage").style.display = "flex";
        sessionStorage.clear();
    }
}

export { começarPartida, terminarPartida };
