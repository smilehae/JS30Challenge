const playBtn = document.querySelector(".toggle");
const myVideo = document.querySelector("video.viewer");
const volumeRange = document.querySelector("input[name=volume]");
const playBackRange = document.querySelector("input[name=playbackRate]");

console.log(playBackRange.value);

playBtn.addEventListener("click", function (e) {
  if (myVideo.paused) {
    myVideo.play();
    this.innerHTML = "❚ ❚";
  } else {
    myVideo.pause();
    this.innerHTML = "►";
  }
});

volumeRange.addEventListener("input", function () {
  myVideo.volume = this.value;
});

playBackRange.addEventListener("input", function () {
  console.log(this.value);
  myVideo.playbackRate = this.value;
});
