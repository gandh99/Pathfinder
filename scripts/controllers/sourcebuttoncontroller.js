import { selectCell } from "./controllers.js";

export default class SourceButtonController {
    constructor(grid) {
        this.grid = grid;
        this.tableCellMatrix = grid.getTableCellMatrix;
        this.cellModelMatrix = grid.getCellModelMatrix;
        this.isActivated = false;
        this.initFunctionality();
    }

    initFunctionality() {
        for (let i = 0; i < this.grid.numberOfRows; i++) {
            for (let j = 0; j < this.grid.numberOfCols; j++) {
                let tableCell = this.tableCellMatrix[i][j];
                let cellModel = this.cellModelMatrix[i][j];
                tableCell.addEventListener("click", () => {
                    if (this.isActivated) {
                        selectCell(cellModel);
                    }
                });
            }
        }
    }

    activate() {
        this.isActivated = true;
    }

    deactivate() {
        this.isActivated = false;
    }
}