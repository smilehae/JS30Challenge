document.addEventListener("keydown", function (event) {
  if (
    event.keyCode == 65 ||
    event.keyCode == 83 ||
    event.keyCode == 68 ||
    (event.keyCode >= 70 && event.keyCode <= 72) ||
    (event.keyCode >= 74 && event.keyCode <= 76)
  ) {
    const key = document.querySelectorAll(`[data-key='${event.keyCode}']`);
    const audio = key[1];
    audio.load();
    audio.play();
    //   const cloneAudio = audio.cloneNode();
    //   cloneAudio.play();
    //   cloneAudio.remove();

    key[0].classList.add("playing");
    window.setTimeout(function () {
      key[0].classList.remove("playing");
    }, 100);
  }
});

/*
    만들면서 겪은 문제들
    1. audio를 play()로 돌렸더니 소리가 겹치게 되면 뒤에 누른 소리는 씹히게 되었다. 검색을 통해 이럴땐 audio파일.cloneNode로 복제해서 이걸 play 시키는 식으로 해결하였다. 아마 같은 오디오소스를 이용하려다 보니, play가 끝날때까지 기다리는 것 같고, 그래서 별도의 오디오소스로 작동하도록 만든 것 같다. 어차피 해당 함수 끝나면 만든 변수들 없어지니까 이렇게 clone을 생성해도 문제 없는듯.

    -> 아니다. 문제가 있었다. 이렇게 하고 동시에 빨리 누르자 clone이 너무 많이 만들어졌는데, 크롬 상에서 40개 이상 audio 동시 작동을 막아놨다고 한다. 실제로 오류가 뜨더라.. 그래서 다시 검색해보았고, audio.load() 다음에 audio.play()를 하면 잘 작동한다는 것을 찾게 되었다.
    이게 왜 가능한지 문서를 찾아보았는데, load()는 해당 오디오를 reload 한다고 한다. 어차피 소리가 나오는 구간은 엄청 짧고, 따라서 다음에 키보드를 누를때 다시 처음으로 돌아가서 소리를 내도, 결과적으론 잘 중첩되서 들리는 것 처럼 되는것!

    : 동시에 짧은 입력이 여러개 필요하면, 2번째 방법처럼 load() play() 사용.
    동시에 여러 입력이 들어오지는 않고, 소리의 질이 필요하다면, 첫번째 방법처럼 사용하는 것이 좋을 것 같다.

    
=    *. HTML 파일의 body의 끝부분에 JS를 놓아야 한다!! 괜히 head에 놓지 말것
*/
