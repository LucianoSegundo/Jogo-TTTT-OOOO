const WebSocket = require('ws');
const  basejogo = require('./modulos/basejogo.js');


let partidasCheias = []
let partidasnova = { toot: null, otto: null }

const wss = new WebSocket.Server({
    port: 8080,
    path: "/jogar"
});



wss.on('connection', (ws) => {

    if (ws.id === null || ws.id === undefined) basejogo.iniciarJogo(partidasnova, ws, partidasCheias);

    console.log(`[Servidor] Cliente ${ws.id} conectado `);
    console.log("tamanho partida cheia:" + partidasCheias.length)

    ws.on('message', (mensagem) => {
        console.log(`[Servidor] Mensagem recebida: ${mensagem}`);

        try {
            let jj = JSON.parse(mensagem)
            if("jogada"== jj.tipo){
            basejogo.jogada(jj.jogada,jj.jogador, jj.colunaJogada, jj.tabuleiroNovo,
                jj.tabuleiroAntigo,ws, partidasCheias);
        }
        } catch (error) {
            console.log(error)
        }
        
    });

    ws.on('close', () => {
        
         basejogo.fimdeJogo(partidasnova, ws, partidasCheias)

        console.log('[Servidor] Cliente ' + ws.id + ' desconectado');
    });

});

console.log('[Servidor] Servidor WebSocket rodando na porta 8080...');




