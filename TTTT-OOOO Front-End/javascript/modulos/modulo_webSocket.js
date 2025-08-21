
let socket = null;

function criarWebSocket(url) {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    socket = new WebSocket(url);

    socket.addEventListener('open', () => {
      console.log('[WebSocket] Conectado');
    });

    socket.addEventListener('message', (event) => {
      console.log('[WebSocket] Mensagem:', event.data);

      try {

        if (JSON.parse(event.data).status == "desconexao") {
          alert(JSON.parse(event.data).mensagem);
          location.reload();

        }
        console.log(event.data);

      } catch (error) {

        console.log(event.data);
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
