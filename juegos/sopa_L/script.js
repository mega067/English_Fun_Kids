const words = [
    { word: "HELLO", translation: "hola" },
    { word: "DOG", translation: "perro" },
    { word: "CAT", translation: "gato" },
    { word: "HOUSE", translation: "casa" },
    { word: "COMPUTER", translation: "computadora" },
    { word: "BIRD", translation: "pajaro" },
    { word: "EAGLE", translation: "Aguila" },
    { word: "ZOO", translation: "Zoologico" },
    { word: "FLOWER", translation: "Flor" }
  ];
  var i =1;
  
  const gridSize = 10; // Tamaño de la cuadrícula (opcional, puedes ajustarlo)
  let grid = [];
  let selectedWord = '';
  let wordList = document.getElementById('wordList').getElementsByTagName('ul')[0];
  
  function createGrid() {
    const wordGrid = document.getElementById('wordGrid');
    wordGrid.innerHTML = ''; // Reiniciamos la cuadrícula
  
    for (let i = 0; i < gridSize * gridSize; i++) {
      const cell = document.createElement('div');
      cell.addEventListener('click', selectCell); // Cambiamos a 'click'
      wordGrid.appendChild(cell);
      grid.push('');
    }
  }
  
  function placeWords() {
    for (let i = 0; i < words.length; i++) {
      let word = words[i].word;
      let placed = false;
  
      while (!placed) {
        let startRow = Math.floor(Math.random() * (gridSize - word.length + 1));
        let startCol = Math.floor(Math.random() * gridSize);
        let direction = Math.floor(Math.random() * 4); // 0: horizontal, 1: vertical
  
        if (canPlaceWord(startRow, startCol, word, direction)) {
          placeWord(startRow, startCol, word, direction);
          placed = true;
        }
      }
    }
  }
  
  function canPlaceWord(row, col, word, direction) {
    if (direction === 0) { // Horizontal
      for (let i = 0; i < word.length; i++) {
        if (col + i >= gridSize || grid[row * gridSize + col + i] !== '') {
          return false;
        }
      }
    } else { // Vertical
      for (let i = 0; i < word.length; i++) {
        if (row + i >= gridSize || grid[(row + i) * gridSize + col] !== '') {
          return false;
        }
      }
    }
    return true;
  }
  
  function placeWord(row, col, word, direction) {
    if (direction === 0) { // Horizontal
      for (let i = 0; i < word.length; i++) {
        grid[row * gridSize + col + i] = word[i];
      }
    } else { // Vertical
      for (let i = 0; i < word.length; i++) {
        grid[(row + i) * gridSize + col] = word[i];
      }
    }
  }
  
  function populateGrid() {
    // Llena la cuadrícula con letras aleatorias
    for (let i = 0; i < grid.length; i++) {
      if (grid[i] === '') {
        grid[i] = String.fromCharCode(Math.floor(Math.random() * 26) + 65); // Letras A-Z
      }
      document.querySelectorAll('#wordGrid div')[i].textContent = grid[i];
    }
  }
  
  function selectCell(event) {
    const clickedCell = event.target;
    const clickedIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell);
    const clickedRow = Math.floor(clickedIndex / gridSize);
    const clickedCol = clickedIndex % gridSize;
  
    // Si la celda ya está resaltada, desmarcarla
    if (clickedCell.classList.contains('highlighted')) {
      clickedCell.classList.remove('highlighted');
      selectedWord = selectedWord.replace(new RegExp(grid[clickedRow * gridSize + clickedCol], 'g'), '');
    } else {
      clickedCell.classList.add('highlighted');
      selectedWord += grid[clickedRow * gridSize + clickedCol];
    }
  
    if (words.some(w => w.word === selectedWord)) {
      markWordAsFound(selectedWord);
      // Marcar letras permanentemente
      document.querySelectorAll('#wordGrid div').forEach(cell => {
        if (cell.classList.contains('highlighted')) {
          cell.classList.add('permanent-highlighted');
          cell.removeEventListener('click', selectCell);
        }
      });
      selectedWord = ''; // Reiniciar la palabra seleccionada
    }
  }
  
  // Lógica para actualizar la lista de palabras encontradas
  function markWordAsFound(word) {

    const wordItem = document.createElement('li');
    wordItem.textContent = i + word + ' - ' + words.find(w => w.word === word).translation;
    wordList.appendChild(wordItem);
    
  }
  function resetPage() {
    location.reload(); // Esta línea actualiza la página
}

  
  
  createGrid(); // Crea la cuadrícula
  placeWords(); // Coloca las palabras aleatoriamente
  populateGrid(); // Llena la cuadrícula con letras
  
// Obtén una referencia al botón
