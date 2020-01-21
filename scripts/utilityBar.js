import CellState from "./cellstate.js";
import { activateCellStateButton } from "./controllers/controllers.js";
import { grid } from "./index.js";
import SourceButtonController from "./controllers/sourcebuttoncontroller.js";
import DestinationButtonController from "./controllers/destinationbuttoncontroller.js";
import ObstacleButtonController from "./controllers/obstaclebuttoncontroller.js";
import EraseButtonController from "./controllers/erasebuttoncontroller.js";
import ResetButtonController from "./controllers/resetbuttoncontroller.js";

// Class names
const ACTIVE_BUTTON_CLASS_NAME = "active-button";

// Cell state buttons
let sourceButton = document.getElementById("source-button");
let destinationButton = document.getElementById("destination-button");
let obstacleButton = document.getElementById("obstacle-button");
let eraseButton = document.getElementById("erase-button");
let cellStateButtons = [sourceButton, destinationButton, obstacleButton, eraseButton];
let buttonToCellStateMap = new Map([
    [sourceButton.id, CellState.SOURCE],
    [destinationButton.id, CellState.DESTINATION],
    [obstacleButton.id, CellState.OBSTACLE],
    [eraseButton.id, CellState.BLANK]
]);

// Button controllers for the cell states
let sourceButtonController = new SourceButtonController(grid);
let destinationButtonController = new DestinationButtonController(grid);
let obstacleButtonController = new ObstacleButtonController(grid);
let eraseButtonController = new EraseButtonController(grid);
let cellStateButtonControllers = [sourceButtonController, destinationButtonController, obstacleButtonController, eraseButtonController];
let cellStateButtonToControllerMap = new Map([
    [sourceButton, sourceButtonController],
    [destinationButton, destinationButtonController],
    [obstacleButton, obstacleButtonController],
    [eraseButton, eraseButtonController],
]);

// Assign each cell state button to its respective controller
cellStateButtonToControllerMap.forEach((controller, button) => {
    button.addEventListener("click", () => {
        activateCellStateButton(button, cellStateButtons);
        cellStateButtonControllers.map(button => button.deactivate());
        controller.activate();
    });
});

// Assign the resetButton its controller
let resetButton = document.getElementById("reset-button");
let resetButtonController = new ResetButtonController(grid);
resetButton.addEventListener("click", () => {
    resetButtonController.activate();
});

export function getClassOfActiveCellStateButton() {
    for (let i = 0; i < cellStateButtons.length; i++) {
        let button = cellStateButtons[i];
        if (button.classList.contains(ACTIVE_BUTTON_CLASS_NAME)) {
            return buttonToCellStateMap.get(button.id);
        }
    }
}