import { SudokuSolver } from "./sudoku-solver.js";

const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const infoInputs = document.getElementById("infoInputs");
const solveButton = document.getElementById("solveButton");

const sudokuBoard = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const sudokuSolver = new SudokuSolver(sudokuBoard);

solveButton.addEventListener("click", async (event) => {
  event.preventDefault();

  sudokuSolver.solve();
  sudokuSolver.printBoard();

  await makeApiCall();

  input1.focus();
  input2.blur();

  createElement();
});

function createElement() {
  const inputValue1 = input1.value;
  const inputValue2 = input2.value;

  const newParagraph = document.createElement("p");
  newParagraph.textContent = `${inputValue1} ${inputValue2} Solved Sudoku`;

  infoInputs.appendChild(newParagraph);
}

async function makeApiCall() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data);
  } catch (error) {
    console.error("Error making API call:", error.message);
  }
}
