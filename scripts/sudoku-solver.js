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

export { SudokuSolver };
