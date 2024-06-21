const totalCards = 16; 
const availableCardNames = ['ballena', 'cangrejo', 'cereza', 'foca', 
  'limon', 'manzana', 'medusa', 'naranja', 
  'pera', 'pez', 'platano', 'pulpo',
  'rana', 'sandia', 'tortuga', 'uvas'];
const imgPath = '/img/memoramas_img/';

let cards = []; 
let selectedCards = [];
let valuesUsed = []; 
let currentMove = 0; 
let currentAttempts = 0;

let cardTemplate = '<div class="card"><div class="back"></div><div class="face"><img src="" alt=""></div></div>';

function activate(e) {
  if (currentMove < 2) {
    if ((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active')) {
      e.target.classList.add('active');
      selectedCards.push(e.target);

      if (++currentMove == 2) {
        currentAttempts++;
        document.querySelector('#stats').innerHTML = currentAttempts + ' intentos';

        if (selectedCards[0].querySelectorAll('.face img')[0].alt == selectedCards[1].querySelectorAll('.face img')[0].alt) {
          selectedCards = [];
          currentMove = 0;

          if (document.querySelectorAll('.card.active').length === totalCards) { 
            win();
          }
        } else {
          setTimeout(() => {
            selectedCards[0].classList.remove('active');
            selectedCards[1].classList.remove('active');
            selectedCards = [];
            currentMove = 0;
          }, 600);
        }
      }
    }
  }
}

function getFaceImage(imgName) {
  return imgPath + imgName + '.jpg';  
}

function getMatchingEnglishImage(imgName) {
  return imgPath + imgName + '_ingles.jpg';
}

function randomValue() {
  let rnd = Math.floor(Math.random() * totalCards * 0.5);
  let values = valuesUsed.filter(value => value === rnd);
  if (values.length < 2) {
    valuesUsed.push(rnd);
  } else {
    randomValue();
  }
}
function win() {
  const statsElement = document.querySelector('#stats');
  statsElement.innerHTML = '¡Congratulations!';

  const victoryImage = document.getElementById('victoryImage');
  victoryImage.style.display = 'block'; // Mostrar la imagen de victoria

  const victorySound = document.getElementById('victorySound');
  victorySound.play();

  setTimeout(() => {
    window.location.href = '/English_Fun_Kids/index.html'; // Redirigir después de 3 segundos
  }, 3000);
  
}





for (let i=0; i < totalCards; i++) {
  let div = document.createElement('div');
  div.innerHTML = cardTemplate;
  cards.push(div);
  document.querySelector('#game').append(cards[i]);

  randomValue(); 

  const cardImage = getFaceImage(availableCardNames[valuesUsed[i]]);
  const matchingEnglishImage = getMatchingEnglishImage(availableCardNames[valuesUsed[i]]);


  cards[i].querySelectorAll('.face img')[0].src = matchingEnglishImage; 
  cards[i].querySelectorAll('.face img')[0].alt = availableCardNames[valuesUsed[i]];

  cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
}
