function verificarResultado(tabuleiro, linha, coluna) {
    const palavras = ["otto", "toot","ottoot", "tootto"]

    let palavra2 = "";

    for (let index = 0; index < 6; index++) {
        if (tabuleiro[index].linhas[linha] == null) {
            palavra2 += " ";
        } else palavra2 += tabuleiro[index].linhas[linha];

    }

    palavra2 = palavra2.toLowerCase()

    console.log("palavra orizontal " + palavra2)


     if (palavra2.includes(palavras[2])) {

        return { vitoria: false, vitorioso: null, empate: true };
    }
     else if (palavra2.includes(palavras[3])) {

        return { vitoria: false, vitorioso: null, empate: true };
    }
    else if (palavra2.includes(palavras[1])) {
        return { vitoria: true, vitorioso: palavras[1], empate: false };

    }
    else if (palavra2.includes(palavras[0])) {

        return { vitoria: true, vitorioso: palavras[0], empate: false };
    } 

    //fverificado horizontalmente

    let palavra = "";

    for (let index = 0; index < 4; index++) {
        if (tabuleiro[coluna - 1].linhas[index] == null) {

            palavra += " ";
        } else palavra += tabuleiro[coluna - 1].linhas[index];

    }

    palavra = palavra.toLowerCase()

    console.log("palavra vertical " + palavra)

     if (palavra.includes(palavras[1])) {
        return { vitoria: true, vitorioso: palavras[1], empate: false };

    }
    else if (palavra.includes(palavras[0])) {

        return { vitoria: true, vitorioso: palavras[0], empate: false };
    }
     

    //verificado verticalmente
    let numeroocupacao = 1;
    for (let i = 0; i < tabuleiro.length; i++) {
        for (let j = 0; j < tabuleiro[i].linhas.length; j++) {
            const element = tabuleiro[i].linhas[j];
            if(element != null) numeroocupacao++;
        }
        
        
    }
    if(numeroocupacao >= (tabuleiro.length * tabuleiro[0].linhas.length))  return { vitoria: false, vitorioso: null, empate: true };

    return { vitoria: false, vitorioso: palavra, empate: false };


}


export { verificarResultado }
