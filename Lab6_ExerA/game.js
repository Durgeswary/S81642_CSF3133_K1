// Game state variables
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let roundCount = 0;
let results = [];

// 1. startGame(): Validates player name, displays welcome message and Malaysia start time
function startGame() {
  let nameInput = document.getElementById("playerName").value.trim();

  // Check if name field is empty
  if (nameInput === "") {
    alert("Please enter your name.");
    return;
  }

  // Format current date and time in Malaysia Time (Asia/Kuala_Lumpur)
  let malaysiaTime = new Date().toLocaleString("en-MY", {
    timeZone: "Asia/Kuala_Lumpur",
    dateStyle: "full",
    timeStyle: "medium"
  });

  // Display welcome message and Malaysia date/time in the footer
  document.getElementById("welcomeMsg").innerHTML = "Welcome, " + nameInput + "!";
  document.getElementById("startTime").innerHTML = "Game started on: " + malaysiaTime + " (MYT)";
  gameStarted = true;
}


// 2. getComputerChoice(): Randomly picks rock, paper, or scissors
function getComputerChoice() {
  let choices = ["rock", "paper", "scissors"];
  let randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// 3. playRound(playerChoice): Plays one round and updates picture box colours, score, and history
function playRound(playerChoice) {
  // Prevent playing before clicking Start Game
  if (!gameStarted) {
    alert("Click Start Game first.");
    return;
  }

  let computerChoice = getComputerChoice();
  let roundResult = "";
  let resultElement = document.getElementById("result");
  let playerImg = document.getElementById("playerImg");
  let computerImg = document.getElementById("computerImg");

  // Update images for both player and computer
  playerImg.src = playerChoice + ".png";
  computerImg.src = computerChoice + ".png";

  // Determine winner using if...else and colour winner green, loser red, or both grey on draw
  if (playerChoice === computerChoice) {
    roundResult = "Draw";
    draws++;
    resultElement.innerHTML = "It's a Draw!";
    playerImg.style.border = "4px solid grey";
    playerImg.style.backgroundColor = "#e5e7eb";
    computerImg.style.border = "4px solid grey";
    computerImg.style.backgroundColor = "#e5e7eb";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "scissors" && computerChoice === "paper") ||
    (playerChoice === "paper" && computerChoice === "rock")
  ) {
    roundResult = "Win";
    wins++;
    resultElement.innerHTML = "You Win! " + playerChoice + " beats " + computerChoice + ".";
    playerImg.style.border = "4px solid green";
    playerImg.style.backgroundColor = "#dcfce7";
    computerImg.style.border = "4px solid red";
    computerImg.style.backgroundColor = "#fee2e2";
  } else {
    roundResult = "Lose";
    losses++;
    resultElement.innerHTML = "You Lose! " + computerChoice + " beats " + playerChoice + ".";
    playerImg.style.border = "4px solid red";
    playerImg.style.backgroundColor = "#fee2e2";
    computerImg.style.border = "4px solid green";
    computerImg.style.backgroundColor = "#dcfce7";
  }

  // Update scoreboard
  document.getElementById("wins").innerHTML = wins;
  document.getElementById("losses").innerHTML = losses;
  document.getElementById("draws").innerHTML = draws;

  // Store result in array and add row to history table
  roundCount++;
  results.push(roundResult);

  let historyBody = document.getElementById("historyBody");
  historyBody.innerHTML +=
    "<tr>" +
      "<td>" + roundCount + "</td>" +
      "<td>" + playerChoice + "</td>" +
      "<td>" + computerChoice + "</td>" +
      "<td>" + roundResult + "</td>" +
    "</tr>";
}

// 4. showSummary(): Counts wins using a for loop and calculates rounded win percentage
function showSummary() {
  let totalRounds = results.length;

  if (totalRounds === 0) {
    document.getElementById("summary").innerHTML = "You played 0 rounds and won 0%.";
    return;
  }

  let winCount = 0;
  for (let i = 0; i < results.length; i++) {
    if (results[i] === "Win") {
      winCount++;
    }
  }

  let winPercentage = Math.round((winCount / totalRounds) * 100);
  document.getElementById("summary").innerHTML =
    "You played " + totalRounds + " rounds and won " + winPercentage + "%.";
}

// 5. resetGame(): Resets all scores, picture box colours, arrays, table rows, and messages
function resetGame() {
  wins = 0;
  losses = 0;
  draws = 0;
  roundCount = 0;
  results = [];

  document.getElementById("wins").innerHTML = 0;
  document.getElementById("losses").innerHTML = 0;
  document.getElementById("draws").innerHTML = 0;
  document.getElementById("historyBody").innerHTML = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("summary").innerHTML = "";

  // Reset picture box border and background colours
  let playerImg = document.getElementById("playerImg");
  let computerImg = document.getElementById("computerImg");
  playerImg.style.border = "2px solid #cbd5e1";
  playerImg.style.backgroundColor = "#f8fafc";
  computerImg.style.border = "2px solid #cbd5e1";
  computerImg.style.backgroundColor = "#f8fafc";
}
