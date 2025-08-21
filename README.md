# Jogo-TTTT-OOOO
## 1. Toot and Otto é um jogo similar a Lig 4. Ele é jogado em um tabuleiro com quatro linhas e seis colunas com espaços vazios no topo de cada coluna para inserir peças. O tabuleiro está vazio no começo do jogo.

Existem dois tipos de peças no Toot and Otto: o T e o O. Cada jogador tem seis Ts e seis Os para colocar no tabuleiro.

Cada jogador deve inserir uma das suas peças em uma das colunas. A peça cairá na linha mais baixa disponível na coluna. Uma peça não pode ser inserida em uma coluna que esteja cheia. Um jogador terá o nome TOOT, e o outro jogador terá o nome OTTO. TOOT joga primeiro.

O primeiro jogador a ter seu nome escrito no tabuleiro – TOOT ou OTTO, dependendo do jogador
– na horizontal, vertical ou diagonal é o vencedor. É possível que um jogador complete o nome do oponente, e, nesse caso, o oponente vence. O jogo termina empatado se TOOT e OTTO forem completados simultaneamente em um único movimento ou se todas as peças tiverem sido colocadas e nem TOOT nem OTTO tiverem sido escritos.

**(a)**  Gerar um tabuleiro vazio, informar a quantidade de peças restantes de cada jogador eapresentar um campo de mensagens.

**(b)** Implementar uma jogada. O jogador deve escolher qual peça jogar. Ao clicar em uma coluna, a peça deve ser posicionada na linha mais baixa disponível naquela coluna. Se a coluna estiver cheia, apresentar uma mensagem informando que a movimentação é inválida pois a coluna está cheia.

**(c)** Ao final de cada jogada válida, informar de quem é a vez de jogar.

**(d)** Fim de jogo. Ao final de cada jogada válida, verificar se o jogo chegou ao fim. Se verificar a sequência das letras TOOT ou OTTO na horizontal, vertical ou diagonal, o jogador respectivo ganhou o jogo. Informar o vencedor no campo de mensagens. Se tiver as duas sequências de letras ou nenhuma delas e não existirem mais peças a serem jogadas, o resultado é um empate.

**(e)**  O jogo deve ser implementado usando Node.js e Web Sockets.

**(f)** A regra de negócio deve estar no servidor.

**(g)** Deve-se utilizar JSON como formato para o tráfego de dados entre jogadores e servidor.

