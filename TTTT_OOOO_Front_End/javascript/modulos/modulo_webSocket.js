import { renderizarJogo, renderizarJogada } from "./modulo_jogo.js";

let socket = null;

function criarWebSocket(url) {
  if (!socket || socket.readyState === WebSocket.CLOSED) {

   try {
     socket = new WebSocket(url);

   } catch (error) {
       let url =    'ws://localhost:8080/jogar';
       console.log(url)
       socket = new WebSocket(url);
   }

    socket.addEventListener('open', () => {
      console.log('[WebSocket] Conectado');
    });

    socket.addEventListener('message', (event) => {

      try {
        let data = JSON.parse(event.data);

        if (JSON.parse(event.data).tipo == "iniciojogo") {

          sessionStorage.setItem("tabuleiro", JSON.stringify(data.tabuleiro));
          sessionStorage.setItem("mensagem", data.mensagem);
          sessionStorage.setItem("numeroO", data.numeroO);
          sessionStorage.setItem("numeroT", data.numeroT);
          sessionStorage.setItem("vez", data.vez);
          sessionStorage.setItem("jogador", data.jogador);

          document.getElementById("buT").innerText = "Selecionar de Peça T, Restão: " + data.numeroT
          document.getElementById("buO").innerText = "Selecionar de Peça O, Restão: " + data.numeroO

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

        } else if (JSON.parse(event.data).tipo == "novajogada") {

          sessionStorage.setItem("tabuleiro", JSON.stringify(data.tabuleiro));
          sessionStorage.setItem("mensagem", data.mensagem);

          let no = sessionStorage.getItem("numeroO");
          let nt = sessionStorage.getItem("numeroT");

          sessionStorage.setItem("numeroO", Number(data.numeroO) + Number(no));
          sessionStorage.setItem("numeroT", Number(data.numeroT) + Number(nt));
          sessionStorage.setItem("vez", data.vez);

          renderizarJogada(data.coluna)
        }
        else if (JSON.parse(event.data).tipo == "vitoria") {
          sessionStorage.setItem("tabuleiro", JSON.stringify(data.tabuleiro));

          renderizarJogo()

          alert(data.mensagem)
          location.reload();

        } else if (JSON.parse(event.data).tipo == "erro") {
          alert(data.mensagem);
          location.reload();

        } else if (JSON.parse(event.data).tipo == "empate") {
          alert(data.mensagem)
          location.reload();
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
