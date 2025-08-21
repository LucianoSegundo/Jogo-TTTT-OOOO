import { iniciarJogo, fimdeJogo } from './modulos/basejogo.js';

const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

let partidasCheias = []
let partidasnova = { TooT: null, oTTo: null }

const wss = new WebSocket.Server({
    port: 8080,
    path: "/jogar"
});



wss.on('connection', (ws) => {

    if (ws.id === null || ws.id === undefined) iniciarJogo(partidasnova, ws, partidasCheias);

    console.log(`[Servidor] Cliente ${ws.id} conectado `);
    console.log("tamanho partida cheia:" + partidasCheias.length)

    ws.on('message', (message) => {
        console.log(`[Servidor] Mensagem recebida: ${message}`);
        ws.send(`[Servidor] Mensagem enviada: ${message}`);
    });

    ws.on('close', () => {
        
         fimdeJogo(partidasnova, ws, partidasCheias)

        console.log('[Servidor] Cliente ' + ws.id + ' desconectado');
    });

});

console.log('[Servidor] Servidor WebSocket rodando na porta 8080...');




