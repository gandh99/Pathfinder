import CellState from "../cellstate.js";
import SourceButtonController from "../controllers/sourcebuttoncontroller.js";
import DestinationButtonController from "../controllers/destinationbuttoncontroller.js";
import ObstacleButtonController from "../controllers/obstaclebuttoncontroller.js";
import EraseButtonController from "../controllers/erasebuttoncontroller.js";

export default class CellStateButtonGroup {
    constructor(grid) {
        this.ACTIVE_BUTTON_CLASS_NAME = "active-button";
        this.isAnimationPlaying = false;
        this.grid = grid;

        // Cell state buttons
        this.sourceButton = document.getElementById("source-button");
        this.destinationButton = document.getElementById("destination-button");
        this.obstacleButton = document.getElementById("obstacle-button");
        this.eraseButton = document.getElementById("erase-button");
        this.cellStateButtons = [this.sourceButton, this.destinationButton, this.obstacleButton, this.eraseButton];
        this.buttonToCellStateMap = new Map([
            [this.sourceButton.id, CellState.SOURCE],
            [this.destinationButton.id, CellState.DESTINATION],
            [this.obstacleButton.id, CellState.OBSTACLE],
            [this.eraseButton.id, CellState.BLANK]
        ]);

        // Button controllers for the cell states
        this.sourceButtonController = new SourceButtonController(this.grid, this);
        this.destinationButtonController = new DestinationButtonController(this.grid, this);
        this.obstacleButtonController = new ObstacleButtonController(this.grid, this);
        this.eraseButtonController = new EraseButtonController(this.grid, this);
        this.cellStateButtonControllers = [this.sourceButtonController, this.destinationButtonController, this.obstacleButtonController, this.eraseButtonController];
        this.cellStateButtonToControllerMap = new Map([
            [this.sourceButton, this.sourceButtonController],
            [this.destinationButton, this.destinationButtonController],
            [this.obstacleButton, this.obstacleButtonController],
            [this.eraseButton, this.eraseButtonController],
        ]);

        this.initFunctionality();
    }

    initFunctionality() {
        // Assign each cell state button to its respective controller
        this.cellStateButtonToControllerMap.forEach((controller, button) => {
            button.addEventListener("click", () => {
                if (!this.isAnimationPlaying) {
                    this.activateCellStateButton(button);
                    this.cellStateButtonControllers.map(otherController => otherController.deactivate());
                    controller.activate();
                } else {
                    this.cellStateButtonControllers.map(otherController => otherController.deactivate());
                }
            });
        });
    }

    toggleAnimationPlaying() {
        this.isAnimationPlaying = !this.isAnimationPlaying;
    }

    activateCellStateButton(button) {    
        // First deactivate all the cell state buttons since only maximum of 1 should be active at any given time
        this.cellStateButtons.forEach(button => {
            button.classList.remove(this.ACTIVE_BUTTON_CLASS_NAME);
        });
    
        // Activate the selected cell state button by giving adding a class name to it
        button.classList.add(this.ACTIVE_BUTTON_CLASS_NAME);
    }

    getClassOfActiveCellStateButton() {
        for (let i = 0; i < this.cellStateButtons.length; i++) {
            let button = this.cellStateButtons[i];
            if (button.classList.contains(this.ACTIVE_BUTTON_CLASS_NAME)) {
                return this.buttonToCellStateMap.get(button.id);
            }
        }
    }
}