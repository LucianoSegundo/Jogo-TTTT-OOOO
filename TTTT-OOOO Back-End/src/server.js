const WebSocket = require('ws');
const  basejogo = require('./modulos/basejogo.js');
const { fazerJogada } = require('../../TTTT-OOOO Front-End/javascript/modulos/modulo_movimentacao.js');

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
            if("jogada"== jogada.tipo){
            fazerJogada.jogada(jj.jogada,jj.jogador, jj.coluna, jj.tabuleiro,ws, partidasCheias);
        }
        } catch (error) {
            
        }
        
        ws.send(`[Servidor] Mensagem enviada: ${mensagem}`);
    });

    ws.on('close', () => {
        
         basejogo.fimdeJogo(partidasnova, ws, partidasCheias)

        console.log('[Servidor] Cliente ' + ws.id + ' desconectado');
    });

});

console.log('[Servidor] Servidor WebSocket rodando na porta 8080...');




