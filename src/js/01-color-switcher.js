const ref = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

ref.btnStart.addEventListener('click', changeBGColor);
ref.btnStop.addEventListener('click', removeSetInterval);
let timerId = null;

function changeBGColor(ev) {
  timerId = setInterval(() => {
    ref.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  ref.btnStart.disabled = true;
}

function removeSetInterval(ev) {
  clearTimeout(timerId);
  ref.btnStart.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
