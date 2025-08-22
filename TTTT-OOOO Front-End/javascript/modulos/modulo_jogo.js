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
        console.log("coluna " + coluna.coluna)

        for (let lIndex = 0; lIndex < coluna.linhas.length; lIndex++) {

            const linha = coluna.linhas[lIndex];
            let slote = document.createElement("div");

            slote.classList.add("slote")
            console.log("linha " + linha)
                let c = CIndex+1
                let l = lIndex+1
            if (linha == null) {
                slote.id = "c" + c + "l" + l
            }
            else {
                slote.innerText = linha;
                slote.id = "c" + c + "l" + l
            }

            div.appendChild(slote);
        }
         div.addEventListener("mouseenter", function () {
            selecionarColuna(CIndex+1)
        })
        div.addEventListener("mouseleave", function () {
            soltarColuna(CIndex+1)
        })
         div.addEventListener("click", function () {
            fazerJogada(CIndex+1)
        })
        tabuleiro.appendChild(div);
       
    }

}


export { renderizarJogo }