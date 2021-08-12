const player = document.querySelector(".player");
const playBtn = player.querySelector(".toggle");
const myVideo = player.querySelector("video.viewer");
const volumeRange = player.querySelector("input[name=volume]");
const playBackRange = player.querySelector("input[name=playbackRate]");
//이렇게 [속성] 만으로도 찾기 가능
const skipButtons = player.querySelectorAll("[data-skip]");
const progress = player.querySelector(".progress");
const progressContent = player.querySelector(".progress__filled");

let durationTime;

myVideo.addEventListener("loadedmetadata", function () {
  durationTime = myVideo.duration;
});

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

skipButtons.forEach((skipBtn) =>
  skipBtn.addEventListener("click", function () {
    let skipper = Number(this.dataset.skip);
    if (myVideo.currentTime + skipper < 0) {
      myVideo.currentTime = 0;
    } else {
      myVideo.currentTime += skipper;
    }
    console.log(myVideo.currentTime);
  })
);

myVideo.addEventListener("timeupdate", function () {
  const barRatio = (myVideo.currentTime / durationTime) * 100;
  console.log(barRatio);
  progressContent.style.flexBasis = `${barRatio}%`;
});
