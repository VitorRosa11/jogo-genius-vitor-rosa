const mensagem = document.getElementById("mensagem");
const cores = ["vermelho", "verde", "amarelo", "azul"];
let esperandoJogada = false;




let sequenciaJogo = [];
let sequenciaJogador = [];
let nivel = 0;

const botoesCores = document.querySelectorAll(".cor");
const btnIniciar = document.getElementById("btnIniciar");
const placar = document.getElementById("nivel");

function iniciarJogo(){
    sequenciaJogo = [];
    sequenciaJogador = [];
    nivel = 0;
    mensagem.textContent = "Iniciando nova partida...";
    gerarProximaCor();
}

function gerarProximaCor(){
    const corAleatoria = cores[Math.floor(Math.random()* 4)];
    sequenciaJogo.push(corAleatoria);
    sequenciaJogador = [];
    nivel ++;

    placar.textContent = `Rodada ${nivel}`;
     mensagem.textContent = "Memorize a sequência!";
    mostrarSequencia();
}

function mostrarSequencia(){
 esperandoJogada = false;

    
    let delay = 500;
    
    sequenciaJogo.forEach((cor, index)=> {
     setTimeout(()=> {
     animarCor(cor);
    tocarSom(cor);
        }, delay *(index + 1));
    });

    setTimeout(() => {
        esperandoJogada = true;
    }, delay * (sequenciaJogo.length + 1));
}

function animarCor(cor){
    const botao = document.getElementById(cor);
    botao.classList.add("ativa");

    setTimeout(() => {
        botao.classList.remove("ativa");
    }, 300);
}

function tocarSom(cor){
    let som;
    if(cor === "vermelho"){
        som = new Audio ("");
    } else if(cor === "verde"){
        som = new Audio ("sons/mixkit-correct-positive-notification-957.wav");
    } else if (cor === "amarelo"){
        som = new Audio ("sons/mixkit-select-click-1109.wav");
    } else if (cor === "azul"){
        som = new Audio ("sons/mixkit-digital-quick-tone-2866.wav");
    }
    if (som){
        som.play();
    }
}

function verificarClique(corClicada){
   const indice = sequenciaJogador.length;
  sequenciaJogador.push(corClicada);

  if (corClicada !== sequenciaJogo[indice]) {
    tocarSomErro();
    placar.textContent = "Errou! O jogo vai reiniciar.";
    setTimeout(() => iniciarJogo(), 1500);
    return;
  }

  mensagem.textContent = `✔️ Clique ${sequenciaJogador.length} de ${sequenciaJogo.length}`;

  if (sequenciaJogador.length === sequenciaJogo.length) {
    if (nivel === 7) {
      tocarSomVitoria();
      mensagem.textContent = "🏆 Você venceu o jogo!";
      setTimeout(() => iniciarJogo(), 3000);
    } else {
      tocarSomRodadaVencida();
      mensagem.textContent = "🎉 Acertou tudo! Nova rodada...";
      setTimeout(() => gerarProximaCor(), 1000);
    }
  }
}

function tocarSomErro(){
    const erro = new Audio("sons/mixkit-negative-guitar-tone-2324.wav");
    erro.play();
}

function tocarSomRodadaVencida() {
  const rodada = new Audio("sons/mixkit-winning-a-coin-video-game-2069.wav");
  rodada.play();
}

function tocarSomVitoria() {
  const vitoria = new Audio("sons/mixkit-final-level-bonus-2061.wav");
  vitoria.play();
}


botoesCores.forEach(botao => {
    botao.addEventListener("click", (e) => {
        if (!esperandoJogada) return;
        const corClicada = e.target.dataset.cor;
        animarCor(corClicada);
        tocarSom(corClicada);
        verificarClique(corClicada);
    });
});

btnIniciar.addEventListener("click", iniciarJogo);
document.querySelector('.disco').classList.add('ativo');
setTimeout(() => {
  document.querySelector('.disco').classList.remove('ativo');
}, 1000);

