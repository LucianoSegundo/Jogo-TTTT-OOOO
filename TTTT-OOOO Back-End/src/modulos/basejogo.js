const { v4: uuidv4 } = require('uuid');


function iniciarJogo(partidasnova, ws, partidasCheias) {
    let clientId = uuidv4();
    ws.id = clientId;

    if (partidasnova.TooT == null) {

        partidasnova.TooT = ws

        let mensagem = {
            tipo: "Aguardando",
            mensagem: 'Você é o jogador TooT, Aguardando a chegada do OTTO',
            jogador: "TooT"
        }
        partidasnova.TooT.send(JSON.stringify(mensagem));


    } else if (partidasnova.oTTo == null) {

        partidasnova.oTTo = ws;

        const partida = Object.assign({}, partidasnova);

        console.log("nome tamanho da lista " + partidasCheias.push(partida));
        console.log(partidasCheias)
        let mensagem = {
            tipo: "iniciojogo",
            mensagem: 'Pronto para comeaçar. è a vez TooT jogar.',
            jogador: "TooT",
            numeroT: 6,
            numeroO: 6,
            vez: "TooT",
            tabuleiro: [
                { "coluna": 1, "linhas": [null, null, null, null] },
                { "coluna": 2, "linhas": [null, null, null, null] },
                { "coluna": 3, "linhas": [null, null, null, null] },
                { "coluna": 4, "linhas": [null, null, null, null] },
                { "coluna": 5, "linhas": [null, null, null, null] },
                { "coluna": 6, "linhas": [null, null, null, null] }
            ]

        }

        partidasnova.TooT.send(JSON.stringify(mensagem))
        mensagem.jogador = "oTTo"

        partidasnova.oTTo.send(JSON.stringify(mensagem))

        partidasnova.oTTo = null;
        partidasnova.TooT = null;


    }
}

function fimdeJogo(partidasnova, ws, partidasCheias) {

    if (partidasnova.TooT != null && partidasnova.TooT.id == ws.id) {
        partidasnova.TooT = null;
        partidasnova.oTTo = null;
    }

    else {
        let mensagem = {
            mensagem: "você venceu devido a desistencia de ",
            tipo: "desconexao"
        }

        for (let index = 0; index < partidasCheias.length; index++) {
            const partida = partidasCheias[index];

            if (partida.TooT.id == ws.id) {
                console.log("toot executado")
                partidasCheias.splice(index, 1)

                mensagem.mensagem += "TooT. pode procurar uma nova partida.";
                partida.oTTo.send(JSON.stringify(mensagem));
                partida.oTTo.close()
                console.log(partidasCheias)
            }
            else if (partida.oTTo.id == ws.id) {
                console.log("otto executado")
                partidasCheias.splice(index, 1)

                mensagem.mensagem += "oTTo. pode procurar uma nova partida.";
                partida.TooT.send(JSON.stringify(mensagem));
                partida.TooT.close()
                console.log(partidasCheias)
            }
        }

    }
}

module.exports = {
    iniciarJogo,
    fimdeJogo
};
