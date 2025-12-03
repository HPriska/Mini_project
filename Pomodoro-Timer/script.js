let workTime = 25 * 60;
let breakTime = 5 * 60;
let timeLeft = workTime;
let isRunning = false;
let interval;
let isWork = true;

const timerDisplay = document.getElementById("timer");
const startPauseBtn = document.getElementById("startPause");
const modeText = document.getElementById("mode");

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function switchMode() {
  isWork = !isWork;
  timeLeft = isWork ? workTime : breakTime;
  modeText.textContent = isWork ? "Work Time" : "Break Time";
  updateDisplay();
}

function startPauseTimer() {
  if (!isRunning) {
    interval = setInterval(() => {
      timeLeft--;
      updateDisplay();

      if (timeLeft <= 0) {
        clearInterval(interval);
        isRunning = false;
        switchMode();
        startPauseTimer(); // switch otomatis
      }
    }, 1000);

    startPauseBtn.textContent = "Pause";
    isRunning = true;
  } else {
    clearInterval(interval);
    startPauseBtn.textContent = "Start";
    isRunning = false;
  }
}

function resetTimer() {
  clearInterval(interval);
  isWork = true;
  timeLeft = workTime;
  startPauseBtn.textContent = "Start";
  modeText.textContent = "Work Time";
  isRunning = false;
  updateDisplay();
}

startPauseBtn.addEventListener("click", startPauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);

resetTimer();
