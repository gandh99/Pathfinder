import CellState from "./cellstate.js";
import { activateCellStateButton, selectCell } from "./controllers.js";
import { grid } from "./index.js";
import SourceButtonController from "./sourcebuttoncontroller.js";
import DestinationButtonController from "./destinationbuttoncontroller.js";
import ObstacleButtonController from "./obstaclebuttoncontroller.js";

// Class names
const ACTIVE_BUTTON_CLASS_NAME = "active-button";

// Initialise the utility buttons
let sourceButton = document.getElementById("source-button");
let destinationButton = document.getElementById("destination-button");
let obstacleButton = document.getElementById("obstacle-button");
let resetButton = document.getElementById("reset-button");
let eraseButton = document.getElementById("erase-button");
let cellStateButtons = [sourceButton, destinationButton, obstacleButton, eraseButton];
let buttonToCellStateMap = new Map([
    [sourceButton.id, CellState.SOURCE],
    [destinationButton.id, CellState.DESTINATION],
    [obstacleButton.id, CellState.OBSTACLE],
    [eraseButton.id, CellState.BLANK]
]);

let sourceButtonController = new SourceButtonController(grid);
sourceButton.addEventListener("click", () => {
    activateCellStateButton(sourceButton, cellStateButtons);
    obstacleButtonController.deactivate();
    sourceButtonController.toggleActivate();
})

let destinationButtonController = new DestinationButtonController(grid);
destinationButton.addEventListener("click", () => {
    activateCellStateButton(destinationButton, cellStateButtons);
    obstacleButtonController.deactivate();
    destinationButtonController.toggleActivate();
})

let obstacleButtonController = new ObstacleButtonController(grid);
obstacleButton.addEventListener("click", () => {
    activateCellStateButton(obstacleButton, cellStateButtons);
    obstacleButtonController.toggleActivate();
})

resetButton.addEventListener("click", () => {
    let cellModelMatrix = grid.getCellModelMatrix;

    for (let i = 0; i < grid.numberOfRows; i++) {
        for (let j = 0; j < grid.numberOfCols; j++) {
            cellModelMatrix[i][j].updateCellState(CellState.BLANK);
        }
    }
});

export function getClassOfActiveButton() {
    for (let i = 0; i < cellStateButtons.length; i++) {
        let button = cellStateButtons[i];
        if (button.classList.contains(ACTIVE_BUTTON_CLASS_NAME)) {
            return buttonToCellStateMap.get(button.id);
        }
    }
}