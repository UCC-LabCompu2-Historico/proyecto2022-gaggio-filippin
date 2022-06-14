// Elementos HTML
const sigRonda = document.querySelector('#rondaSig')
const reiniciarDiv = document.querySelector('#reiniciar');
const celdaDivs = document.querySelectorAll('.juego-celda');
const cambiarPeon = document.querySelector('#cambioPeon')
let jugador1 = document.getElementById("jugador1");
let jugador2 = document.getElementById("jugador2");
let puntosJug1 = document.getElementById("puntos1");
let puntosJug2 = document.getElementById("puntos2");

// constantes del juego
const xSimbolo = '×';
const oSimbolo = '○';

// variables del juego
let jugando = true;
let turnoX = true;
var puntosDe1 = 0;
var puntosDe2 = 0;


// funciones
const letraASimbolo = (letter) => letter === 'x' ? xSimbolo : oSimbolo;

const cambioDeJugador = () => {
  if (jugador1.innerHTML === "X") {
    jugador1.innerHTML = 'O';
    jugador2.innerHTML = 'X';
  } else {
    jugador1.innerHTML = 'X';
    jugador2.innerHTML = 'O';
  }
}

const elGanador = (letter) => {
  jugando = false;

  cambiarPeon.addEventListener('click', cambioDeJugador);
  cambiarPeon.classList.add('botonCambioPeon');
  cambiarPeon.style.opacity = '100%';

  if (letter === 'x') {
    if (jugador1.innerHTML === "X") {  //Si el jugador 1 es juega con "X", el se ganara el punto. De lo contrario el jugador 2 ganara el punto.
      puntosDe1++;
      puntosJug1.innerHTML = puntosDe1;
    } else {
      puntosDe2++;
      puntosJug2.innerHTML = puntosDe2;
    }

    setTimeout(function(){
    document.getElementById('myCanvas').classList.remove('hidden');
    document.getElementById('juego').classList.add('opacidad');
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var s = getComputedStyle(canvas);
    var w = s.width;
    var h = s.height;
    canvas.width = w.split('px')[0];
    canvas.height = h.split('px')[0];
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.textAlign  = "center"; //Para alinear el canvas
    ctx.textBaseline = "middle"; //Para alinear el canvas
    ctx.fillStyle = "rgb(217, 209, 180, 1)";    //Color de letra
    ctx.font = "45px Source Sans Pro";  //Letra de la libreria de Roboto
    ctx.fillText( "EL GANADOR ES X", canvas.width/2, canvas.height/2);
    },1000);

  } else {
    jugando = false;

    cambiarPeon.addEventListener('click', cambioDeJugador);
    cambiarPeon.classList.add('botonCambioPeon');
    cambiarPeon.style.opacity = '100%';

    if (jugador1.innerHTML === "O") {  //Si el jugador 1 es juega con "O", el se ganara el punto. De lo contrario el jugador 2 ganara el punto.
      puntosDe1++;
      puntosJug1.innerHTML = puntosDe1;
    } else {
      puntosDe2++;
      puntosJug2.innerHTML = puntosDe2;
    }

    setTimeout(function(){
      document.getElementById('myCanvas').classList.remove('hidden');
      document.getElementById('juego').classList.add('opacidad');
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
      ctx.font = "45px Source Sans Pro";
      ctx.fillText( "EL GANADOR ES O", canvas.width/2, canvas.height/2);
      },1000);
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
    setTimeout(function(){
      celdaDivs[0].classList.add('ganador');
      celdaDivs[1].classList.add('ganador');
      celdaDivs[2].classList.add('ganador');
    },100);
  } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
    elGanador(middleLeft);
    setTimeout(function(){
      celdaDivs[3].classList.add('ganador');
      celdaDivs[4].classList.add('ganador');
      celdaDivs[5].classList.add('ganador');
    },100);
  } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
    elGanador(bottomLeft);
    setTimeout(function(){
      celdaDivs[6].classList.add('ganador');
      celdaDivs[7].classList.add('ganador');
      celdaDivs[8].classList.add('ganador');
    },100);
  } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
    elGanador(topLeft);
    setTimeout(function(){
      celdaDivs[0].classList.add('ganador');
      celdaDivs[3].classList.add('ganador');
      celdaDivs[6].classList.add('ganador');
    },100);
  } else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
    elGanador(topMiddle);
    setTimeout(function(){
      celdaDivs[1].classList.add('ganador');
      celdaDivs[4].classList.add('ganador');
      celdaDivs[7].classList.add('ganador');
    },100);
  } else if (topRight && topRight === middleRight && topRight === bottomRight) {
    elGanador(topRight);
    setTimeout(function(){
      celdaDivs[2].classList.add('ganador');
      celdaDivs[5].classList.add('ganador');
      celdaDivs[8].classList.add('ganador');
    },100);
  } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
    elGanador(topLeft);
    setTimeout(function(){
      celdaDivs[0].classList.add('ganador');
      celdaDivs[4].classList.add('ganador');
      celdaDivs[8].classList.add('ganador');
    },100);
  } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
    elGanador(topRight);
    setTimeout(function(){
      celdaDivs[2].classList.add('ganador');
      celdaDivs[4].classList.add('ganador');
      celdaDivs[6].classList.add('ganador');
    },100);
  } else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight) {
    jugando = false;

    cambiarPeon.addEventListener('click', cambioDeJugador);
    cambiarPeon.classList.add('botonCambioPeon');
    cambiarPeon.style.opacity = '100%';

    setTimeout(function(){
      document.getElementById('myCanvas').classList.remove('hidden');
      document.getElementById('juego').classList.add('opacidad');
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
      ctx.font = "45px Source Sans Pro";
      ctx.fillText( "ES UN EMPATE", canvas.width/2, canvas.height/2);
      },1000);
  } else {
    turnoX = !turnoX;
  }
};


// evento para reiniciar la partida
const partidaReset = () => {
  document.getElementById('myCanvas').classList.add('hidden');
  document.getElementById('juego').classList.remove('opacidad');
  turnoX = true;
  puntosDe1 = 0;
  puntosDe2 = 0;
  jugador1.innerHTML = 'X';
  jugador2.innerHTML = 'O';
  puntosJug1.innerHTML = puntosDe1;
  puntosJug2.innerHTML = puntosDe2;
  cambiarPeon.removeEventListener('click', cambioDeJugador);
  cambiarPeon.classList.remove('botonCambioPeon');
  cambiarPeon.style.opacity = '60%';
  for (const celdaDiv of celdaDivs) {
    celdaDiv.classList.remove('x');
    celdaDiv.classList.remove('o');
    celdaDiv.classList.remove('celdaDesactivada');
    celdaDiv.classList.remove('ganador');
  }
  jugando = true;
};

// evento para continuar con la siguiente ronda
const rondaReset = () => {
  document.getElementById('myCanvas').classList.add('hidden');
  document.getElementById('juego').classList.remove('opacidad');
  turnoX = true;
  cambiarPeon.removeEventListener('click', cambioDeJugador);
  cambiarPeon.classList.remove('botonCambioPeon');
  cambiarPeon.style.opacity = '60%';
  for (const celdaDiv of celdaDivs) {
    celdaDiv.classList.remove('x');
    celdaDiv.classList.remove('o');
    celdaDiv.classList.remove('celdaDesactivada');
    celdaDiv.classList.remove('ganador');
  }
  jugando = true;
};

const celdaClickeada = (e) => {
  const ubicClase = e.target.classList;

  if (!jugando || ubicClase[1] === 'x' || ubicClase[1] === 'o') { // Indica
    return;
  }

  if (turnoX) {
    ubicClase.add('x');
    ubicClase.add('celdaDesactivada');
    checkEstadoJuego();
  } else {
    ubicClase.add('o');
    ubicClase.add('celdaDesactivada');
    checkEstadoJuego();
  }
};

// llamadas de eventos
reiniciarDiv.addEventListener('click', partidaReset);

sigRonda.addEventListener('click', rondaReset);

for (const celdaDiv of celdaDivs) {
  celdaDiv.addEventListener('click', celdaClickeada);
}
