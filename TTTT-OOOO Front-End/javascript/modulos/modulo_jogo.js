function renderizarJogo() {
    document.getElementById("mensagem").innerText = sessionStorage.getItem("mensagem");

    let tabela = JSON.parse(sessionStorage.getItem("tabuleiro"));

    let tabuleiro = document.getElementById("tabuleiro");
    tabuleiro.innerHTML = "";

    for (let index = 0; index < tabela.length; index++) {
        const coluna = tabela[index];
        let div = document.createElement("div");

        div.classList.add("coluna")
        div.id = coluna.coluna
        console.log("coluna " + coluna.coluna)

        for (let index = 0; index < coluna.linhas.length; index++) {

            const linha = coluna.linhas[index];
            let slote = document.createElement("div");
            
            slote.classList.add("slote")
            console.log("linha " + linha)

            if (linha == null) { }
            else {
                slote.innerText = linha;
            }
            div.appendChild(slote);
        }

        tabuleiro.appendChild(div);
    }

}

export { renderizarJogo }