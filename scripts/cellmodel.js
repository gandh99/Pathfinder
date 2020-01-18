export default class CellModel {
    constructor(x, y, cellView) {
        this.x = x;
        this.y = y;
        this.cellView = cellView;
        this.cellState;
    }

    updateCellState(cellState) {
        this.cellState = cellState;
        this.cellView.updateCellStateView(this);
    }

    get getCellState() {
        return this.cellState;
    }
}