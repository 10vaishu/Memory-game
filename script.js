let startScreen;
let gameScreen;
let highScoreDisplay;
let winMessage;
let movesDisplay;
let timeDisplay;

document.addEventListener("DOMContentLoaded", () => {
    startScreen = document.getElementById("startScreen");
    gameScreen = document.getElementById("gameScreen");
    highScoreDisplay = document.getElementById("highScore");
    winMessage = document.getElementById("winMessage");
    movesDisplay = document.getElementById("moves");
    timeDisplay = document.getElementById("time");
});

function startTimer() {
    time = 0;
    document.getElementById("time").textContent = time;

    timer = setInterval(() => {
        time++;
        document.getElementById("time").textContent = time;
    }, 1000);
}

let timer;
let time = 0;
let moves = 0;
let matches = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function startGame() {
    startScreen.style.display = "none";
    gameScreen.style.display = "block";

    loadHighScore();
    createGame();
    startTimer();
}

function createGame() {
  const game = document.getElementById("game");
  game.innerHTML = "";

  const emojis = ["🍎","🍎","🍌","🍌","🍇","🍇","🍒","🍒","🍉","🍉","🍍","🍍"];

  emojis.sort(() => 0.5 - Math.random());

  emojis.forEach(emoji => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = emoji;

    card.addEventListener("click", () => {
      if (lockBoard) return;
      if (card === firstCard) return;
      if (card.classList.contains("flipped")) return;

      flipCard(card, emoji);

      if (!firstCard) {
        firstCard = card;
      } else {
        secondCard = card;
        moves++;
        document.getElementById("moves").textContent = moves;
        checkMatch();
      }
    });

    game.appendChild(card);
  });

}

function flipCard(card, emoji) {
    card.classList.add("flipped");
    card.textContent = emoji;
}

function checkMatch() {
  let isMatch = firstCard.dataset.value === secondCard.dataset.value;

 
  if (isMatch) {
    matches++;
    resetTurn();

    if (matches === 6) {
      clearInterval(timer);
      saveHighScore();
      winMessage.textContent = `🎉 You win in ${moves} moves and ${time}s!`;
    }
  } else {
    lockBoard = true;

    setTimeout(() => {
      unflipCard(firstCard);
      unflipCard(secondCard);
      resetTurn();
    }, 900);
  }
}


function unflipCard(card) {
  card.classList.remove("flipped");
  card.textContent = "";
}


function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}


function restartGame() {
  location.reload();
}

function loadHighScore() {
    let best = localStorage.getItem("bestTime");
    
    if (best !== null) {
        highScoreDisplay.textContent = best;
    } else {
        highScoreDisplay.textContent = "--";
    }
}

function saveHighScore() {
    let best = localStorage.getItem("bestTime");

    if (best === null || time < Number(best)) {
        localStorage.setItem("bestTime", time);
        highScoreDisplay.textContent = time;
    }
}