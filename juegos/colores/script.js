const colors = ["red", "green", "blue", "yellow", "orange", "purple", "gray", "pink", "lime", "cyan", "black", "white" /*... more colors */ ]; 
const colorDisplay = document.getElementById("color-display");
const optionsContainer = document.getElementById("options");
const resultDisplay = document.getElementById("result");
const newGameButton = document.getElementById("new-game");
const feedbackImage = document.getElementById("feedback-image");
const backToHomeButton = document.getElementById("back-to-home");

let targetColor;

function startGame() {
  targetColor = colors[Math.floor(Math.random() * colors.length)];
  colorDisplay.textContent = targetColor;
  createOptions();
  feedbackImage.src = ""; 
  resultDisplay.textContent = ""; 
  currentScore = 0; // Reset the score when a new game starts
  updateScoreDisplay();
}


function createOptions() {
  optionsContainer.innerHTML = ''; // Clear previous options
  let shuffledColors = colors.slice().sort(() => Math.random() - 0.5); // Shuffle colors

  // Create button for correct color
  const correctButton = document.createElement("button");

  correctButton.style.backgroundColor = targetColor; 
  correctButton.addEventListener("click", () => checkAnswer(true));
  optionsContainer.appendChild(correctButton);

  // Create buttons for incorrect colors
  shuffledColors.slice(0,3).forEach(color => {
    if (color !== targetColor) {
      const button = document.createElement('button');

      button.style.backgroundColor = color;
      button.addEventListener('click', () => checkAnswer(false));
      optionsContainer.appendChild(button);
    }
  });
}

function checkAnswer(isCorrect) {
  if (isCorrect) {
    currentScore++; // Increment score if correct
    feedbackImage.src = "/img/memoramas_img/rana.jpg";
    resultDisplay.textContent = "¡Correct!";
    updateScoreDisplay();
    startGame(); // Start a new round
  } else {
    currentScore = 0; // Reset score if incorrect
    feedbackImage.src = "/img/memoramas_img/limon.jpg";
    resultDisplay.textContent = "Try Again!";
    updateScoreDisplay();
  }
}
function updateScoreDisplay() {
  scoreDisplay.textContent = "Score: " + currentScore;
}

  backToHomeButton.addEventListener('click', () => {
    window.location.href = "/index.html"; // Change to your actual home page link
  });
  
  newGameButton.addEventListener('click', startGame);
  startGame();