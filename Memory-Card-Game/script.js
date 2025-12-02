const emojis = ["🍎", "🍌", "🐱", "🐶", "⭐", "❤️"];
let cards, flippedCards, lockBoard, matchCount;
let seconds = 0, timerInterval;
let started = false;

const timerDisplay = document.getElementById("timer");
const gameBoard = document.getElementById("gameBoard");
const message = document.getElementById("message");

function startTimer() {
  timerInterval = setInterval(() => {
    seconds++;
    updateTimer();
  }, 1000);
}

function updateTimer() {
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  timerDisplay.textContent = `Time: ${min}:${sec}`;
}

function stopTimer() {
  clearInterval(timerInterval);
}

function initGame() {
  gameBoard.innerHTML = "";
  message.textContent = "";
  cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

  flippedCards = [];
  lockBoard = false;
  matchCount = 0;
  seconds = 0;
  started = false;

  stopTimer();
  updateTimer();

  cards.forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = symbol;

    card.addEventListener("click", () => {
      if (!started) {
        started = true;
        startTimer();
      }

      if (lockBoard || card.classList.contains("flipped")) return;

      card.classList.add("flipped");
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        checkMatch();
      }
    });

    gameBoard.appendChild(card);
  });
}

function checkMatch() {
  lockBoard = true;
  const [c1, c2] = flippedCards;

  if (c1.textContent === c2.textContent) {
    c1.classList.add("matched");
    c2.classList.add("matched");
    matchCount++;

    if (matchCount === emojis.length) {
      stopTimer();
      setTimeout(() => {
        message.textContent = `🎉 Selamat! Kamu selesai dalam ${timerDisplay.textContent.replace("Time: ", "")}!`;
      }, 300);
    }

    resetTurn();
  } else {
    setTimeout(() => {
      c1.classList.remove("flipped");
      c2.classList.remove("flipped");
      resetTurn();
    }, 900);
  }
}

function resetTurn() {
  flippedCards = [];
  lockBoard = false;
}

document.getElementById("restartBtn").addEventListener("click", initGame);

// Start game saat halaman dibuka
initGame();
