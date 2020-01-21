import { getClassOfActiveCellStateButton } from "../utilitybar.js";

export default class ObstacleButtonController {
    constructor(grid) {
        this.grid = grid;
        this.tableCellMatrix = grid.getTableCellMatrix;
        this.cellModelMatrix = grid.getCellModelMatrix;
        this.isActivated = false;
        this.initFunctionality();
    }

    initFunctionality() {
        let isToggling = false;
        let tableRoot = document.getElementById("grid-table");

        for (let i = 0; i < this.grid.numberOfRows; i++) {
            for (let j = 0; j < this.grid.numberOfCols; j++) {
                let tableCell = this.tableCellMatrix[i][j];
                let cellModel = this.cellModelMatrix[i][j];

                tableCell.addEventListener("mousedown", (event) => {
                    if (!this.isActivated) {
                        return;
                    }

                    isToggling = true;

                    if (event.target !== tableRoot) {
                        if (isToggling === false) {
                            return;
                        }
                        this.selectCell(cellModel);
                    }
                });
                tableCell.addEventListener("mouseenter", (event) => {
                    if (!this.isActivated) {
                        return;
                    }

                    if (isToggling === false) {
                        return;
                    }
                    
                    this.selectCell(cellModel);
                });
                tableCell.addEventListener("mouseup", (event) => {
                    if (!this.isActivated) {
                        return;
                    }

                    isToggling = false;
                });
            }
        }
    }

    selectCell(cellModel) {
        let classOfActiveButton = getClassOfActiveCellStateButton();
        cellModel.updateCellState(classOfActiveButton);
    }

    activate() {
        this.isActivated = true;
    }

    deactivate() {
        this.isActivated = false;
    }
}