const startBtn = document.querySelector('.js-start');
const stopBtn = document.querySelector('.js-stop');
const body = document.querySelector('body');

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);

let id;

function onStart() {
  startBtn.disabled = true;
  id = setInterval(() => {
    body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
}

function onStop() {
  startBtn.disabled = false;
  clearInterval(id);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
