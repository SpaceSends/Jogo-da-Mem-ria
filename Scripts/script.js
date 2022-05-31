const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";
const miliseg = document.querySelector(".miliSegundos");
const seg = document.querySelector(".segundos");
const min = document.querySelector(".minutos");

startGame();

function startGame() {
  initializeCards(game.createCardsFromTechs());
}
function initializeCards(cards) {
  let gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";
  game.cards.forEach((card) => {
    let cardElement = document.createElement("div");
    cardElement.id = card.id;
    cardElement.classList.add(CARD);
    cardElement.dataset.icon = card.icon;
    createCardContent(card, cardElement);
    cardElement.addEventListener("click", flipCard);
    gameBoard.appendChild(cardElement);
  });
}
function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {
  let cardElementFace = document.createElement("div");
  cardElementFace.classList.add(face);
  if (face === FRONT) {
    let iconElement = document.createElement("img");
    iconElement.classList.add(ICON);
    iconElement.src = "./assets/images/" + card.icon + ".png";
    cardElementFace.appendChild(iconElement);
  } else {
    cardElementFace.innerHTML = "&lt/&gt";
  }
  element.appendChild(cardElementFace);
}

function flipCard() {
  if (game.setCard(this.id)) {
    this.classList.add("flip");
    if (game.secondCard) {
      move();
      if (game.checkMatch()) {
        game.clearCards();
        if (game.checkGameOver()) {
          parar();
          let gameOverLayer = document.getElementById("gameOver");
          gameOverLayer.style.display = "flex";
        }
      } else {
        setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id);
          let secondCardView = document.getElementById(game.secondCard.id);
          firstCardView.classList.remove("flip");
          secondCardView.classList.remove("flip");
          game.unflipCards();
        }, 500);
      }
    }
  }
}

function restart() {
  // depois de 1 segundo após ter apertado no reset ele
  // vai fazer tudo voltar para os valores iniciais
  setTimeout(() => {
    INTERVALO = undefined;
    miliNum = 0;
    segNum = 0;
    minNum = 0;
    count = 0;

    // altero no html
    let moviment = document.getElementById("moviment");
    moviment.innerHTML = count;
    miliseg.innerHTML = "0" + miliNum;
    seg.innerHTML = "0" + segNum;
    min.innerHTML = "0" + minNum;
  }, 1000);
  startGame();
  game.clearCards();
  let gameOverLayer = document.getElementById("gameOver");
  gameOverLayer.style.display = "none";
}

// Cronometro
document.addEventListener("click", iniciar);
let miliNum = 0;
let segNum = 0;
let minNum = 0;
let INTERVALO;

function miliSegundos() {
  miliNum++;
  if (miliNum < 10) {
    miliseg.innerHTML = "0" + miliNum;
  } else {
    miliseg.innerHTML = miliNum;
  }
  if (miliNum == 100) {
    miliNum = 0;
    segundos();
  }
}
function segundos() {
  segNum++;
  if (segNum < 10) {
    seg.innerHTML = "0" + segNum;
  } else {
    seg.innerHTML = segNum;
  }
  if (segNum == 60) {
    segNum = 0;
    seg.innerHTML = segNum;
    minutos();
  }
}
function minutos() {
  minNum++;
  if (minNum < 10) {
    min.innerHTML = "0" + minNum;
  } else {
    min.innerHTML = minNum;
  }
}
function iniciar() {
  if (!INTERVALO) {
    clearInterval(INTERVALO);
    INTERVALO = setInterval(() => {
      miliSegundos();
    }, 10);
  }
}
onload = function () {
  let a = JSON.parse(localStorage.getItem("move")) || [0];
  if (a.length == 2) {
    this.document.getElementById("latter").innerHTML = "1 - " + a[a.length - 1];
  } else if (a.length >= 3) {
    this.document.getElementById("latter").innerHTML = "1 - " + a[a.length - 1];
    this.document.getElementById("latterTwo").innerHTML =
      "2 - " + a[a.length - 2];
  }
};
let a = JSON.parse(localStorage.getItem("move")) || [0];
function parar() {
  clearInterval(INTERVALO);
  a.push(count);
  localStorage.setItem("move", JSON.stringify(a));
  let latter = document.getElementById("latter");
  latter.innerHTML = "1 - " + count;
  if (a.length >= 3) {
    let latterTwo = document.getElementById("latterTwo");
    latter.innerHTML = "1 - " + count;
    let tam = a.length - 2;
    latterTwo.innerHTML = "2 - " + a[tam];
  }
}

// Contador de Move
let count = 0;
function move() {
  count++;
  let moviment = document.getElementById("moviment");
  moviment.innerHTML = count;
}
