import { getClassOfActiveCellStateButton } from "../utilitybar.js";

export function selectCell(cellModel) {
    let classOfActiveButton = getClassOfActiveCellStateButton();
    cellModel.updateCellState(classOfActiveButton);
}

export function activateCellStateButton(button, cellStateButtons) {
    const ACTIVE_BUTTON_CLASS_NAME = "active-button";

    // First deactivate all the cell state buttons since only maximum of 1 should be active at any given time
    cellStateButtons.forEach(button => {
        button.classList.remove(ACTIVE_BUTTON_CLASS_NAME);
    });

    // Activate the selected cell state button by giving adding a class name to it
    button.classList.add(ACTIVE_BUTTON_CLASS_NAME);
}

export function playAnimation(grid) {
    grid.startAnimation();
}