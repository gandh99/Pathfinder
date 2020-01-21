import CellState from "./cellstate.js";
import { activateCellStateButton } from "./controllers/controllers.js";
import { grid } from "./index.js";
import SourceButtonController from "./controllers/sourcebuttoncontroller.js";
import DestinationButtonController from "./controllers/destinationbuttoncontroller.js";
import ObstacleButtonController from "./controllers/obstaclebuttoncontroller.js";
import EraseButtonController from "./controllers/erasebuttoncontroller.js";

// Class names
const ACTIVE_BUTTON_CLASS_NAME = "active-button";

// HTML buttons
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

// Button controllers
let sourceButtonController = new SourceButtonController(grid);
let destinationButtonController = new DestinationButtonController(grid);
let obstacleButtonController = new ObstacleButtonController(grid);
let eraseButtonController = new EraseButtonController(grid);
let buttonControllers = [sourceButtonController, destinationButtonController, obstacleButtonController, eraseButtonController];

sourceButton.addEventListener("click", () => {
    activateCellStateButton(sourceButton, cellStateButtons);
    buttonControllers.map(button => button.deactivate());
    sourceButtonController.activate();
})

destinationButton.addEventListener("click", () => {
    activateCellStateButton(destinationButton, cellStateButtons);
    buttonControllers.map(button => button.deactivate());
    destinationButtonController.activate();
})

obstacleButton.addEventListener("click", () => {
    activateCellStateButton(obstacleButton, cellStateButtons);
    buttonControllers.map(button => button.deactivate());
    obstacleButtonController.activate();
})

eraseButton.addEventListener("click", () => {
    activateCellStateButton(eraseButton, cellStateButtons);
    buttonControllers.map(button => button.deactivate());
    eraseButtonController.activate();
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