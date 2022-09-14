// Juego piedra papel o tijera
// Autor: @fernandocst03
import opciones from "./src/opciones.mjs";
import resultados from "./src/resultados.mjs";

const $ = (selector) => document.querySelector(selector);
const SCORECPU = $("#score-cpu");
const SCOREPLAYER = $("#score-user");
const IMGCPU = $("#img-option-cpu");
const IMGPLAYER = $("#img-option-player");
const user = $("#user");
const cpu = $("#cpu");
const resultado = $("#resultado");
const piedra = $("#piedra");
const papel = $("#papel");
const tijera = $("#tijera");
const btn = $("#btn");

let userScore = 0;
let cpuScore = 0;

function removeClass() {
  IMGPLAYER.src = "./src/img/question.png";
  IMGCPU.src = "./src/img/question.png";
  piedra.classList.remove("disabled");
  papel.classList.remove("disabled");
  tijera.classList.remove("disabled");
  tijera.classList.remove("selected");
  papel.classList.remove("selected");
  piedra.classList.remove("selected");
  resultado.innerHTML = "";
}

function ganar(optionPlayer, optionCpu) {
  userScore++;
  SCOREPLAYER.textContent = userScore;
  user.classList.add("win");
  cpu.classList.add("lose");
  resultado.innerHTML = resultados.ganar;
  setTimeout(() => {
    user.classList.remove("win");
    cpu.classList.remove("lose");
    removeClass();
  }, 3000);
}

function perder(optionPlayer, optionCpu) {
  cpuScore++;
  SCORECPU.textContent = cpuScore;
  user.classList.add("lose");
  cpu.classList.add("win");
  resultado.innerHTML = resultados.perder;
  setTimeout(() => {
    user.classList.remove("lose");
    cpu.classList.remove("win");
    removeClass();
  }, 3000);
}

function empate(optionPlayer, optionCpu) {
  resultado.innerHTML = resultados.empate;
  user.classList.add("empate");
  cpu.classList.add("empate");
  setTimeout(() => {
    user.classList.remove("empate");
    cpu.classList.remove("empate");
    removeClass();
  }, 3000);
}

function opcionComp() {
  const opciones = ["piedra", "papel", "tijera"];
  const random = Math.floor(Math.random() * 3);
  const opcionCpu = opciones[random];
  return opcionCpu;
}

function jugar(opcion) {
  const opcionCpu = opcionComp();
  const opcionPlayer = opcion;
  IMGCPU.src = `./src/img/${opcionCpu}.png`;

  if (
    (opcionPlayer === "piedra" && opcionCpu === "papel") ||
    (opcionPlayer === "papel" && opcionCpu === "tijera") ||
    (opcionPlayer === "tijera" && opcionCpu === "piedra")
  ) {
    perder(opcionPlayer, opcionCpu);
  } else if (
    (opcionPlayer === "piedra" && opcionCpu === "tijera") ||
    (opcionPlayer === "papel" && opcionCpu === "piedra") ||
    (opcionPlayer === "tijera" && opcionCpu === "papel")
  ) {
    ganar(opcionPlayer, opcionCpu);
  } else if(
    (opcionPlayer === "piedra" && opcionCpu === "piedra") ||
    (opcionPlayer === "papel" && opcionCpu === "papel") ||
    (opcionPlayer === "tijera" && opcionCpu === "tijera")
  ){
    empate(opcionPlayer, opcionCpu);
  }
}

function reiniciarCont(){
  userScore = 0;
  cpuScore = 0;
  SCORECPU.textContent = cpuScore;
  SCOREPLAYER.textContent = userScore;
  removeClass();
}

piedra.addEventListener("click", () => {
  setTimeout(() => {
    jugar("piedra");
  }, 1700);

  IMGPLAYER.src = opciones.piedra.img;
  piedra.classList.add("selected");
  papel.classList.add("disabled");
  tijera.classList.add("disabled");
});

papel.addEventListener("click", () => {
  setTimeout(() => {
    jugar("papel");
  }, 1700);

  IMGPLAYER.src = opciones.papel.img;
  papel.classList.add("selected");
  piedra.classList.add("disabled");
  tijera.classList.add("disabled");
});

tijera.addEventListener("click", () => {
  setTimeout(() => {
    jugar("tijera");
  }, 1700);

  IMGPLAYER.src = opciones.tijera.img;
  tijera.classList.add("selected");
  piedra.classList.add("disabled");
  papel.classList.add("disabled");
});

btn.addEventListener("click", reiniciarCont);