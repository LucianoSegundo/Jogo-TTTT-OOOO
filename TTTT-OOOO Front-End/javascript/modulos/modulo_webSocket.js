import { renderizarJogo } from "./modulo_jogo.js";

let socket = null;

function criarWebSocket(url) {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    socket = new WebSocket(url);

    socket.addEventListener('open', () => {
      console.log('[WebSocket] Conectado');
    });

    socket.addEventListener('message', (event) => {

      try {
        let data = JSON.parse(event.data);

        if (JSON.parse(event.data).tipo == "iniciojogo") {

          sessionStorage.setItem("mensagem", data.mensagem);
          sessionStorage.setItem("jogador", data.jogador);
          sessionStorage.setItem("vez", data.vez);
          sessionStorage.setItem("numeroO", data.numeroO);
          sessionStorage.setItem("numeroT", data.numeroT);
          sessionStorage.setItem("tabuleiro",JSON.stringify(data.tabuleiro));

          document.getElementById("buT").innerText = "Selecionar de Peça T, Restão: "+ data.numeroT
          document.getElementById("buO").innerText = "Selecionar de Peça O, Restão: "+ data.numeroO

          document.getElementById("mensagem").innerText = data.mensagem
          document.getElementById("jogador").innerText = "Você é o " + data.jogador

          renderizarJogo();
        }
        else if (JSON.parse(event.data).tipo == "Aguardando") {
          document.getElementById("mensagem").innerText = data.mensagem
          document.getElementById("jogador").innerText = "Você é o " + data.jogador


        } else if (JSON.parse(event.data).tipo == "desconexao") {
          alert(data.mensagem);
          location.reload();

        }

      } catch (error) {
        console.log(error)
      }

    });

    socket.addEventListener('close', () => {
      console.log('[WebSocket] Conexão encerrada');
      socket = null
    });

    socket.addEventListener('error', (err) => {
      console.error('[WebSocket] Erro:', err);
    });
  }

  return socket;
}

function getWebSocket() {
  return socket;
}

export { criarWebSocket, getWebSocket };
