import { selecionarColuna, soltarColuna, fazerJogada } from "./modulo_movimentacao.js";
function renderizarJogo() {
    document.getElementById("mensagem").innerText = sessionStorage.getItem("mensagem");

    let tabela = JSON.parse(sessionStorage.getItem("tabuleiro"));

    let tabuleiro = document.getElementById("tabuleiro");
    tabuleiro.innerHTML = "";

    for (let CIndex = 0; CIndex < tabela.length; CIndex++) {
        const coluna = tabela[CIndex];
        let div = document.createElement("div");

        div.classList.add("coluna")
        div.id = coluna.coluna

        for (let lIndex = 0; lIndex < coluna.linhas.length; lIndex++) {

            const linha = coluna.linhas[lIndex];
            let slote = document.createElement("div");

            slote.classList.add("slote")
            let c = CIndex + 1
            let l = lIndex + 1
            if (linha == null) {
                slote.id = "c" + c + "l" + l
            }
            else {
                slote.innerText = linha;
                slote.id = "c" + c + "l" + l
                slote.style.backgroundColor = "rgb(207, 240, 252)"
            }
            div.appendChild(slote);
        }
        div.addEventListener("mouseenter", function () {
            selecionarColuna(CIndex + 1)
        })
        div.addEventListener("mouseleave", function () {
            soltarColuna(CIndex + 1)
        })
        div.addEventListener("click", function () {
            fazerJogada(CIndex + 1)
        })
        tabuleiro.appendChild(div);

    }
    console.log("tabuleiro renderizado")

}
function renderizarJogada(coluna) {
    document.getElementById("buT").innerText = "Selecionar de Peça T, Restão: " + sessionStorage.getItem("numeroT")
    document.getElementById("buO").innerText = "Selecionar de Peça O, Restão: " + sessionStorage.getItem("numeroO")

    document.getElementById("mensagem").innerText = sessionStorage.getItem("mensagem")

    renderizarJogo()

    setTimeout(() => {
        console.log("Executado após 2 segundos");
    }, 2000);

    let tabuleiro = JSON.parse(sessionStorage.getItem("tabuleiro"))
    console.log(tabuleiro)

    for (let i = 1; i < tabuleiro[coluna - 1].linhas.length; i++) {


        if (tabuleiro[coluna - 1].linhas[i] == null) {
             
                tabuleiro[coluna - 1].linhas[i] = tabuleiro[coluna - 1].linhas[i - 1]
                tabuleiro[coluna - 1].linhas[i - 1] = null
              
                sessionStorage.setItem("tabuleiro", JSON.stringify(tabuleiro))
                 
               
                renderizarJogo()
                console.log("Executado após 2 segundos");
           

        }
    }
}

export { renderizarJogo, renderizarJogada }