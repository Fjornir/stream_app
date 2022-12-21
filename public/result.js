const result = document.querySelector(".result");

const ws = new WebSocket("ws://localhost:8080");

ws.onmessage = function (event) {
  const data = JSON.parse(event.data);
  switch (data.type) {
    case "newMessage":
      rerenderResult(data.content);
      break;
    default:
      ws.send(new Error("Result Wrong query").message);
      break;
  }
};

const rerenderResult = (content) => {
  const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
  const randomMove1 = Math.random() * 5 * plusOrMinus;
  const randomMove2 = Math.random() * 15 * plusOrMinus;
  const randomMove3 = Math.random() * 30 * plusOrMinus;
  const randomMove4 = Math.random() * 45 * plusOrMinus;
  const randomSize = Math.random() * (36 - 18) + 18;

  const span = document.createElement("span");
  span.className = "result__item";
  span.setAttribute(
    "style",
    `
      --random-pos-1: ${Math.trunc(randomMove1)}px;
      --random-pos-2: ${Math.trunc(randomMove2)}px;
      --random-pos-3: ${Math.trunc(randomMove3)}px;
      --random-pos-4: ${Math.trunc(randomMove4)}px;
      
      --random-deg-1: ${Math.trunc(-randomMove1)}deg;
      --random-deg-2: ${Math.trunc(-randomMove2)}deg;
      --random-deg-3: ${Math.trunc(-randomMove3)}deg;
      --random-deg-4: ${Math.trunc(-randomMove4)}deg;
      
      --random-size: ${Math.trunc(randomSize)}px;
    `
  );
  span.innerHTML = content;
  result.appendChild(span);
  setTimeout(() => span.remove(), 2000);
};
