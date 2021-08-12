const player = document.querySelector(".player");
const playBtn = player.querySelector(".toggle");
const myVideo = player.querySelector("video.viewer");
// const volumeRange = player.querySelector("input[name=volume]");
// const playBackRange = player.querySelector("input[name=playbackRate]");
const ranges = player.querySelectorAll("input[type=range]");
//이렇게 [속성] 만으로도 찾기 가능
const skipButtons = player.querySelectorAll("[data-skip]");
const progress = player.querySelector(".progress");
const progressContent = player.querySelector(".progress__filled");

let durationTime;

myVideo.addEventListener("loadedmetadata", function () {
  durationTime = myVideo.duration;
});

function togglePlay() {
  myVideo.paused ? myVideo.play() : myVideo.pause();
}

function toggleBtn() {
  playBtn.textContent = !myVideo.paused ? "❚❚" : "►";
}

myVideo.addEventListener("click", togglePlay);
playBtn.addEventListener("click", togglePlay);

myVideo.addEventListener("play", toggleBtn);
myVideo.addEventListener("pause", toggleBtn);

//아래 두 개의 함수를 하나의 함수로 합칠 수 있다.
// volumeRange.addEventListener("input", function () {
//   myVideo.volume = this.value;
// });

// playBackRange.addEventListener("input", function () {
//   myVideo.playbackRate = this.value;
// });
function handleRange() {
  myVideo[this.name] = this.value;
}

ranges.forEach((range) => range.addEventListener("change", handleRange));

//0초 전, max이후로 돌아가지 못하게 처리가 되어 있는 듯하다. 예외처리 필요X
skipButtons.forEach((skipBtn) =>
  skipBtn.addEventListener("click", function () {
    let skipper = Number(this.dataset.skip);
    myVideo.currentTime += skipper;
  })
);

myVideo.addEventListener("timeupdate", function () {
  const barRatio = (myVideo.currentTime / durationTime) * 100;
  progressContent.style.flexBasis = `${barRatio}%`;
});

let isDown = false;
progress.addEventListener("mousedown", () => (isDown = true));
progress.addEventListener("mousemove", (e) => {
  if (isDown) {
    //const scrubTime= e.offsetX;
    const scrubTime = (e.offsetX / progress.offsetWidth) * myVideo.duration;
    myVideo.currentTime = scrubTime;
  }
});
progress.addEventListener("mouseup", (e) => {
  isDown = false;
});
