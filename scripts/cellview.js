import CellState from "./cellstate.js";

export default class CellView {
    constructor(tableView) {
        this.tableView = tableView;
    }

    updateCellStateView(cellModel) {
        let classOfActiveButton = CellState[cellModel.getCellState];
        this.tableView.className = "";
        this.tableView.classList.add(classOfActiveButton);
    }
}