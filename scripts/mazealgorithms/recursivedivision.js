import CellState from "../cellstate.js";
import ResetButtonController from "../controllers/resetbuttoncontroller.js";

export default class RecursiveDivision {
    constructor(grid) {
        this.grid = grid;
        this.cellModelMatrix = grid.getCellModelMatrix;
        this.numberOfRows = grid.numberOfRows;
        this.numberOfCols = grid.numberOfCols;
    }

    run() {
        this.clearBoard();
        this.drawBorder();
        this.recursiveDivison(1, this.numberOfRows - 1, 1, this.numberOfCols - 1);
    }

    clearBoard() {
        let resetButtonController = new ResetButtonController(this.grid);
        resetButtonController.activate();
    }

    drawBorder() {
        // Horizontal
        let topRow = 0;
        let bottomRow = this.numberOfRows - 1;
        for (let col = 0; col < this.numberOfCols; col++) {
            this.cellModelMatrix[topRow][col].updateCellState(CellState.OBSTACLE);
            this.cellModelMatrix[bottomRow][col].updateCellState(CellState.OBSTACLE);
        }

        // Vertical
        let leftColumn = 0;
        let rightColumn = this.numberOfCols - 1;
        for (let row = 0; row < this.numberOfRows; row++) {
            this.cellModelMatrix[row][leftColumn].updateCellState(CellState.OBSTACLE);
            this.cellModelMatrix[row][rightColumn].updateCellState(CellState.OBSTACLE);
        }
    }

    recursiveDivison(topRow, bottomRow, leftCol, rightCol) {
        // Check for base case
        if (bottomRow - topRow < 2 || rightCol - leftCol < 2) {
            return;
        }

        // Pick and draw a wall
        if (Math.random() < 0.4) {
            // Draw a horizontal wall
            let row = this.getRandomInt(topRow + 1, bottomRow - 1);
            this.drawWall(row, row, leftCol, rightCol);

            // Recursion
            this.recursiveDivison(topRow, row - 1, leftCol, rightCol);
            this.recursiveDivison(row + 1, bottomRow, leftCol, rightCol);
        } else {
            // Draw a vertical wall
            let col = this.getRandomInt(leftCol + 1, rightCol - 1);
            this.drawWall(topRow, bottomRow, col, col);

            // Recursion
            this.recursiveDivison(topRow, bottomRow, leftCol, col - 1);
            this.recursiveDivison(topRow, bottomRow, col + 1, rightCol);
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        //The maximum is exclusive and the minimum is inclusive
        return Math.floor(Math.random() * (max + 1 - min)) + min;
        // return Math.floor(Math.random() * (max - min)) + min; 
    }

    drawWall(startRow, endRow, startCol, endCol) {
        if (startRow == endRow) {
            // Pick an opening in the wall
            let opening = this.getRandomInt(startCol, endCol);

            // Draw the wall
            for (let j = startCol; j <= endCol; j++) {
                if (j == opening) continue;
                this.cellModelMatrix[startRow][j].updateCellState(CellState.OBSTACLE);
            }
        } else if (startCol == endCol) {
            // Pick an opening in the wall
            let opening = this.getRandomInt(startRow, endRow);

            for (let i = startRow; i <= endRow; i++) {
                if (i == opening) continue;
                this.cellModelMatrix[i][startCol].updateCellState(CellState.OBSTACLE);
            }
        }
    }
}