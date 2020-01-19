import CellState from "./cellstate.js";
import { activateCellStateButton } from "./controllers.js";

// Class names
const ACTIVE_BUTTON_CLASS_NAME = "active-button";

// Initialise the utility buttons
let sourceButton = document.getElementById("source-button");
let destinationButton = document.getElementById("destination-button");
let obstacleButton = document.getElementById("obstacle-button");
let cellStateButtons = [sourceButton, destinationButton, obstacleButton];
let buttonToCellStateMap = new Map([
    [sourceButton.id, CellState.SOURCE],
    [destinationButton.id, CellState.DESTINATION],
    [obstacleButton.id, CellState.OBSTACLE]
]);

// Assign functionality to the cell state buttons
cellStateButtons.forEach(button => {
    button.addEventListener("click", function () {
        activateCellStateButton(button, cellStateButtons);
    });
});

export function getClassOfActiveButton() {
    for (let i = 0; i < cellStateButtons.length; i++) {
        let button = cellStateButtons[i];
        if (button.classList.contains(ACTIVE_BUTTON_CLASS_NAME)) {
            return buttonToCellStateMap.get(button.id);
        }
    }
}