console.log("welcome to K-music");

// initialize the variables
let songIndex = 0;
let audioElement = new Audio('Teri Yaad - Aditya Rikhari 128 Kbps.mp3');
let masterplay = document.getElementById("masterplay");
let myprogressBar = document.getElementById('myprogressBar');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let currentSongName = document.getElementById('currentSong');

let songs = [
     { songName:"Teri yaad", filePath:"Teri Yaad - Aditya Rikhari 128 Kbps.mp3", coverPath: "sky.jpg"},
     { songName:"Tenu Sang Rakhna", filePath: "C:\Users\DELL\Desktop\ammiee\Tenu Sang Rakhna - Jigra 320 Kbps.mp3", coverPath: "picForMusic.jpg"},
     { songName:"perfect", filePath: "Perfect-(Mr-Jat.in).mp3", coverPath: "darshanPHOTO.jpg"},
     { songName:"Dooron Dooron", filePath: "Dooron Dooron(KoshalWorld.Com).mp3", coverPath: "pink sky.jpeg"},
     {songName:"finding her", filePath: "Finding Her(KoshalWorld.Com).mp3", coverPath:"darshanPHOTO2.jpg"}
]
songItem.forEach((element ,i)=> { 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});
const formatTime = (timeInSeconds) => {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = Math.floor(timeInSeconds % 60);
    if (seconds < 10) seconds = '0' + seconds;
    return `${minutes}:${seconds}`;
};

audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myprogressBar.value = progress;

    // Show current time
    document.getElementById("currentTime").innerText = formatTime(audioElement.currentTime);

    // Show total duration
    if (!isNaN(audioElement.duration)) {
        document.getElementById("totalDuration").innerText = formatTime(audioElement.duration);
    }
});


//handle play pause click
masterplay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = 0.8;
    }
    else {
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = 0.8;
    }
})
// listen to events 
audioElement.addEventListener('timeupdate',()=>{

    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    console.log(progress);
    myprogressBar.value = progress;
    
   } )
   myprogressBar.addEventListener('change',()=>{
    audioElement.currentTime = myprogressBar.value*audioElement.duration/100
   })
   const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add("fa-circle-play")
   })
}

// practice learn

   Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        const clickedIndex = parseInt(e.target.id);

        // If clicking the already playing song => pause it
        if (songIndex === clickedIndex && !audioElement.paused) {
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterplay.classList.remove('fa-circle-pause');
            masterplay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        } else {
            makeAllPlays(); // reset all icons to play
            songIndex = clickedIndex;
            audioElement.src = songs[songIndex].filePath;
            currentSongName.innerText = songs[songIndex].songName;
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.currentTime = 0;
            audioElement.play();
            masterplay.classList.remove('fa-circle-play');
            masterplay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        }
    });
});

   // next 
   document.getElementById('next').addEventListener('click',()=>{
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    currentSongName.innerText = songs[songIndex].songName;
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    gif.style.opacity = 0.8;
   })
   // previous
   document.getElementById('previous').addEventListener('click',()=>{
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    currentSongName.innerText = songs[songIndex].songName;
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    gif.style.opacity = 0.8;
   })
   // autoplay
   audioElement.addEventListener('ended', () => {
    document.getElementById('next').click();
});
//
document.addEventListener('keydown', (e) => {
    if (e.code === "Space") {
        e.preventDefault();
        masterplay.click();
    }
});
 
let islooping = false;
document.addEventListener('loopbtn').addEventListener('click',()=>{
    islooping = !islooping;
    audioElement.loop = islooping;
    document.getElementById('loopbtn'),classList.toggle('active');
});