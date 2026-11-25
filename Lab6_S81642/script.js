// 1. Questions Array
const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyperlink and Text Management Language",
      "Home Tool Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: "font-size"
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<js>", "<scripting>", "<javascript>", "<script>"],
    answer: "<script>"
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["<!--", "//", "/*", "#"],
    answer: "//"
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    options: ["<style>", "<css>", "<script>", "<link>"],
    answer: "<style>"
  }
];

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;
let answerSubmitted = false;

// DOM Elements
const startScreenEl = document.getElementById("start-screen");
const quizSectionEl = document.getElementById("quiz-section");
const scoreFooterEl = document.getElementById("score-footer");
const questionNumberEl = document.getElementById("question-number");
const totalQuestionsEl = document.getElementById("total-questions");
const timeLeftEl = document.getElementById("time-left");
const questionTextEl = document.getElementById("question-text");
const optionsContainerEl = document.getElementById("options-container");
const feedbackSectionEl = document.getElementById("feedback-section");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const scoreDisplayEl = document.getElementById("score-display");
const restartBtn = document.getElementById("restart-btn");

// 2. shuffleQuestions()
function shuffleQuestions() {
  shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
}

// 3. startTimer()
function startTimer() {
  clearInterval(timer);
  timeLeft = 15;
  timeLeftEl.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timeLeftEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      handleTimeOut();
    }
  }, 1000);
}

function handleTimeOut() {
  if (answerSubmitted) return;
  answerSubmitted = true;

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  feedbackSectionEl.textContent = `Time's up! The correct answer was: ${currentQuestion.answer}`;
  feedbackSectionEl.className = "feedback incorrect";
  feedbackSectionEl.classList.remove("hidden");

  disableOptions();
  submitBtn.classList.add("hidden");
  nextBtn.classList.remove("hidden");
}

// 4. displayQuestion()
function displayQuestion() {
  answerSubmitted = false;
  feedbackSectionEl.classList.add("hidden");
  submitBtn.classList.remove("hidden");
  nextBtn.classList.add("hidden");

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  questionNumberEl.textContent = currentQuestionIndex + 1;
  totalQuestionsEl.textContent = shuffledQuestions.length;
  questionTextEl.textContent = currentQuestion.question;

  optionsContainerEl.innerHTML = "";
  currentQuestion.options.forEach((option) => {
    const label = document.createElement("label");
    label.className = "option-label";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quiz-option";
    radio.value = option;

    label.appendChild(radio);
    label.appendChild(document.createTextNode(option));
    optionsContainerEl.appendChild(label);
  });
}

// 5. checkAnswer()
function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz-option"]:checked');

  if (!selectedOption) {
    alert("Please select an answer before submitting!");
    return;
  }

  if (answerSubmitted) return;
  answerSubmitted = true;
  clearInterval(timer);

  const userAnswer = selectedOption.value;
  const correctAnswer = shuffledQuestions[currentQuestionIndex].answer;

  if (userAnswer === correctAnswer) {
    score++;
    feedbackSectionEl.textContent = "Correct! Well done.";
    feedbackSectionEl.className = "feedback correct";
  } else {
    feedbackSectionEl.textContent = `Incorrect! The correct answer is: ${correctAnswer}`;
    feedbackSectionEl.className = "feedback incorrect";
  }

  feedbackSectionEl.classList.remove("hidden");
  scoreDisplayEl.textContent = `Current Score: ${score}`;

  disableOptions();
  submitBtn.classList.add("hidden");
  nextBtn.classList.remove("hidden");
}

function disableOptions() {
  const radios = document.querySelectorAll('input[name="quiz-option"]');
  radios.forEach((radio) => (radio.disabled = true));
}

// 6. nextQuestion()
function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < shuffledQuestions.length) {
    displayQuestion();
    startTimer();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timer);
  quizSectionEl.classList.add("hidden");
  scoreDisplayEl.textContent = `Quiz Completed! Final Score: ${score} / ${shuffledQuestions.length}`;
  restartBtn.classList.remove("hidden");
}

// 7. startQuiz()
function startQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  scoreDisplayEl.textContent = `Current Score: ${score}`;

  startScreenEl.classList.add("hidden");
  quizSectionEl.classList.remove("hidden");
  scoreFooterEl.classList.remove("hidden");
  restartBtn.classList.add("hidden");

  shuffleQuestions();
  displayQuestion();
  startTimer();
}
