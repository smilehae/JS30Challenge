//setIntervel 함수로 1초마다 1씩 줄어들게 하면 가끔 성능 이슈가 있다고 한다. 스크롤 할때 특히 심각.

let countdown;
const timeDisplay = document.querySelector(".display__time-left");
const endtime = document.querySelector(".display__end-time");
const customform = document.querySelector("#custom");
const buttons = Array.from(document.querySelectorAll(".timer__button"));

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now(); //1970년 1월 1일부터 현재까지의 밀리초
  const then = now + seconds * 1000; //특정 초 지남
  displayTimeLeft(seconds);
  displayEndTime(then);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  let secondsLeft = seconds;

  const minute = Math.floor(secondsLeft / 60);
  secondsLeft = secondsLeft % 60;

  const display = `${minute}:${secondsLeft > 10 ? "" : "0"}${secondsLeft}`;
  timeDisplay.textContent = display;
  document.title = display;
}

//new Date(밀리초) 이렇게 timestamp를 넣으면 실제 시간이 언젠지 알려줌. 그상태에서 getMonth 등을 할 수 있다.\
function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minute = end.getMinutes();
  endtime.textContent = `Be Back at ${hour > 12 ? hour - 12 : hour}:${
    minute > 10 ? "" : "0"
  }${minute} ${hour > 12 ? "PM" : "AM"}`;
}

buttons.forEach((button) =>
  button.addEventListener("click", function () {
    timer(button.dataset.time);
  })
);

//아이디로 폼 자체를 잡고, .name 속성으로 접근해서 값을 가져올 수 있다!
customform.addEventListener("submit", function (e) {
  e.preventDefault();
  const min = this.minutes.value * 60;
  timer(min);
});
