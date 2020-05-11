let colors = [];
let numsOfColor = 6;
let pickedColor;
const h1 = document.querySelector("h1");
const resetButton = document.querySelector("#reset");
let colorDisplay = document.getElementById("color-display");
const message = document.querySelector("#message");
const squares = document.querySelectorAll(".square");
const modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  // modeButtons event listener
  setupModeButtons();

  setupSquares();

  gameReset();
}

function setupModeButtons() {
  for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function () {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? (numsOfColor = 3) : (numsOfColor = 6);
      gameReset();
    });
  }
}

function setupSquares() {
  for (let i = 0; i < squares.length; i++) {
    // add click event listener to squares
    squares[i].addEventListener("click", function () {
      const clickedColor = this.style.background;
      if (clickedColor === pickedColor) {
        message.textContent = "Correct!";
        changeColor(clickedColor);
        h1.style.background = clickedColor;
        reset.textContent = "Play Again?";
      } else {
        this.style.background = "#232323";
        message.textContent = "Try again!";
      }
    });
  }
}

function gameReset() {
  colors = generateRandomColors(numsOfColor);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  message.textContent = "";
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.background = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  reset.textContent = "New Colors";
  h1.style.background = "steelblue";
}

resetButton.addEventListener("click", function () {
  gameReset();
});

function generateRandomColors(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColors());
  }
  return arr;
}

function randomColors() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function changeColor(color) {
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.background = color;
  }
}

function pickColor() {
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}
