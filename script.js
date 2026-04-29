const game = document.getElementById("game");
const winMessage = document.getElementById("winMessage");
const movesDisplay = document.getElementById("moves");
const timeDisplay = document.getElementById("time");

const emojis = ["🍎","🍎","🍌","🍌","🍇","🍇","🍒","🍒","🍉","🍉","🍍","🍍"];

emojis.sort(() =>0.5 - Math.random());

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let matches = 0;
let moves = 0;
let time = 0;

const timer = setInterval(() => {
    time++;
    timeDisplay.textContent = time;
}, 1000);

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
            movesDisplay.textContent = moves;

            checkMatch();
        }
    });

    game.appendChild(card);
});

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