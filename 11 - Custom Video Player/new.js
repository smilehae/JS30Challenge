const toggleBtn = document.querySelector(".toggle");
const video = document.querySelector(".player__video");
const skipBtns = document.querySelectorAll(`[data-skip]`);
const sliders = document.querySelectorAll(".player__slider");
const progress = document.querySelector(".progress");
const progressRate = document.querySelector(".progress__filled");
let mouseDown=false;
function handleToggle(){
    if(video.paused){
        video.play();
        toggleBtn.textContent = "❚❚";
    }
    else{
        video.pause();
        toggleBtn.textContent = "►";
    }
}
function handleSkip() {
    const skipper = Number(this.dataset.skip);
    video.currentTime+=skipper;
}
function handleSlider(){
    video[this.name]=this.value;
}
function handleProgress(e) {
    const moveRate = (e.offsetX/video.offsetWidth);
    video.currentTime = moveRate*video.duration;
}
function renewSlider(){
    const playRate = (video.currentTime/video.duration)*100;
    progressRate.style.flexBasis=`${playRate}%`;
}

toggleBtn.addEventListener("click",handleToggle);
skipBtns.forEach(btn=>btn.addEventListener("click",handleSkip));
sliders.forEach(slider=> slider.addEventListener("input",handleSlider));
progress.addEventListener("mousedown",()=>mouseDown=true);
progress.addEventListener("mouseup",()=>mouseDown=false);
progress.addEventListener("mouseleave",()=>mouseDown=false);
progress.addEventListener("mousemove",(e)=>mouseDown&&handleProgress(e));

video.addEventListener("timeupdate",renewSlider);
