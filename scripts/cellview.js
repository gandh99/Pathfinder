import CellState from "./cellstate.js";

export default class CellView {
    constructor(tableCell) {
        this.tableCell = tableCell;
    }

    updateCellStateView(cellModel) {
        let classOfActiveButton = cellModel.getCellState;
        this.tableCell.className = "";
        this.tableCell.classList.add(classOfActiveButton);
    }
}