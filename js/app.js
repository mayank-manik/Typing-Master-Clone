let text = document.querySelector("p");
var audio = new Audio("error.mp3");
var char = new Array(),
  current = 0,
  string;

window.addEventListener("load", () => {
  let url = "https://api.quotable.io/random";
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
      console.log("HurraH...");
      location.reload();
    }
  } else {
    audio.play();
    console.log("wrong");
  }
}

document.addEventListener("keypress", keyListener);
