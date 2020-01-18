import CellState from "./CellState.js";

// Class names
const ACTIVE_BUTTON_CLASS_NAME = "active-button";

// Initialise the utility buttons
let sourceButton = document.getElementById("source-button");
let destinationButton = document.getElementById("destination-button");
let cellStateButtons = [sourceButton, destinationButton];
let buttonToCellStateMap = new Map([
    [sourceButton.id, CellState.SOURCE],
    [destinationButton.id, CellState.DESTINATION]
]);

initCellStateButtons();

function initCellStateButtons() {
    cellStateButtons.forEach(button => {
        button.addEventListener("click", activateCellStateButton);
    });
}

function activateCellStateButton() {
    // First deactivate all the cell state buttons since only maximum of 1 should be active at any given time
    cellStateButtons.forEach(button => {
        button.classList.remove(ACTIVE_BUTTON_CLASS_NAME);
    });

    // Activate the selected cell state button by giving adding a class name to it
    this.classList.add(ACTIVE_BUTTON_CLASS_NAME);
}

export function getClassOfActiveButton() {
    for (let i = 0; i < cellStateButtons.length; i++) {
        let button = cellStateButtons[i];
        if (button.classList.contains(ACTIVE_BUTTON_CLASS_NAME)) {
            return buttonToCellStateMap.get(button.id);
        }
    }
}