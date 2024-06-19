const colors = ["red", "green", "blue", "yellow", "orange", "purple", "gray", "pink", "lime", "cyan", "black", "white" /*... more colors */ ]; 
const colorDisplay = document.getElementById("color-display");
const optionsContainer = document.getElementById("options");
const resultDisplay = document.getElementById("result");
const newGameButton = document.getElementById("new-game");
const feedbackImage = document.getElementById("feedback-image");
const backToHomeButton = document.getElementById("back-to-home");

let targetColor;
let currentScore = 0; // Initialize score
const defaultFeedbackImage = "/English_Fun_Kids/img/win o failed/pensando.png"; // Default image

function startGame() {
  targetColor = colors[Math.floor(Math.random() * colors.length)];
  colorDisplay.textContent = targetColor;
  createOptions();
  feedbackImage.src = defaultFeedbackImage; // Set default image 
  resultDisplay.textContent = ""; 
  updateScoreDisplay();
}


function createOptions() {
  optionsContainer.innerHTML = ''; // Clear previous options

  // Randomly choose the target color
  targetColor = colors[Math.floor(Math.random() * colors.length)];
  colorDisplay.textContent = targetColor;

  const buttons = [];

  // Create buttons for colors
  for (let i = 0; i < 4; i++) {
    const button = document.createElement('button');
    let color;
    if (i === 0) {
      color = targetColor; // Assign the target color to the first button
    } else {
      color = colors[Math.floor(Math.random() * colors.length)]; // Randomly choose other colors
      
    }
    button.style.backgroundColor = color;
    button.addEventListener('click', () => checkAnswer(color === targetColor));
    buttons.push(button);
  }

  // Shuffle the buttons array
  buttons.sort(() => Math.random() - 0.5);

  // Append the shuffled buttons to the options container
  buttons.forEach(button => optionsContainer.appendChild(button));
}



function checkAnswer(isCorrect) {
  if (isCorrect) {
    currentScore++; 
    feedbackImage.src = "/English_Fun_Kids/img/win o failed/win.png";
    resultDisplay.textContent = "¡Correcto!";
    updateScoreDisplay();
    setTimeout(startGame, 1000); // Automatic restart after 1 second
  } else {
    currentScore = 0;

    
    feedbackImage.src = "/English_Fun_Kids/img/win o failed/failed.png";
    resultDisplay.textContent = "intentalo otra ves!";
    updateScoreDisplay();
    
    // Add animation to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      if (button.classList.contains('btn_r') || button.classList.contains('btn_b')) {
        button.classList.add('button-animation', button.classList.contains('btn_r') ? 'btn_r-animation' : 'btn_b-animation');
      } else {
        button.classList.add('button-animation');
      }
    });
    setTimeout(() => {
      buttons.forEach(button => {
        button.classList.remove('button-animation', 'btn_r-animation', 'btn_b-animation');
      });
    }, 500000000); // Remove animation after 0.5 seconds
  }
}


function updateScoreDisplay() {
  document.getElementById("score").textContent = "Score: " + currentScore;
}


  backToHomeButton.addEventListener('click', () => {
    window.location.href = "/English_Fun_Kids/index.html"; // Change to your actual home page link
  });
  
  newGameButton.addEventListener('click', startGame);
  startGame();
