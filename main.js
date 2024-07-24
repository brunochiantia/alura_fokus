const botoes = document.querySelectorAll('.app__card-button');
const botaoMusica = document.querySelector('#alternar-musica');
const start = document.getElementById('start-pause');
const temporizador = document.getElementById('temporizador');
const textoBotao = document.querySelector('#start-pause span')
const iconeBotao = document.querySelector('.app__card-primary-butto-icon')

let tempo = 60 * 25;
timer(tempo);

let contagemId = null
const somStart = new Audio('sons/play.wav');
const somPause = new Audio('sons/pause.mp3');
const somTimeOut = new Audio('sons/beep.mp3');


const musica = new Audio('sons/luna-rise-part-one.mp3');
musica.loop = true;



function trocaContexto(botao) {
    var contexto = botao.getAttribute('data-contexto');
    //Troca Background
    document.querySelector('html').setAttribute('data-contexto',contexto); 
    //Troca IMG
    document.querySelector('.app__image').setAttribute('src',`imagens/${contexto}.png`);
    //Troca Titulo e timer
    switch(contexto) {
        case "foco":
            document.querySelector('.app__title').innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            tempo = 60*25;
            timer(tempo);
            zerar();        
            break;    
        case "descanso-curto":
            document.querySelector('.app__title').innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            tempo = 60 * 5;
            timer(tempo);
            zerar();  
            break; 
        case "descanso-longo":
            document.querySelector('.app__title').innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            tempo = 60 * 15;
            timer(tempo);
            zerar();  
            break; 
    };
    //Botão Ativo
    document.querySelector('.active').classList.remove('active');
    botao.classList.add('active');
            
};

botoes.forEach((botao) => {
    botao.onclick = function() {         
        trocaContexto(botao);              
    };
});

botaoMusica.addEventListener('change',()=>{
    if(musica.paused) {
        musica.play();
    }else{
        musica.pause();
    }
})

const contagem = () => {    
    timer(tempo);  
    if(tempo == 0){
        zerar();
        somTimeOut.play();
        alert("tempo esgotado!");
        somTimeOut.play();       
        return;
    }
    tempo = tempo - 1;
}

function zerar(){
    somPause.play();
    textoBotao.textContent = "Iniciar"
    iconeBotao.setAttribute('src','imagens/play_arrow.png');
    clearInterval(contagemId);
    contagemId = null;
}

function iniciar(){
    if(contagemId){
        zerar();
        
        return;
    }
    textoBotao.textContent = "Pausar"
    iconeBotao.setAttribute('src','imagens/pause.png')
    contagemId = setInterval(contagem,1000);
    somStart.play();
}


function timer(tempo){    
    const tempominutos = new Date(tempo * 1000).toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    document.querySelector('#timer').innerHTML = `${tempominutos}`;
}

start.onclick = () => {
    iniciar();
}

