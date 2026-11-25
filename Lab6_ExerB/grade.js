// ============================================================
// PART 1: IDENTIFIED ERRORS IN GIVEN CODE
// ============================================================
// Error 1 (grade.html, Line 9): Missing 'return' in onsubmit="return checkMark()", causing the page to reload and clear the result.
// Error 2 (grade.html, Line 17): Incorrect casing in onclick="showtable()"; function is named showTable().
// Error 3 (grade.html, Line 19): Wrong script filename "grades.js"; actual file is "grade.js".
// Error 4 (grade.js, Line 5): Used assignment (=) instead of comparison (===) in if (name = "").
// Error 5 (grade.js, Line 9): Typo in isNan(mark); correct JavaScript function is isNaN(mark).
// Error 6 (grade.js, Line 14): Used logical AND (&&) instead of OR (||) in if (mark < 0 && mark > 100).
// Error 7 (grade.js, Line 28): Incorrect casing in getElementByID; correct method is getElementById.
// Error 8 (grade.js, Line 30): British spelling style.colour used instead of style.color.
// Error 9 (grade.js, Line 38): Loop started at i = 1 instead of i = 0, skipping the first grade ("A").
// Error 10 (grade.js, Line 42): Incorrect casing in innerHtml; correct property is innerHTML.
// ============================================================

// Function to validate inputs, calculate grade, set colour, and display Malaysia time
function checkMark() {
  let name = document.forms["gradeForm"]["name"].value.trim();
  let mark = document.forms["gradeForm"]["mark"].value.trim();

  // Validate empty name
  if (name === "") {
    alert("Name must be filled out.");
    return false;
  }

  // Part 2 (Step 5): Validate empty mark field
  if (mark === "") {
    alert("Mark field cannot be empty.");
    return false;
  }

  // Validate numeric mark
  if (isNaN(mark)) {
    alert("Please enter a valid numeric value.");
    return false;
  }

  mark = parseInt(mark);

  // Validate mark range (0 to 100) using OR (||)
  if (mark < 0 || mark > 100) {
    alert("Mark must be between 0 and 100.");
    return false;
  }

  // Determine grade and result text colour (green for A/B, orange for C, red for F)
  let grade;
  let resultColor;

  if (mark >= 80) {
    grade = "A";
    resultColor = "green";
  } else if (mark >= 65) {
    grade = "B";
    resultColor = "green";
  } else if (mark >= 50) {
    grade = "C";
    resultColor = "orange";
  } else {
    grade = "F";
    resultColor = "red";
  }

  // Display grade with appropriate colour
  let resultEl = document.getElementById("result");
  resultEl.innerHTML = name + " got grade " + grade;
  resultEl.style.color = resultColor;

  // Part 2 (Step 8): Display date and time in Malaysia Time (Asia/Kuala_Lumpur)
  let malaysiaDateTime = new Date().toLocaleString("en-MY", {
    timeZone: "Asia/Kuala_Lumpur",
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
  document.getElementById("checkedTime").innerHTML = "Checked on: " + malaysiaDateTime + " (MYT)";

  // Return false so the form does not refresh the page
  return false;
}

// Part 2 (Step 7): Generates a random whole number from 0 to 100 and puts it in the mark field
function generateRandomMark() {
  let randomMark = Math.floor(Math.random() * 101);
  document.getElementById("mark").value = randomMark;
}

// Displays the complete grade reference table (A, B, C, F)
function showTable() {
  let grades = ["A", "B", "C", "F"];
  let ranges = ["80-100", "65-79", "50-64", "0-49"];

  // Include table headers for clear presentation
  let tableHTML = "<table><tr><th>Grade</th><th>Mark range</th></tr>";

  // Start loop at i = 0 so grade A is included
  for (let i = 0; i < grades.length; i++) {
    tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
  }

  tableHTML += "</table>";
  document.getElementById("tableContainer").innerHTML = tableHTML;
}