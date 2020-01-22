import CellState from "../cellstate.js";

export default class SourceButtonController {
    constructor(grid, cellStateButtonGroup) {
        this.grid = grid;
        this.cellStateButtonGroup = cellStateButtonGroup;
        this.tableCellMatrix = grid.getTableCellMatrix;
        this.cellModelMatrix = grid.getCellModelMatrix;
        this.isActivated = false;
        this.sourceTableCell;
        this.sourceCellModel;
        this.initFunctionality();
    }

    initFunctionality() {
        for (let i = 0; i < this.grid.numberOfRows; i++) {
            for (let j = 0; j < this.grid.numberOfCols; j++) {
                let tableCell = this.tableCellMatrix[i][j];
                let cellModel = this.cellModelMatrix[i][j];
                tableCell.addEventListener("click", () => {
                    if (this.isActivated) {
                        this.reassignCellStateLocation(tableCell, cellModel);
                        this.selectCell(cellModel);
                    }
                });
            }
        }
    }

    selectCell(cellModel) {
        let classOfActiveButton = this.cellStateButtonGroup.getClassOfActiveCellStateButton();
        cellModel.updateCellState(classOfActiveButton);
    }

    // Ensures there can only be one source on the board at any point in time
    reassignCellStateLocation(tableCell, cellModel) {
        if (this.sourceTableCell != null && this.sourceCellModel != null) {
            this.sourceTableCell.classList.remove("source-cell");
            this.sourceCellModel.updateCellState(CellState.BLANK);
        }
        this.sourceTableCell = tableCell;
        this.sourceCellModel = cellModel;
    }

    activate() {
        this.isActivated = true;
    }

    deactivate() {
        this.isActivated = false;
    }
}