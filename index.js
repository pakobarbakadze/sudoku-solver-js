class SudokuSolver {
  constructor(board) {
    this.board = board;
  }

  solve() {
    const emptyCell = this.findEmptyCell();
    if (!emptyCell) {
      return true;
    }

    const [row, col] = emptyCell;

    for (let num = 1; num <= 9; num++) {
      if (this.isSafe(row, col, num)) {
        this.board[row][col] = num;

        if (this.solve()) {
          return true;
        }

        this.board[row][col] = 0;
      }
    }

    return false;
  }

  findEmptyCell() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.board[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return null;
  }

  isSafe(row, col, num) {
    for (let i = 0; i < 9; i++) {
      if (this.board[row][i] === num || this.board[i][col] === num) {
        return false;
      }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[startRow + i][startCol + j] === num) {
          return false;
        }
      }
    }

    return true;
  }

  printBoard() {
    for (let i = 0; i < 9; i++) {
      if (i > 0 && i % 3 === 0) {
        console.log("---------------------");
      }

      let row = "";
      for (let j = 0; j < 9; j++) {
        if (j > 0 && j % 3 === 0) {
          row += "| ";
        }

        row += this.board[i][j] !== 0 ? this.board[i][j] + " " : ". ";
      }

      console.log(row);
    }
  }
}

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
sudokuSolver.solve();
sudokuSolver.printBoard();

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
makeApiCall();
