// DOM elements
const startBtn = document.getElementById("startBtn");
const playAgainBtn = document.getElementById("playAgain");
const difficulty = document.getElementById("difficulty");

const wordEl = document.getElementById("word");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const bestScoreEl = document.getElementById("bestScore");
const countdownEl = document.getElementById("countdown");
const timerBar = document.getElementById("timerBar");

// Word list
const words = [
  "apple", "galaxy", "storm", "future", "keyboard", "river",
  "nexus", "mirror", "planet", "energy", "flame", "ocean",
  "rocket", "dream", "crystal", "harmony", "shadow", "phantom"
];

let time, score, timer, currentWord;

// Best score from local storage
bestScoreEl.textContent = localStorage.getItem("bestScore") || 0;

// Start game
startBtn.onclick = () => startGame();

function startGame() {
  score = 0;
  scoreEl.textContent = 0;

  inputEl.value = "";
  inputEl.disabled = true;
  playAgainBtn.style.display = "none";

  countdown(3);
}

function countdown(num) {
  countdownEl.textContent = num;
  countdownEl.style.display = "block";

  let c = setInterval(() => {
    num--;
    countdownEl.textContent = num;

    if (num <= 0) {
      clearInterval(c);
      countdownEl.style.display = "none";
      beginPlay();
    }
  }, 1000);
}

function beginPlay() {
  inputEl.disabled = false;
  inputEl.focus();

  let diff = difficulty.value;
  time = diff === "easy" ? 8 : diff === "medium" ? 5 : 3;

  timeEl.textContent = time;
  timerBar.style.width = "100%";

  setNewWord();

  timer = setInterval(updateTime, 1000);
}

function updateTime() {
  time--;
  timeEl.textContent = time;

  timerBar.style.width = (time / (difficulty.value === "easy" ? 8 :
    difficulty.value === "medium" ? 5 : 3) * 100) + "%";

  if (time <= 0) endGame();
}

function setNewWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  wordEl.textContent = currentWord;

  wordEl.style.animation = "none";
  void wordEl.offsetWidth;
  wordEl.style.animation = "fadeIn 0.4s";
}

inputEl.addEventListener("input", () => {
  if (inputEl.value.trim() === currentWord) {
    inputEl.classList.add("correct");

    setTimeout(() => inputEl.classList.remove("correct"), 250);

    score++;
    scoreEl.textContent = score;

    inputEl.value = "";
    setNewWord();

    time += 2;
    timerBar.style.width = "100%";
  }
});

function endGame() {
  clearInterval(timer);

  wordEl.textContent = "Game Over!";
  inputEl.disabled = true;

  playAgainBtn.style.display = "inline-block";

  if (score > localStorage.getItem("bestScore")) {
    localStorage.setItem("bestScore", score);
  }

  bestScoreEl.textContent = localStorage.getItem("bestScore");
}

// Restart button
playAgainBtn.onclick = () => startGame();
