const createEmojiBtn = document.querySelectorAll(".create-emoji-btn");
const result = document.querySelector(".result");
const ws = new WebSocket("ws://" + window.location.host);

const isDisabledBtns = {};

ws.onmessage = function (event) {
  const data = JSON.parse(event.data);
  switch (data.type) {
    case "newMessage":
      console.log("Emoji created ", data.content);
      break;
    default:
      ws.send(new Error("Controls Wrong query", data).message);
      break;
  }
};

const disableButton = (content) => {
  isDisabledBtns[content] = { content, disabled: true };

  setInterval(() => {
    isDisabledBtns[content] = { ...isDisabledBtns[content], disabled: false };
  }, 500);
};

const addEmoji = (elem) => {
  const content = elem.getAttribute("content");
  if (isDisabledBtns[content]?.disabled) {
    return;
  }

  const data = { type: "newMessage", content };
  disableButton(content);
  ws.send(JSON.stringify(data));
};

createEmojiBtn.forEach((elem) => {
  elem.addEventListener("click", () => addEmoji(elem));
});
