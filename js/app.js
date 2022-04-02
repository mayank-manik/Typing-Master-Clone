let text = document.querySelector("p");
let timer = document.getElementById("timer");
let audio = new Audio("error.mp3");
let char = new Array(), current = 0, string;
let min = 0;
let sec = 0;


window.addEventListener("load", () => {
  let url = "https://api.quotable.io/random?maxLength=150";
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      text.innerHTML = `${data.content}`;
      string = data.content;
      for (const it of string) {
        char.push(it);
      }
    });
});

function markText(str) {
  text.innerHTML =
    `<mark>${text.innerText.substring(0, current)}</mark>` +
    text.innerText.substring(current);
}

function keyListener(e) {
  var code = e.keyCode || e.which,
    str = String.fromCharCode(code);

  if (str === char[current]) {
    current++;
    markText(str);

    if (current >= char.length) {
      alert(`Hurrah !! You made it in ${min}m ${sec}s.`);
      location.reload();
    }
  } else {
    audio.play();
  }
}

function timerUpdate() {
  sec = (sec + 1);
  if (sec >= 60) {
    sec = 0;
    min++;
  }
  timer.innerHTML = `${min}:${sec}`;
}

function timerStart(e) {
  setInterval(() => {
    timerUpdate()
  }, 1000);
}


document.addEventListener("keypress", keyListener);
document.addEventListener("keypress", timerStart, { once: true });
