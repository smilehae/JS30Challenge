const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
  const MediaStream = new MediaStream();
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((MediaStream) => {
      console.log(MediaStream);
      //비디오가 이해하는 형식으로 만들어짐
      video.src = window.URL.createObjectURL(MediaStream);
      video.play();
    });
}

getVideo();
