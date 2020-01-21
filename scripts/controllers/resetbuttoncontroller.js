import CellState from "../cellstate.js";

export default class ResetButtonController {
    constructor(grid) {
        this.grid = grid;
    }

    activate() {
        let cellModelMatrix = this.grid.getCellModelMatrix;

        for (let i = 0; i < this.grid.numberOfRows; i++) {
            for (let j = 0; j < this.grid.numberOfCols; j++) {
                cellModelMatrix[i][j].updateCellState(CellState.BLANK);
            }
        }
    }
}