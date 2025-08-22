import { renderizarJogo } from "./modulo_jogo.js";
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
            if (Number(sessionStorage.getItem("numeroO"))> 0){
            sessionStorage.setItem("selecionado", "O")
            document.getElementById("buO").style.backgroundColor = "rgb(109, 186, 209)";
            document.getElementById("buT").style.backgroundColor = "rgb(124, 214, 241)";
        }else alert("jogada Invalida, suas Peças O Acabaram, Tente Novamente Com Outra Peça")
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
            if (Number(sessionStorage.getItem("numeroT"))> 0){

            sessionStorage.setItem("selecionado", "T")
            document.getElementById("buT").style.backgroundColor = "rgb(109, 186, 209)";
            document.getElementById("buO").style.backgroundColor = "rgb(124, 214, 241)";
        }else alert("jogada Invalida, suas Peças T Acabaram, Tente Novamente Com Outra Peça")
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
    renderizarJogo()
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
        let tabuleiroNovo = JSON.parse(sessionStorage.getItem("tabuleiro"));


        tabuleiroNovo[coluna - 1].linhas[0] = selecionado;
        let jogador = sessionStorage.getItem("jogador");

        let dados = {
            tipo: "jogada",
            jogador: jogador,
            jogada: selecionado,
            colunaJogada: coluna,
            tabuleiroNovo: tabuleiroNovo,
            tabuleiroAntigo: tabuleiro,

        }

        socket.send(JSON.stringify(dados));
    }
}

export { desativarO, desativarT, ativarO, ativaroT, soltarColuna, selecionarColuna, fazerJogada }