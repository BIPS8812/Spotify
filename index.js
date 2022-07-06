// Initialize
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = document.querySelectorAll('.songItem');
let songItemsPlay = document.querySelectorAll(".songItemPlay");

let songs = [{
    songName: "Best song ever - One Direction",
    filePath: "songs/1.mp3",
    coverPath: "covers/Best song ever.jpeg"
  },
  {
    songName: "Let me love you - DJ Snake, Justin Bieber",
    filePath: "songs/2.mp3",
    coverPath: "covers/Let me love you.jpeg"
  },
  {
    songName: "Night changes - One Direction",
    filePath: "songs/3.mp3",
    coverPath: "covers/Night changes.jpeg"
  },
  {
    songName: "One way or another - One Direction",
    filePath: "songs/4.mp3",
    coverPath: "covers/One way or another.jpeg"
  },
  {
    songName: "Perfect - One Direction",
    filePath: "songs/5.mp3",
    coverPath: "covers/Perfect.jpeg"
  },
  {
    songName: "Shape of you - Ed Shreeran",
    filePath: "songs/6.mp3",
    coverPath: "covers/Shape of you.jpeg"
  },
  {
    songName: "Steal my girl - One Direction",
    filePath: "songs/7.mp3",
    coverPath: "covers/Steal my girl.jpeg"
  },
  {
    songName: "Story of my life - One Direction",
    filePath: "songs/8.mp3",
    coverPath: "covers/Story of my life.jpeg"
  },
  {
    songName: "What makes you beautiful - One Direction",
    filePath: "songs/9.mp3",
    coverPath: "covers/What makes you beautiful.jpeg"
  },
  {
    songName: "You and I - One Direction",
    filePath: "songs/10.mp3",
    coverPath: "covers/You and I.jpeg"
  },
  {
    songName: "Peaches - Justin Bieber ft.Daniel Caesar, Giveon",
    filePath: "songs/11.mp3",
    coverPath: "covers/Peaches.jpeg"
  }
]

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.querySelectorAll(".songName")[0].innerText = songs[i].songName;
})

// Play music
masterPlay.addEventListener("click", function() {
  if (audioElement.paused || audioElement.currentTime === 0) {
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    songItemsPlay[songIndex].classList.remove('fa-circle-play');
    songItemsPlay[songIndex].classList.add('fa-circle-pause');
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    songItemsPlay[songIndex].classList.remove('fa-circle-pause');
    songItemsPlay[songIndex].classList.add('fa-circle-play');
    gif.style.opacity = 0;
  }
})
//update seekbar;
audioElement.addEventListener("timeupdate", function() {
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
})

myProgressBar.addEventListener("change", function() {
  audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

//songItemPlay
function makeAllPlay() {
  songItemsPlay.forEach(function(element) {
    element.classList.remove("fa-circle-pause");
    element.classList.add("fa-circle-play");
  })
}

function removeFocus() {
  songItems.forEach(function(element) {
    element.classList.remove('focus');
  })
}

songItemsPlay.forEach((element, i) => (
  element.addEventListener("click", function(event) {
    let currentSong = "songs/" + (i + 1) + ".mp3";
    if (audioElement.getAttribute("src") === currentSong) {
      if (audioElement.paused === false) {
        audioElement.pause();
        event.target.classList.remove("fa-circle-pause");
        event.target.classList.add("fa-circle-play");
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
      } else {
        audioElement.play();
        event.target.classList.remove("fa-circle-play");
        event.target.classList.add("fa-circle-pause");
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
      }
    } else {
      songIndex = i;
      makeAllPlay();
      removeFocus();
      masterSongName.textContent = songs[songIndex].songName;
      gif.style.opacity = 1;
      event.target.classList.remove("fa-circle-play");
      event.target.classList.add("fa-circle-pause");
      songItems[songIndex].classList.add('focus');
      audioElement.src = 'songs/' + (songIndex + 1) + '.mp3';
      audioElement.currentTime = 0;
      audioElement.play();
      masterPlay.classList.remove('fa-circle-play');
      masterPlay.classList.add('fa-circle-pause');
    }
  })
))


//Previous and next button
document.getElementById("next").addEventListener("click", function() {
  songItemsPlay[songIndex].classList.remove('fa-circle-pause');
  songItemsPlay[songIndex].classList.add('fa-circle-play');
  songItems[songIndex].classList.remove('focus');
  if (songIndex >= 10) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = 'songs/' + (songIndex + 1) + '.mp3';
  masterSongName.textContent = songs[songIndex].songName;
  gif.style.opacity = 1;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
  songItemsPlay[songIndex].classList.remove('fa-circle-play');
  songItemsPlay[songIndex].classList.add('fa-circle-pause');
  songItems[songIndex].classList.add('focus');
})

document.getElementById("previous").addEventListener("click", function() {
  songItemsPlay[songIndex].classList.remove('fa-circle-pause');
  songItemsPlay[songIndex].classList.add('fa-circle-play');
  songItems[songIndex].classList.remove('focus');
  if (songIndex === 0) {
    songIndex = 10;
  } else {
    songIndex -= 1;
  }
  audioElement.src = 'songs/' + (songIndex + 1) + '.mp3';
  masterSongName.textContent = songs[songIndex].songName;
  gif.style.opacity = 1;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
  songItemsPlay[songIndex].classList.remove('fa-circle-play');
  songItemsPlay[songIndex].classList.add('fa-circle-pause');
  songItems[songIndex].classList.add('focus');
})

// Auto-play next song
audioElement.addEventListener("ended", function () {
  songItemsPlay[songIndex].classList.remove('fa-circle-pause');
  songItemsPlay[songIndex].classList.add('fa-circle-play');
  songItems[songIndex].classList.remove('focus');
  if (songIndex >= 10) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = 'songs/' + (songIndex + 1) + '.mp3';
  masterSongName.textContent = songs[songIndex].songName;
  gif.style.opacity = 1;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
  songItemsPlay[songIndex].classList.remove('fa-circle-play');
  songItemsPlay[songIndex].classList.add('fa-circle-pause');
  songItems[songIndex].classList.add('focus');
})
