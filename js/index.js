const 정답 = "YANGPA";

let attemts = 0; //시도 횟수
let index = 0; //let은 수정가능.
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:20vh;left:40vw; background-color:white; width:200px; height:100px";
    document.body.appendChild(div);
  };
  const nextLine = () => {
    if (attemts === 6) {
      return gameover();
    }
    attemts++;
    index = 0;
  };
  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown); //이벤트 제거
    displayGameover();
    clearInterval(timer); //
  };

  //로직들
  const handleEnterkey = () => {
    let 맞은_갯수 = 0;
    for (let i = 0; i < 6; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attemts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64"; //초록색
      } else if (정답.includes(입력한_글자))
        block.style.background = "#C9B458"; //노란색
      else block.style.background = "#787C7E"; //회색
      block.style.color = "white";
    }
    if (맞은_갯수 === 6) {
      gameover();
    } else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attemts}${index - 1}']`
      );

      preBlock.innerText = "";
    }
    if (index !== 0) index--;
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    //원하는 변수를 넣고 싶을 때는 ``를 넣는다.
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attemts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 6) {
      if (event.key === "Enter") {
        handleEnterkey(); //정답확인
      } else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
      // index = index + 1;, index ++; 같은 표현이라 볼 수 있음
    }
  };

  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간_ = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간_.getMinutes().toString().padStart(2, "0"); //분 가져오기, 문자열로 변환
      const 초 = 흐른_시간_.getSeconds().toString().padStart(2, "0"); //초 가져오기, 문자열로 변환
      const timeDiv = document.querySelector("#timer"); //time class 호출
      timeDiv.innerText = `${분}:${초}`;
    }

    // 주기성
    timer = setInterval(setTime, 1000); //ms단위이므로 1000을 넣어야함  ,

    // SetInterval 에 id를 저장함.
  };

  startTimer();
  //addEventListener 함수는 event가 전달됨.
  window.addEventListener("keydown", handleKeydown);
}

appStart();
