import CellState from "./cellstate.js";

export default class CellModel {
    constructor(x, y, cellView) {
        this.x = x;
        this.y = y;
        this.cellView = cellView;
        this.cellState = CellState.BLANK;
    }

    updateCellState(cellState) {
        this.cellState = cellState;
        this.cellView.updateCellStateView(this);
    }

    get getCellState() {
        return this.cellState;
    }

    get getKey() {
        return this.x + "-" + this.y;
    }

    get getX() {
        return this.x;
    }

    get getY() {
        return this.y;
    }
}