import {getClassOfActiveButton, getCellStateFromValue} from "./utilityBar.js";

export function selectCell(cellModel) {
    let classOfActiveButton = getClassOfActiveButton();
    let cellState = getCellStateFromValue(classOfActiveButton);
    cellModel.updateCellState(cellState);
}