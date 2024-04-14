const colors = ["red", "green", "blue", "yellow", "orange", "purple", /*... more colors */ ]; 
const colorDisplay = document.getElementById("color-display");
const optionsContainer = document.getElementById("options");
const resultDisplay = document.getElementById("result");
const newGameButton = document.getElementById("new-game")

let targetColor;

function startGame() {
  targetColor = colors[Math.floor(Math.random() * colors.length)];
  colorDisplay.textContent = targetColor;
  createOptions();
}


function createOptions() {
  optionsContainer.innerHTML = ''; // Clear previous options
  let shuffledColors = colors.slice().sort(() => Math.random() - 0.5); // Shuffle colors

  // Create button for correct color
  const correctButton = document.createElement("button");
  correctButton.textContent = targetColor;
  correctButton.style.backgroundColor = targetColor; 
  correctButton.addEventListener("click", () => checkAnswer(true));
  optionsContainer.appendChild(correctButton);

  // Create buttons for incorrect colors
  shuffledColors.slice(0,3).forEach(color => {
    if (color !== targetColor) {
      const button = document.createElement('button');
      button.textContent = color;
      button.style.backgroundColor = color;
      button.addEventListener('click', () => checkAnswer(false));
      optionsContainer.appendChild(button);
    }
  });
}

function checkAnswer(isCorrect) {
  if (isCorrect) {
    resultDisplay.textContent = "¡Correct!";
  } else {
    resultDisplay.textContent = "Try Again!";
  }
}

newGameButton.addEventListener('click', startGame);
startGame(); 