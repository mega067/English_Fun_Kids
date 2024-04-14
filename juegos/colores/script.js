const colors = ["red", "green", "blue", "yellow", "orange", "purple", /*... more colors */ ]; 
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
    feedbackImage.src = ""; // Clear previous image
    resultDisplay.textContent = ""; // Clear previous text
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
      feedbackImage.src = "/img/memoramas_img/rana.jpg"; // Replace with your correct image path
      resultDisplay.textContent = "¡Correct!";
    } else {
      feedbackImage.src = "incorrect-image.png"; // Replace with your incorrect image path
      resultDisplay.textContent = "Try Again!";
    }
  }

  backToHomeButton.addEventListener('click', () => {
    window.location.href = "/index.html"; // Change to your actual home page link
  });
  
  newGameButton.addEventListener('click', startGame);
  startGame();