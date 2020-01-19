import CellState from "./cellstate.js";

export default class CellView {
    constructor(tableView) {
        this.tableView = tableView;
    }

    updateCellStateView(cellModel) {
        let classOfActiveButton = cellModel.getCellState;
        this.tableView.className = "";
        this.tableView.classList.add(classOfActiveButton);
    }
}