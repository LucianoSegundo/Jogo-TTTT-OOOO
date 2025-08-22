

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
    document.getElementById("buT").style.background = "rgb(124, 214, 241)";

}

function selecionarColuna(id) {
    let vez = sessionStorage.getItem("vez")
    let jogador = sessionStorage.getItem("jogador")

    if (jogador == vez) {
        let slote = document.getElementById("c" + id + "l" + 1)
        if (slote.innerHTML === "") {
            let selecionado = sessionStorage.getItem("selecionado")
            if (selecionado != null) {
                slote.style.background = "rgb(207, 240, 252)"
                slote.innerHTML = selecionado;
            }
        }
    }
}

function soltarColuna(id) {
    let vez = sessionStorage.getItem("vez")
    let jogador = sessionStorage.getItem("jogador")

    if (jogador == vez) {
        let slote = document.getElementById("c" + id + "l" + 1)
        slote.style.backgroundColor = "rgb(109, 186, 209)"
        slote.innerHTML = "";
    }
}

export { desativarO, desativarT, ativarO, ativaroT, soltarColuna, selecionarColuna }