// Elementos HTML
const sigRonda = document.querySelector('#rondaSig');
const reiniciarDiv = document.querySelector('#reiniciar');
const celdaDivs = document.querySelectorAll('.juego-celda');
const cambiarPeon = document.querySelector('#cambioPeon')
let jugador1 = document.getElementById("jugador1");
let jugador2 = document.getElementById("jugador2");
let puntosJug1 = document.getElementById("puntos1");
let puntosJug2 = document.getElementById("puntos2");

// variables del juego
let jugando = true;
let turnoX = true;
var puntosDe1 = 0;
var puntosDe2 = 0;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//Nos permite obtener los valores de las propiedades ancho y alto en CSS, devolviendo un objeto que poesee los estilos del elemento. Esto nos permite calcular el ancho y alto del canvas en CSS.
var s = getComputedStyle(canvas);
var w = s.width;
var h = s.height;

//El alto y ancho del elemento canvas vienen en píxeles así que obtenemos su valor usando el método split. Estos valores los asignamos a los valores de canvas.width y canvas.height. Esto permite modificar los valores de las propiedades de alto y ancho en html para que se adapte de forma responsiva a los valores en CSS.
canvas.width = w.split('px')[0];
canvas.height = h.split('px')[0];
let contador=1;
let contador2=60;
var aumento;

// funciones

/**
   * Al precionar el boton de Cambio de peon, si el jugador 1 tiene la "X", pasara a tener el "O", y el jugador 2 tendra la "X". En caso de ser al reves pasara lo contrario.
   * @method cambioDeJugador
   * @param Parámetro A
   * @param Parámetro B
   * @return Nada
   */
const cambioDeJugador = () => {
  if (jugador1.innerHTML === "X") {
    jugador1.innerHTML = 'O';
    jugador2.innerHTML = 'X';
  } else {
    jugador1.innerHTML = 'X';
    jugador2.innerHTML = 'O';
  }
}

/**
   * Una vez identificado el ganador, esta funcion hace que se deje de mostrar el juego, que se vea el canvas con la animacion, y agrega la posibilidad de clickear los botones que durante el juego estan desabilitados (Cambiar Peon y Siguiente ronda).
   * @method elGanador
   * @param {string} letter - Letra que pertenece al ganador
   * @param Parámetro B
   * @return Nada
   */
const elGanador = (letter) => {
  jugando = false;

  cambiarPeon.addEventListener('click', cambioDeJugador); //Añade la posibilidad de hacer click en el boton para cambiar peon.
  cambiarPeon.classList.add('botonActivo'); //Agregamos esta clase para que el boton posea los mismos estilos que los demas botones al pasar el cursor sobre él.
  cambiarPeon.style.opacity = '100%'; //Cambia la opacidad del boton "Cambiar Peon" para hacer entender al jugador que está activo.

  if (letter === 'x') {
    if (jugador1.innerHTML === "X") {  //Si el jugador 1 es quien juega con "X", el se ganara el punto. De lo contrario el jugador 2 ganara el punto.
      puntosDe1++;
      puntosJug1.innerHTML = puntosDe1;
    } else {
      puntosDe2++;
      puntosJug2.innerHTML = puntosDe2;
    }

    sigRonda.innerHTML = 'Siguiente Ronda';
    sigRonda.addEventListener('click', rondaReset);
    sigRonda.classList.add('botonActivo');
    sigRonda.style.opacity = '100%';

    setTimeout(function () { //Funcion para agregar una demora de 1s para ejecutar el codigo de su interior.
      document.getElementById('myCanvas').classList.remove('hidden'); //Eliminamos la clase hidden en el canvas para hacerlo visible.
      document.getElementById('juego').classList.add('opacidad'); //Agregamos la clase opacidad la cual hace invisible el Grid del juego para ver el canvas.
      
      aumento = setInterval(() => {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.textAlign  = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "rgb(217, 209, 180, 1)";
        ctx.fillText( "EL GANADOR ES X", canvas.width/2, canvas.height/2);
        
        if (contador<=60){
          ctx.font = contador + "px Source Sans Pro";
          contador = contador + 0.2;
        }
        else{
          if (contador2 >= 10){
            ctx.font = contador2 + "px Source Sans Pro";
            contador2 = contador2 - 0.2;
          }
        }

        if (contador2 < 10){
            contador2=60;
            contador=10;
        }

      }, 4);

    }, 1000);

  } else {
    jugando = false;

    cambiarPeon.addEventListener('click', cambioDeJugador);
    cambiarPeon.classList.add('botonActivo');
    cambiarPeon.style.opacity = '100%';

    if (jugador1.innerHTML === "O") { //Si el jugador 1 es quien juega con "O", el se ganara el punto. De lo contrario el jugador 2 ganara el punto.
      puntosDe1++;
      puntosJug1.innerHTML = puntosDe1;
    } else {
      puntosDe2++;
      puntosJug2.innerHTML = puntosDe2;
    }

    sigRonda.innerHTML = 'Siguiente Ronda';
    sigRonda.addEventListener('click', rondaReset);
    sigRonda.classList.add('botonActivo');
    sigRonda.style.opacity = '100%';

    setTimeout(function () { //Funcion para agregar una demora de 1s para ejecutar el codigo de su interior.
      document.getElementById('myCanvas').classList.remove('hidden');
      document.getElementById('juego').classList.add('opacidad');

      aumento = setInterval(() => {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.textAlign  = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "rgb(217, 209, 180, 1)";
        ctx.fillText( "EL GANADOR ES O", canvas.width/2, canvas.height/2);
        
        if (contador<=60){
          ctx.font = contador + "px Source Sans Pro";
          contador = contador + 0.2;
        }
        else{
          if (contador2 >= 10){
            ctx.font = contador2 + "px Source Sans Pro";
            contador2 = contador2 - 0.2;
          }
        }

        if (contador2 < 10){
            contador2=60;
            contador=10;
        }

      }, 4);

    }, 1000);
  }
};

/**
   * Analiza si hay ganador o si hay empate. En caso de no cumplirse ninguna, significa que quedan celdas vacias, por lo que el juego continua.
   * @method checkEstadoJuego
   * @param Parámetro A
   * @param Parámetro B
   * @return elGanador - Es la celda que contiene al ganador. En caso de empate la funcion no devuelve ningun valor.
   */
const checkEstadoJuego = () => {
  const topLeft = celdaDivs[0].classList[1]; //Creamos una constante para almacenar cada celda del grid y su valor en la segunda clase.
  const topMiddle = celdaDivs[1].classList[1];
  const topRight = celdaDivs[2].classList[1];
  const middleLeft = celdaDivs[3].classList[1];
  const middleMiddle = celdaDivs[4].classList[1];
  const middleRight = celdaDivs[5].classList[1];
  const bottomLeft = celdaDivs[6].classList[1];
  const bottomMiddle = celdaDivs[7].classList[1];
  const bottomRight = celdaDivs[8].classList[1];

  // checkear ganador
  if (topLeft && topLeft === topMiddle && topLeft === topRight) { //Se comparan las celdas para saber si el valor de la clase es el mismo. En tal caso, sera el ganador.
    elGanador(topLeft);
    setTimeout(function () {
      celdaDivs[0].classList.add('ganador'); //A las 3 celdas que posean el mismo valor de clase, se les agregara la clase "ganador" para luego diferenciar las celdas ganadoras.
      celdaDivs[1].classList.add('ganador');
      celdaDivs[2].classList.add('ganador');
    }, 100);
  } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
    elGanador(middleLeft);
    setTimeout(function () {
      celdaDivs[3].classList.add('ganador');
      celdaDivs[4].classList.add('ganador');
      celdaDivs[5].classList.add('ganador');
    }, 100);
  } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
    elGanador(bottomLeft);
    setTimeout(function () {
      celdaDivs[6].classList.add('ganador');
      celdaDivs[7].classList.add('ganador');
      celdaDivs[8].classList.add('ganador');
    }, 100);
  } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
    elGanador(topLeft);
    setTimeout(function () {
      celdaDivs[0].classList.add('ganador');
      celdaDivs[3].classList.add('ganador');
      celdaDivs[6].classList.add('ganador');
    }, 100);
  } else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
    elGanador(topMiddle);
    setTimeout(function () {
      celdaDivs[1].classList.add('ganador');
      celdaDivs[4].classList.add('ganador');
      celdaDivs[7].classList.add('ganador');
    }, 100);
  } else if (topRight && topRight === middleRight && topRight === bottomRight) {
    elGanador(topRight);
    setTimeout(function () {
      celdaDivs[2].classList.add('ganador');
      celdaDivs[5].classList.add('ganador');
      celdaDivs[8].classList.add('ganador');
    }, 100);
  } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
    elGanador(topLeft);
    setTimeout(function () {
      celdaDivs[0].classList.add('ganador');
      celdaDivs[4].classList.add('ganador');
      celdaDivs[8].classList.add('ganador');
    }, 100);
  } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
    elGanador(topRight);
    setTimeout(function () {
      celdaDivs[2].classList.add('ganador');
      celdaDivs[4].classList.add('ganador');
      celdaDivs[6].classList.add('ganador');
    }, 100);
  } else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight) {
    jugando = false;

    cambiarPeon.addEventListener('click', cambioDeJugador);
    cambiarPeon.classList.add('botonActivo');
    cambiarPeon.style.opacity = '100%';

    sigRonda.innerHTML = 'Siguiente Ronda';
    sigRonda.addEventListener('click', rondaReset);
    sigRonda.classList.add('botonActivo');
    sigRonda.style.opacity = '100%';

    setTimeout(function () {
      document.getElementById('myCanvas').classList.remove('hidden');
      document.getElementById('juego').classList.add('opacidad');

      aumento = setInterval(() => {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.textAlign  = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "rgb(217, 209, 180, 1)";
        ctx.fillText( "ES UN EMPATE", canvas.width/2, canvas.height/2);
        
        if (contador<=60){
          ctx.font = contador + "px Source Sans Pro";
          contador = contador + 0.2;
        }
        else{
          if (contador2 >= 10){
            ctx.font = contador2 + "px Source Sans Pro";
            contador2 = contador2 - 0.2;
          }
        }

        if (contador2 < 10){
            contador2=60;
            contador=10;
        }

      }, 4);

    }, 1000);
  } else {
    turnoX = !turnoX; //En caso de que no haya ganador y queden celdas disponibles le toca al siguiente jugador.

    if (turnoX === true) {
      sigRonda.innerHTML = 'Turno de X';
    } else {
      sigRonda.innerHTML = 'Turno de O';
    }
  }
};

/**
   * Al hacer click en el boton de reiniciar, todo lo que se ve en pantalla volvera a su estado inicial.
   * @method partidaReset
   * @param Parámetro A
   * @param Parámetro B
   * @return Nada
   */
const partidaReset = () => {
  document.getElementById('myCanvas').classList.add('hidden'); //Agregamos la clase hidden en el canvas para ocultarlo.
  document.getElementById('juego').classList.remove('opacidad'); //Quitamos la clase opacidad la cual hace invisible el Grid del juego para ver el canvas.

  clearInterval (aumento);
  ctx.clearRect(0,0,canvas.width,canvas.height);

  turnoX = true; //Hacemos que vuelva a iniciar "X" en todas las rondas.

  sigRonda.innerHTML = 'Turno de X';
  sigRonda.classList.remove('botonActivo');
  sigRonda.style.opacity = '60%';

  puntosDe1 = 0; //Volvemos a 0 los puntajes de los jugadores.
  puntosDe2 = 0;

  jugador1.innerHTML = 'X'; //Hacemos que el jugador 1 siempre inicie con la "X".
  jugador2.innerHTML = 'O';

  puntosJug1.innerHTML = puntosDe1; //Se muestra el puntaje de los jugadores (0).
  puntosJug2.innerHTML = puntosDe2;

  cambiarPeon.removeEventListener('click', cambioDeJugador); //Elimina la posibilidad de hacer click en el boton para cambiar peon.
  cambiarPeon.classList.remove('botonActivo'); //Eliminamos esta clase para diferenciar que el boton no funcionara al hacer click.
  cambiarPeon.style.opacity = '60%'; //Cambia la opacidad del peon.

  for (const celdaDiv of celdaDivs) { //vacia las celdas
    celdaDiv.classList.remove('x');
    celdaDiv.classList.remove('o');
    celdaDiv.classList.remove('celdaDesactivada');
    celdaDiv.classList.remove('ganador');
  }
  jugando = true;
  sigRonda.removeEventListener('click', rondaReset);
};

/**
   * Al hacer click en el boton de Siguiente Ronda, unicamente se dejara de mostrar el canvas, para mostrar el tablero del juego vacio para asi volver a jugar y seguir sumando puntos.
   * @method rondaReset
   * @param Parámetro A
   * @param Parámetro B
   * @return Nada
   */
const rondaReset = () => {
  document.getElementById('myCanvas').classList.add('hidden'); //Agregamos la clase hidden en el canvas para ocultarlo.
  document.getElementById('juego').classList.remove('opacidad'); //Quitamos la clase opacidad la cual hace invisible el Grid del juego para ver el canvas.

  clearInterval (aumento);
  ctx.clearRect(0,0,canvas.width,canvas.height);

  turnoX = true; //Hacemos que vuelva a iniciar "X" en todas las rondas.

  sigRonda.innerHTML = 'Turno de X';
  sigRonda.classList.remove('botonActivo');
  sigRonda.style.opacity = '60%';

  cambiarPeon.removeEventListener('click', cambioDeJugador); //Elimina la posibilidad de hacer click en el boton para cambiar peon.
  cambiarPeon.classList.remove('botonActivo'); //Eliminamos esta clase para diferenciar que el boton no funcionara al hacer click.
  cambiarPeon.style.opacity = '60%'; //Cambia la opacidad del boton Cambiar Peon.

  for (const celdaDiv of celdaDivs) { //vacia las celdas.
    celdaDiv.classList.remove('x');
    celdaDiv.classList.remove('o');
    celdaDiv.classList.remove('celdaDesactivada');
    celdaDiv.classList.remove('ganador');
  }
  jugando = true;
  sigRonda.removeEventListener('click', rondaReset);
};

/**
   * Analiza la celda clickeada, en caso de estar vacia se le agregara el simbolo correspondiente y se desactiva la celda para no poder volver a clickearla, luego procede a llamar a la funcion la cual analiza si hay un ganador.
   * @method celdaClickeada
   * @param e - Se utiliza para identificar cuando se produce el evento de click, y asi almacenar los datos de la celda correspondiente para analizarla.
   * @param Parámetro B
   * @return Nada
   */
const celdaClickeada = (e) => {
  const ubicClase = e.target.classList; //Almacenamos las claces de la celda clickeada en una constante.

  if (!jugando || ubicClase[1] === 'x' || ubicClase[1] === 'o') { //Sirbe para no poder volver a seleccionar una celda completada anteriormente.
    return;
  }

  if (turnoX) {  //Si es el turno de "X" se agregara una "X" al hacer click.
    ubicClase.add('x');
    ubicClase.add('celdaDesactivada');
    checkEstadoJuego();
  } else {  //Si es el turno de "O" se agregara un "O" al hacer click.
    ubicClase.add('o');
    ubicClase.add('celdaDesactivada');
    checkEstadoJuego();
  }
};

// llamadas de eventos para los botones
reiniciarDiv.addEventListener('click', partidaReset);

for (const celdaDiv of celdaDivs) { //identifica la celda seleccionada.
  celdaDiv.addEventListener('click', celdaClickeada);
}
