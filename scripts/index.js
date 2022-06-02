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
    estadoDiv.innerHTML = `X ES GANADOR!`;

    setTimeout(function(){
    document.getElementById('myCanvas').classList.remove('hidden');
    document.getElementById('juego').classList.add('hidden');
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var s = getComputedStyle(canvas);
    var w = s.width;
    var h = s.height;
    canvas.width = w.split('px')[0];
    canvas.height = h.split('px')[0];
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.textAlign  = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgb(217, 209, 180, 1)";
    ctx.font = "70px Source Sans Pro";
    ctx.fillText( "EL GANADOR ES X", canvas.width/2, canvas.height/2);
    },800);

  } else {
    estadoDiv.innerHTML = `<span>O ES GANADOR!</span>`;
    setTimeout(function(){
      document.getElementById('myCanvas').classList.remove('hidden');
      document.getElementById('juego').classList.add('hidden');
      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d");
      var s = getComputedStyle(canvas);
      var w = s.width;
      var h = s.height;
      canvas.width = w.split('px')[0];
      canvas.height = h.split('px')[0];
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.textAlign  = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgb(217, 209, 180, 1)";
      ctx.font = "70px Source Sans Pro";
      ctx.fillText( "EL GANADOR ES O", canvas.width/2, canvas.height/2);
      },800);
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
    
    setTimeout(function(){
      document.getElementById('myCanvas').classList.remove('hidden');
      document.getElementById('juego').classList.add('hidden');
      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d");
      var s = getComputedStyle(canvas);
      var w = s.width;
      var h = s.height;
      canvas.width = w.split('px')[0];
      canvas.height = h.split('px')[0];
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.textAlign  = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgb(217, 209, 180, 1)";
      ctx.font = "70px Source Sans Pro";
      ctx.fillText( "ES UN EMPATE", canvas.width/2, canvas.height/2);
      },800);
  } else {
    turnoX = !turnoX;
  }
};


// evento de rondas
const rondaReset = () => {
  document.getElementById('myCanvas').classList.add('hidden');
  document.getElementById('juego').classList.remove('hidden');
  turnoX = true;
  estadoDiv.innerHTML = 'Siguiente Juego';
  for (const celdaDiv of celdaDivs) {
    celdaDiv.classList.remove('x');
    celdaDiv.classList.remove('o');
    celdaDiv.classList.remove('import');
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
    classList.add('import');
    checkEstadoJuego();
  } else {
    classList.add('o');
    classList.add('import');
    checkEstadoJuego();
  }
};

// llamadas de eventos
reiniciarDiv.addEventListener('click', rondaReset);

for (const celdaDiv of celdaDivs) {
  celdaDiv.addEventListener('click', handleCellClick)
}
