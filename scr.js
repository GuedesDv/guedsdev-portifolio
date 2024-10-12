/* 
----------------
 
               INICIO DO SCRIPT PLAYER 

                    ------------------------*/

const songname = document.getElementById('song');
const song = document.getElementById('audioo');
const play = document.getElementById('play');
const next = document.getElementById('frente');
const capadisc = document.getElementById('imgp');
const artist = document.getElementById('artist');
const ret = document.getElementById('return');
const barprogress = document.getElementById('barp');
const pcout = document.getElementById('barc');
const timei = document.getElementById('timei');
const timef = document.getElementById('timef');


let isPlaying = false;


//ANEXAR AS MUSICAS AQUI 

const musicone = {
 songnamex : 'Ver melhor no cinza',
 artistx : 'Encontro Distante',
 filex: '1'
};

const musictwo = {
    songnamex : 'Silence',
    artistx : 'Who Made Who',
    filex: '2'
   };

   const playlist = [musicone, musictwo];
   let index = 0;





function ouvir(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;

}

function pausar(){
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;

}
function dicidirplay(){
    if(isPlaying == true){
        pausar();
    }
    else {
        ouvir();
    }
}


function updatetimett(){
    timef.innerText = toH(song.duration);
    
}


function iniciarsong(){
    capadisc.src = `${playlist[index].filex}.jpg`;
    song.src = `${playlist[index].filex}.mp3`;
    songname.innerText = playlist[index].songnamex;
    artist.innerText = playlist[index].artistx;

}

function returnsong(){
 if (index === 0)
 {
    index = playlist.length - 1;
 }
 else {
    index -= 1;

 }

 iniciarsong ();
 ouvir();

}


 function nextsong(){
    if (index === playlist.length - 1){
        index = 0;
    }
    else {
       index += 1;
   
    }

 iniciarsong ();
 ouvir();

}

function updateprogressbar(){
 const barwidth = (song.currentTime/song.duration)*100;
 barprogress.style.setProperty('--progress', `${barwidth}%`);
 timei.innerText = toH(song.currentTime);
 

}

function jumpto(event){
    const width = pcout.clientWidth;
    const clickposition = event.offsetX;
    const JumpToTime = (clickposition/width)* song.duration;
    song.currentTime = JumpToTime;
}

function toH(originalNumber) {
    let hours = Math.floor(originalNumber/3600);
    let min = Math.floor((originalNumber - hours * 3600)/60);
    let sec = Math.floor(originalNumber - hours*3600 - min*60);

    return `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

iniciarsong();

play.addEventListener('click', dicidirplay);
ret.addEventListener('click', returnsong);
next.addEventListener('click', nextsong);
song.addEventListener('timeupdate', updateprogressbar);
song.addEventListener ('loadedmetadata', updatetimett);
pcout.addEventListener('click', jumpto);

/* 
----------------
 
               FIM DO SCRIPT PLAYER 

                    ------------------------*/


                    const text = document.querySelector(".text p");
                    text.innerHTML = text.innerText.split("").map(
                        (char, i)=>
                            `<span style="transform:rotate(${i*7.5}deg);">${char}</span>`
                    ).join("");


/* GALERIA DE IMGS */

document.body.addEventListener("click", (event) => {
    const clicou = event.target,
      imgs = document.querySelectorAll(".img");
  
    if (!clicou.classList.contains("img")) {
      imgs.forEach((img) => img.classList.remove("aberto"));
      return;
    }
  
    if (clicou.classList.contains("aberto")) {
      clicou.classList.remove("aberto");
      return;
    }
  
    imgs.forEach((img) => img.classList.remove("aberto"));
    clicou.classList.add("aberto");
  });
  
  document.body.addEventListener("click", (event) => {});







  document.addEventListener("DOMContentLoaded", function() {
    const numParticles = 300; // Número de partículas
    const container = document.querySelector('.particles-container');
    const moveDuration = 7000; // Tempo para mover e retornar (em milissegundos)
    const moveRange = 100; // Faixa de movimento aleatório

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 4 + 4; // Tamanho aleatório das partículas
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = `rgba(255, 255, 255, ${Math.random()})`; // Cor aleatória
        particle.style.position = 'absolute'; // Certifique-se de que as partículas são posicionadas corretamente
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = Math.random() * window.innerHeight + 'px';

        // Adicionar a partícula ao contêiner
        container.appendChild(particle);

        // Armazenar a posição inicial
        const startX = parseFloat(particle.style.left);
        const startY = parseFloat(particle.style.top);

        // Iniciar a animação contínua
        animateParticle(particle, startX, startY);
    }

    function animateParticle(particle, startX, startY) {
        const deltaX = (Math.random() - 0.5) * moveRange; // Movimento aleatório horizontal
        const deltaY = (Math.random() - 0.5) * moveRange; // Movimento aleatório vertical

        const endX = startX + deltaX;
        const endY = startY + deltaY;

        let startTime = null;

        function move(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / moveDuration, 1);

            const x = startX + (endX - startX) * progress;
            const y = startY + (endY - startY) * progress;

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';

            if (progress < 1) {
                requestAnimationFrame(move);
            } else {
                // Após o movimento, iniciar o próximo movimento com novas coordenadas
                setTimeout(() => {
                    // Armazene a nova posição inicial
                    const newStartX = parseFloat(particle.style.left);
                    const newStartY = parseFloat(particle.style.top);
                    animateParticle(particle, newStartX, newStartY);
                }, 100); // Pequeno atraso para suavizar a transição
            }
        }

        requestAnimationFrame(move);
    }
});