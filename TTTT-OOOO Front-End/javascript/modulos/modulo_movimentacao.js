import { getWebSocket } from "./modulo_webSocket.js";


function ativarO() {
    let vez = sessionStorage.getItem("vez")
    let jogador = sessionStorage.getItem("jogador")
    if (jogador != vez) {
        alert("Espere a sua Vez!!!!")
    }
    else {
        if ("O" == sessionStorage.getItem("selecionado")) desativarO();
        else {
            sessionStorage.setItem("selecionado", "O")
            document.getElementById("buO").style.backgroundColor = "rgb(109, 186, 209)";
            document.getElementById("buT").style.backgroundColor = "rgb(124, 214, 241)";

        }

    }
}
function desativarO() {

    sessionStorage.removeItem("selecionado")
    document.getElementById("buO").style.backgroundColor = "rgb(124, 214, 241)";

}

function ativaroT() {
    let vez = sessionStorage.getItem("vez")
    let jogador = sessionStorage.getItem("jogador")
    if (jogador != vez) {
        alert("Espere a sua Vez!!!!")
    }
    else {
        if ("T" == sessionStorage.getItem("selecionado")) desativarT();
        else {
            sessionStorage.setItem("selecionado", "T")
            document.getElementById("buT").style.backgroundColor = "rgb(109, 186, 209)";
            document.getElementById("buO").style.backgroundColor = "rgb(124, 214, 241)";
        }
    }
}
function desativarT() {

    sessionStorage.removeItem("selecionado")
    document.getElementById("buT").style.backgroundColor = "rgb(124, 214, 241)";

}

function selecionarColuna(id) {
    let vez = sessionStorage.getItem("vez")
    let jogador = sessionStorage.getItem("jogador")

    if (jogador == vez) {
        let slote = document.getElementById("c" + id + "l" + 1)
        if (slote.innerHTML === "") {
            let selecionado = sessionStorage.getItem("selecionado")
            if (selecionado != null) {
                slote.style.backgroundColor = "rgb(207, 240, 252)"
                slote.innerHTML = selecionado;
            }
        }
    }
}

function soltarColuna(id) {
    let vez = sessionStorage.getItem("vez")
    let jogador = sessionStorage.getItem("jogador")

    if (jogador == vez) {
        let selecionado = sessionStorage.getItem("selecionado")
        if (selecionado != null) {
            let slote = document.getElementById("c" + id + "l" + 1)
            slote.style.backgroundColor = "rgb(109, 186, 209)"
            slote.innerHTML = "";
        }
    }
}


function fazerJogada(coluna) {
 let vez = sessionStorage.getItem("vez")
    let jogador = sessionStorage.getItem("jogador")

    if (jogador == vez) {
    let socket = getWebSocket();

    soltarColuna(coluna)

    let selecionado = sessionStorage.getItem("selecionado");

    desativarO()
    desativarT()

    let tabuleiro = JSON.parse(sessionStorage.getItem("tabuleiro"));
        tabuleiro[coluna-1].linhas[0] = selecionado;
    let jogador = sessionStorage.getItem("jogador");

    let dados = {
        tipo: "jogada",
        tabuleiro: tabuleiro,
        jogador: jogador,
        jogada: selecionado,
        colunaJogada: coluna
    }

    socket.send(JSON.stringify(dados));
    }
}

export { desativarO, desativarT, ativarO, ativaroT, soltarColuna, selecionarColuna, fazerJogada }