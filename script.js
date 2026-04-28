const game = document.getElementById("game");
const winMessage = document.getElementById("winMessage");

const emojis = ["🍎", "🍎", "🍌", "🍌", "🍇", "🍇"];

for (let i = emojis.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [emojis[i], emojis[j]] = [emojis[j], emojis[i]];
}

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

emojis.forEach(emoji => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = emoji;

    card.addEventListener("click", () => {
        if (lockBoard) return;
        if (card === firstCard) return;
        if (card.classList.contains("flipped")) return;

        card.classList.add("flipped");
        card.textContent = emoji;

        if (!firstCard) {
            firstCard = card;
        } else {
            secondCard = card;
            checkMatch();
        }
    });

    game.appendChild(card);
});

function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        matches++;
        resetTurn();

        if (matches === 3) {
            winMessage.textContent = "You won!";
        }
    } else {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard.textContent = "";
            secondCard.textContent = "";
            resetTurn();
        }, 1000);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}
