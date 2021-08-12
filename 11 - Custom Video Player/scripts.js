const player = document.querySelector(".player");
const playBtn = player.querySelector(".toggle");
const myVideo = player.querySelector("video.viewer");
const volumeRange = player.querySelector("input[name=volume]");
const playBackRange = player.querySelector("input[name=playbackRate]");

console.log(playBackRange.value);

playBtn.addEventListener("click", function (e) {
  if (myVideo.paused) {
    myVideo.play();
    this.innerHTML = "❚❚";
  } else {
    myVideo.pause();
    this.innerHTML = "►";
  }
});

volumeRange.addEventListener("input", function () {
  myVideo.volume = this.value;
});

playBackRange.addEventListener("input", function () {
  myVideo.playbackRate = this.value;
});
