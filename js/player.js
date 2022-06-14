const playPrev = document.querySelector('.play-prev');
const play = document.querySelector('.play');
const playNext = document.querySelector('.play-next');

const namePlayList =document.querySelector('.play-list');
const sound = document.querySelector('.sound');

const progressBarVideo = document.querySelector('.progress-bar-video');
const progressVideo = document.querySelector('.progress-video');

const timeDuration = document.querySelector('.time-duration');

const sondProgressBar = document.querySelector('.sond-progress-bar');
const progressSound = document.querySelector('.progress-sound');

const audio =document.querySelector('.audio');


let soundIndex =0;

function LoadSound(playList) {
    namePlayList.innerHTML = playList[soundIndex].title;
    let put = playList[soundIndex].src;  // через переменную, напрямую не хочет
    audio.src = put;
    // audio.srs = playList[soundIndex].src;
    // audio.src = 'assets/sounds/Ennio Morricone.mp3';
    // console.log(put);
}

let pl = 0;
function playSound() {
    // audio.play();
    if (pl === 0) {
        play.style.backgroundImage = "url(./assets/svg/pause.svg)";
        audio.play();
        pl = 1;
    } else if (pl === 1) {
        play.style.backgroundImage = "url(./assets/svg/play.svg)";
        audio.pause();
        pl = 0;
    }
}

play.addEventListener('click', () => {
    LoadSound(playList);
    playSound();
});


function nextSound() {
    soundIndex++;
    if (soundIndex > playList.length - 1) {
        soundIndex = 0;
    } 
        console.log('soundIndex = '+soundIndex);
        LoadSound(playList);
        // console.log(audio.srs);
        pl = 0;
        playSound();
    
}
function prevSound() {
    soundIndex--;
    if (soundIndex < 0) {
        soundIndex = 3;
      
    }
    LoadSound(playList);
    pl = 0;
    playSound();
}
playNext.addEventListener('click', nextSound);

playPrev.addEventListener('click', prevSound);

//Timer
function updateProgres () {
    // progres.value = (video.currentTime / video.duration)*100;
    let duration = playList[soundIndex].duration;
    let minutes = Math.floor(audio.currentTime / 60);
    if (minutes < 10) {
        minutes = '0'+ String(minutes);
    }
    let seconds = Math.floor(audio.currentTime % 60);
    if (seconds < 10) {
        seconds = '0'+ String(seconds);
    }

    timeDuration.innerHTML = `${minutes}:${seconds} / ${duration} `; 

}

function barVideo() {  // получаем число именно в %
    let duration = audio.duration;
     let currentTime = audio.currentTime;
     let progBar = currentTime / duration * 100;// получаем число именно в %
     progressVideo.style.width = `${progBar}%`; // тут ставим %
     
}

audio.addEventListener('timeupdate', () =>{
    barVideo();
    updateProgres ()
} ); //ф-я прослушки себя по времени

function setProgres(event) {
    let widthContainer = this.clientWidth;
    //   console.log(widthContainer);
    let clickPozitionX = event.offsetX;
    // console.log(clickPozitionX);
    let duration = audio.duration;
    audio.currentTime = (clickPozitionX / widthContainer) * duration;

}

progressBarVideo.addEventListener('click' , setProgres);

audio.addEventListener('ended' , nextSound); // автоперемотка 

let soundCheck = 1;
function soundOnOf() {
    
    if (soundCheck === 1) {
        sound.style.backgroundImage = "url(./assets/svg/soundMute.svg)";
        audio.volume = 0;
        soundCheck = 0;
    } else if(soundCheck === 0){
        sound.style.backgroundImage = "url(./assets/svg/sound.svg)";
        audio.volume = 1;
        soundCheck = 1;
    } 
}
sound.addEventListener('click' ,soundOnOf);

