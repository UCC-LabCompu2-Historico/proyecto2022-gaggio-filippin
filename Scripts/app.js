// Elementos HTML
const estadoDiv = document.querySelector('#estado');
const reiniciarDiv = document.querySelector('#reiniciar');
const celdaDivs = document.querySelectorAll('.juego-celda');

// constantes del juego
const xSimbolo = '×';
const oSimbolo = '○';

// variables del juego
let jugando = true;
let turnoX = true;


// funciones
const letraASimbolo = (letter) => letter === 'x' ? xSimbolo : oSimbolo;

const elGanador = (letter) => {
  jugando = false;
  if (letter === 'x') {
    estadoDiv.innerHTML = `${letraASimbolo(letter)} ES GANADOR!`;
  } else {
    estadoDiv.innerHTML = `<span>${letraASimbolo(letter)} ES GANADOR!</span>`;
  }
};

const checkEstadoJuego = () => {
  const topLeft = celdaDivs[0].classList[1];
  const topMiddle = celdaDivs[1].classList[1];
  const topRight = celdaDivs[2].classList[1];
  const middleLeft = celdaDivs[3].classList[1];
  const middleMiddle = celdaDivs[4].classList[1];
  const middleRight = celdaDivs[5].classList[1];
  const bottomLeft = celdaDivs[6].classList[1];
  const bottomMiddle = celdaDivs[7].classList[1];
  const bottomRight = celdaDivs[8].classList[1];

  // checkear ganador
  if (topLeft && topLeft === topMiddle && topLeft === topRight) {
    elGanador(topLeft);
    celdaDivs[0].classList.add('ganador');
    celdaDivs[1].classList.add('ganador');
    celdaDivs[2].classList.add('ganador');
  } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
    elGanador(middleLeft);
    celdaDivs[3].classList.add('ganador');
    celdaDivs[4].classList.add('ganador');
    celdaDivs[5].classList.add('ganador');
  } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
    elGanador(bottomLeft);
    celdaDivs[6].classList.add('ganador');
    celdaDivs[7].classList.add('ganador');
    celdaDivs[8].classList.add('ganador');
  } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
    elGanador(topLeft);
    celdaDivs[0].classList.add('ganador');
    celdaDivs[3].classList.add('ganador');
    celdaDivs[6].classList.add('ganador');
  } else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
    elGanador(topMiddle);
    celdaDivs[1].classList.add('ganador');
    celdaDivs[4].classList.add('ganador');
    celdaDivs[7].classList.add('ganador');
  } else if (topRight && topRight === middleRight && topRight === bottomRight) {
    elGanador(topRight);
    celdaDivs[2].classList.add('ganador');
    celdaDivs[5].classList.add('ganador');
    celdaDivs[8].classList.add('ganador');
  } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
    elGanador(topLeft);
    celdaDivs[0].classList.add('ganador');
    celdaDivs[4].classList.add('ganador');
    celdaDivs[8].classList.add('ganador');
  } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
    elGanador(topRight);
    celdaDivs[2].classList.add('ganador');
    celdaDivs[4].classList.add('ganador');
    celdaDivs[6].classList.add('ganador');
  } else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight) {
    jugando = false;
    estadoDiv.innerHTML = 'EMPATE!';
  } else {
    turnoX = !turnoX;
  }
};


// evento de rondas
const rondaReset = () => {
  estadoDiv.innerHTML = 'Siguiente Juego';
  for (const celdaDiv of celdaDivs) {
    celdaDiv.classList.remove('x');
    celdaDiv.classList.remove('o');
    celdaDiv.classList.remove('ganador');
  }
  jugando = true;
};

const handleCellClick = (e) => {
  const classList = e.target.classList;

  if (!jugando || classList[1] === 'x' || classList[1] === 'o') {
    return;
  }

  if (turnoX) {
    classList.add('x');
    checkEstadoJuego();
  } else {
    classList.add('o');
    checkEstadoJuego();
  }
};

// llamadas de eventos
reiniciarDiv.addEventListener('click', rondaReset);

for (const celdaDiv of celdaDivs) {
  celdaDiv.addEventListener('click', handleCellClick)
}
