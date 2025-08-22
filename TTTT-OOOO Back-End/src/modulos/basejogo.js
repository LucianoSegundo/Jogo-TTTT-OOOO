const { v4: uuidv4 } = require('uuid');


function iniciarJogo(partidasnova, ws, partidasCheias) {
    let clientId = uuidv4();
    ws.id = clientId;

    if (partidasnova.toot == null) {

        partidasnova.toot = ws

        let mensagem = {
            tipo: "Aguardando",
            mensagem: 'Você é o jogador toot, Aguardando a chegada do OTTO',
            jogador: "toot"
        }
        partidasnova.toot.send(JSON.stringify(mensagem));


    } else if (partidasnova.otto == null) {

        partidasnova.otto = ws;

        const partida = Object.assign({}, partidasnova);

        console.log("nome tamanho da lista " + partidasCheias.push(partida));
        console.log(partidasCheias)
        let mensagem = {
            tipo: "iniciojogo",
            mensagem: 'Pronto para comeaçar. è a vez toot jogar.',
            jogador: "toot",
            numeroT: 6,
            numeroO: 6,
            vez: "toot",
            tabuleiro: [
                { "coluna": 1, "linhas": [null, null, null, null] },
                { "coluna": 2, "linhas": [null, null, null, null] },
                { "coluna": 3, "linhas": [null, null, null, null] },
                { "coluna": 4, "linhas": [null, null, null, null] },
                { "coluna": 5, "linhas": [null, null, null, null] },
                { "coluna": 6, "linhas": [null, null, null, null] }
            ]

        }

        partidasnova.toot.send(JSON.stringify(mensagem))
        mensagem.jogador = "otto"

        partidasnova.otto.send(JSON.stringify(mensagem))

        partidasnova.otto = null;
        partidasnova.toot = null;


    }
}

function fimdeJogo(partidasnova, ws, partidasCheias) {

    if (partidasnova.toot != null && partidasnova.toot.id == ws.id) {
        partidasnova.toot = null;
        partidasnova.otto = null;
    }

    else {
        let mensagem = {
            mensagem: "você venceu devido a desistencia de ",
            tipo: "desconexao"
        }

        for (let index = 0; index < partidasCheias.length; index++) {
            const partida = partidasCheias[index];

            if (partida.toot.id == ws.id) {
                console.log("toot executado")
                partidasCheias.splice(index, 1)

                mensagem.mensagem += "toot. pode procurar uma nova partida.";
                partida.otto.send(JSON.stringify(mensagem));
                partida.otto.close()
                console.log(partidasCheias)
            }
            else if (partida.otto.id == ws.id) {
                console.log("otto executado")
                partidasCheias.splice(index, 1)

                mensagem.mensagem += "otto. pode procurar uma nova partida.";
                partida.toot.send(JSON.stringify(mensagem));
                partida.toot.close()
                console.log(partidasCheias)
            }
        }

    }
}

let posicao = null;
function jogada(jogada, jogador, coluna, tabuleiroNovo, tabuleiroAntigo, ws, partidasCheias) {
    console.log("entrou no metodo jogada");

    let vez;
    let numeroT = 0;
    let numeroO = 0;

    if (jogada == "T") numeroT = -1;
    else if (jogada == "O") numeroO = -1;

    if (jogador == "toot") vez = "otto";
    else if (jogador == "otto") vez = "toot";

    let dados = {
        tipo: "novajogada",
        mensagem: "Agora é a vez do ",
        vez: vez,
        numeroT: numeroT,
        numeroO: numeroO,
        tabuleiro: tabuleiroNovo,
        coluna: coluna
    }
        console.log("chegou validar jogda");

    let copia = validarjogada(coluna, jogada, tabuleiroAntigo);

    console.log("saiu validar jogda");
    if (copia == false) {
        erro = {
            tipo: "erro",
            mensagem: "Jogada invalida, tente novamente"
        }
        ws.send(JSON.stringify(erro))
    }
    else {


        let vitoria = declararVitoria(coluna, copia);
        if (vitoria == false) {
            console.log("entrou na decisao final");

            let sala = encontrarSala(ws, partidasCheias);

            if (sala.toot.id === ws.id) {
                dados.mensagem = dados.mensagem + "otto";
                sala.toot.send(JSON.stringify(dados))
               
                dados.numeroO = 0;
                dados.numeroT = 0;
                sala.otto.send(JSON.stringify(dados))
            }
            else if (sala.otto.id === ws.id) {
                dados.mensagem = dados.mensagem + "toot"
                sala.otto.send(JSON.stringify(dados))
              
                dados.numeroO = 0;
                dados.numeroT = 0;
                sala.toot.send(JSON.stringify(dados))
            }

        } if (vitoria == true) {
            let sala = encontrarSala(ws, partidasCheias);

            let outrosDados = {
                tipo: "vitoria",
                mensagem: "Vitoria do jogador: ",
                tabuleiro: tabuleiroNovo
            }
            if (vitorioso === "toot") {
                dados.mensagem = dados.mensagem + "toot"
                sala.toot.send(JSON.stringify(dados))
                sala.otto.send(JSON.stringify(dados))
            }
            else if (vitorioso === "otto") {
                dados.mensagem = dados.mensagem + "otto"
                sala.otto.send(JSON.stringify(dados))
                sala.toot.send(JSON.stringify(dados))
            }

        }
    }
}



function declararVitoria(coluna, tabuleiroNovo) {
    console.log("entrou declarar vitorio");

    return false;
}

function validarjogada(coluna, jogada, tabuleiro) {
    console.log("antes da validacap")
    console.log(tabuleiro)
    console.log()
    if (tabuleiro[coluna-1].linhas[0] != null) return false;
    else tabuleiro[coluna-1].linhas[0] = jogada;

    for (let index = 1; index < tabuleiro[coluna-1].linhas.length; index++) {
        const elemento = tabuleiro[coluna-1].linhas[index];
        if (elemento == null) {
            tabuleiro[coluna-1].linhas[index - 1] = null
            tabuleiro[coluna-1].linhas[index ] = jogada;

        }
        else if (elemento != null) {
            posicao = index - 1;
            break;
        }

    }
    console.log("resultado da validação")
    console.log(tabuleiro)
    return tabuleiro;
}

function encontrarSala(ws, partidasCheias) {
    console.log("fentrou descoberta de partida");

    for (let index = 0; index < partidasCheias.length; index++) {
        const element = partidasCheias[index];

        if (element.toot.id === ws.id) {
            return element;
        }
        else if (element.otto.id === ws.id) {
            return element;
        }

    }

}

module.exports = {
    iniciarJogo,
    fimdeJogo,
    jogada
};
