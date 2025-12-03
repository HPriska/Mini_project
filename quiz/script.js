const questions = [
  {
    question: "Tag HTML mana yang digunakan untuk menampilkan gambar?",
    answers: ["image", "img", "pic", "media"],
    correct: 1
  },
  {
    question: "Atribut apa yang wajib ada di tag <a> untuk membuat link?",
    answers: ["src", "href", "link", "path"],
    correct: 1
  },
  {
    question: "Tag HTML mana yang bersifat semantic?",
    answers: ["div", "span", "section", "b"],
    correct: 2
  },
  {
    question: "HTML singkatan dari?",
    answers: [
      "HyperText Machine Language",
      "HyperText Markup Language",
      "Hyper Transfer Markup Level",
      "HyperTitle Markup Language"
    ],
    correct: 1
  },
  {
    question: "CSS digunakan untuk?",
    answers: [
      "Membuat struktur halaman",
      "Mengatur gaya tampilan",
      "Menyimpan database",
      "Menjalankan server"
    ],
    correct: 1
  }
];

let current = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const quizBox = document.getElementById("quizBox");
const resultBox = document.getElementById("result");
const scoreText = document.getElementById("scoreText");
const restartBtn = document.getElementById("restartBtn");

function loadQuestion() {
  const q = questions[current];
  questionEl.textContent = q.question;

  answersEl.innerHTML = "";

  q.answers.forEach((ans, index) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.classList.add("answer-btn");
    btn.onclick = () => selectAnswer(index);
    answersEl.appendChild(btn);
  });
}

function selectAnswer(index) {
  const q = questions[current];
  const options = document.querySelectorAll(".answer-btn");

  options.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add("correct");
    else if (i === index) btn.classList.add("wrong");
  });

  if (index === q.correct) score++;
}

nextBtn.onclick = () => {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
};

function finishQuiz() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreText.textContent = `Skor kamu: ${score} dari ${questions.length}`;
}

restartBtn.onclick = () => {
  current = 0;
  score = 0;
  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  loadQuestion();
};

loadQuestion();
