import CellState from "../cellstate.js";
import { getClassOfActiveCellStateButton } from "../utilitybar.js";

export default class DestinationButtonController {
    constructor(grid) {
        this.grid = grid;
        this.tableCellMatrix = grid.getTableCellMatrix;
        this.cellModelMatrix = grid.getCellModelMatrix;
        this.isActivated = false;
        this.destinationTableCell;
        this.destinationCellModel;
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
        let classOfActiveButton = getClassOfActiveCellStateButton();
        cellModel.updateCellState(classOfActiveButton);
    }

    reassignCellStateLocation(tableCell, cellModel) {
        if (this.destinationTableCell != null && this.destinationCellModel != null) {
            this.destinationTableCell.classList.remove("destination-cell");
            this.destinationCellModel.updateCellState(CellState.BLANK);
        }
        this.destinationTableCell = tableCell;
        this.destinationCellModel = cellModel;
    }

    activate() {
        this.isActivated = true;
    }

    deactivate() {
        this.isActivated = false;
    }
}