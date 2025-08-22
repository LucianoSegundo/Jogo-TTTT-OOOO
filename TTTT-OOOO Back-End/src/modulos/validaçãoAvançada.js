function verificarResultado(tabuleiro, linha, coluna) {
    const palavras = ["otto", "toot"]

    let palavra = "";

    for (let index = 0; index < 6; index++) {
        if (tabuleiro[index].linhas[linha] == null) {

            palavra += " ";
        } else palavra += tabuleiro[index].linhas[linha];

    }
    palavra = palavra.toLowerCase()

    console.log("palavra orizontal " + palavra)
    if (palavra.includes(palavras[1]) || palavra.includes(palavras[0])) return { vitoria: true, vitorioso: palavra, empate: false };
    //fverificado horizontalmente

    palavra = "";

    for (let index = 0; index < 4; index++) {
        if (tabuleiro[coluna - 1].linhas[index] == null) {

            palavra += " ";
        } else palavra += tabuleiro[coluna - 1].linhas[index];

    }

    palavra = palavra.toLowerCase()
    console.log("palavra vertical " + palavra)
    if (palavra.includes(palavras[1]) || palavra.includes(palavras[0])) return { vitoria: true, vitorioso: palavra, empate: false };

    //verificado verticalmente

    return { vitoria: false, vitorioso: palavra, empate: false };


}


export { verificarResultado }
