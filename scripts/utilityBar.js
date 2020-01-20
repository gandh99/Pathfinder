import CellState from "./cellstate.js";
import { activateCellStateButton, selectCell } from "./controllers.js";
import { grid } from "./index.js";

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

// Assign functionality to the cell state buttons
cellStateButtons.forEach(button => {
    button.addEventListener("click", function () {
        let isToggling = false;
        let tableRoot = document.getElementById("grid-table");
        let cellModelMatrix = grid.getCellModelMatrix;
        let tableCellMatrix = grid.getTableCellMatrix;

        activateCellStateButton(button, cellStateButtons);

        for (let i = 0; i < grid.numberOfRows; i++) {
            for (let j = 0; j < grid.numberOfCols; j++) {
                let tableCell = tableCellMatrix[i][j];
                let cellModel = cellModelMatrix[i][j];

                tableCell.addEventListener("mousedown", function (event) {
                    isToggling = true;

                    if (event.target !== tableRoot) {
                        if (isToggling === false) {
                            return;
                        }
                        selectCell(cellModel);
                    }
                });
                tableCell.addEventListener("mouseenter", function (event) {
                    if (isToggling === false) {
                        return;
                    }
                    selectCell(cellModel);
                });
                tableCell.addEventListener("mouseup", function (event) {
                    isToggling = false;
                });
            }
        }
    });
});

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