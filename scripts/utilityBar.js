// Class names
const ACTIVE_BUTTON_CLASS_NAME = "active-button";
const SOURCE_CELL_CLASS_NAME = "source-cell";
const DESTINATION_CELL_CLASS_NAME = "destination-cell";

// Initialise the utility buttons
let sourceButton = document.getElementById("source-button");
let destinationButton = document.getElementById("destination-button");
let cellStateButtons = [sourceButton, destinationButton];

addCellStateButtonFunctionality();

function addCellStateButtonFunctionality() {
    cellStateButtons.forEach(button => {
        button.addEventListener("click", activateCellStateButton);
    });
}

function activateCellStateButton() {
    // First deactivate all the cell state buttons since only maximum of 1 should be active at any given time
    cellStateButtons.forEach(button => {
        button.classList.remove(ACTIVE_BUTTON_CLASS_NAME);
    });

    // Activate the selected cell state button
    this.classList.add(ACTIVE_BUTTON_CLASS_NAME);
}

export function getClassOfActiveButton() {
    if (sourceButton.classList.contains(ACTIVE_BUTTON_CLASS_NAME)) {
        return SOURCE_CELL_CLASS_NAME;
    } else if (destinationButton.classList.contains(ACTIVE_BUTTON_CLASS_NAME)) {
        return DESTINATION_CELL_CLASS_NAME;
    }
}