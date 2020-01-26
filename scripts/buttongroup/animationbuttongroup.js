import Dijkstra from "../algorithms/dijkstra.js";
import CellState from "../cellstate.js";

export default class AnimationButtonGroup {
    constructor(grid, utilityBar, algorithmButtonGroup) {
        this.utilityBar = utilityBar;
        this.grid = grid;
        this.algorithmButtonGroup = algorithmButtonGroup;
        this.getAnimationButtons();
        this.initFunctionality();
    }

    getAnimationButtons() {
        this.playButton = document.getElementById("play-button");
    }

    initFunctionality() {
        this.playButton.addEventListener("click", () => {
            this.utilityBar.sendAnimationPlayEvent();
            this.clearVisitedCells();
            this.startAnimation();
        });
    }

    // Clear the board of all cells except source, destination and obstacles
    clearVisitedCells() {
        let cellModelMatrix = this.grid.getCellModelMatrix;
        for (let i = 0; i < this.grid.getNumberOfRows; i++) {
            for (let j = 0; j < this.grid.getNumberOfCols; j++) {
                if (cellModelMatrix[i][j].getCellState == CellState.SOURCE
                    || cellModelMatrix[i][j].getCellState == CellState.DESTINATION
                    || cellModelMatrix[i][j].getCellState == CellState.OBSTACLE) {
                    continue;
                } else if (cellModelMatrix[i][j].getCellState == CellState.SOURCE_VISITED) {
                    cellModelMatrix[i][j].updateCellState(CellState.SOURCE); 
                    continue;
                } else if (cellModelMatrix[i][j].getCellState == CellState.DESTINATION_VISITED) {
                    cellModelMatrix[i][j].updateCellState(CellState.DESTINATION); 
                    continue;
                }
                cellModelMatrix[i][j].updateCellState(CellState.BLANK);
            }
        }
    }

    startAnimation() {
        let algorithm = this.algorithmButtonGroup.getSelectedAlgorithm();
        algorithm.run(this.grid, this);
    }

    endAnimation() {
        this.utilityBar.sendAnimationPlayEvent();
    }
}

