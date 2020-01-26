import CellState from "../cellstate.js";
import ResetButtonController from "../controllers/resetbuttoncontroller.js";

export default class BasicRandomMaze {
    constructor(grid) {
        this.grid = grid;
        this.cellModelMatrix = grid.getCellModelMatrix;
        this.numberOfRows = grid.numberOfRows;
        this.numberOfCols = grid.numberOfCols;
    }

    run() {
        this.clearBoard();
        this.drawBorder();
        this.drawRandomMaze();
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

    drawRandomMaze() {
        let obstacleProbability = 0.4;

        for (let row = 1; row < this.numberOfRows - 2; row++) {
            for (let col = 1; col < this.numberOfCols - 2; col++) {
                if (Math.random() < obstacleProbability) {
                    this.cellModelMatrix[row][col].updateCellState(CellState.OBSTACLE);
                }
            }
        }
    }
}