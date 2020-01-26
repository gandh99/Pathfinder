import RecursiveDivision from "../mazealgorithms/recursivedivision.js";
import BasicRandomMaze from "../mazealgorithms/basicrandommaze.js";

export default class MazeButtonGroup {
    constructor(grid) {
        this.dropdownActiveItem = "dropdown-active-item";
        this.grid = grid;
        this.getMazeButtons();
        this.initButtonToMazeMap();
        this.initButtonFunctionality();
    }

    getMazeButtons() {
        this.basicRandomMaze = document.getElementById("basic-random-maze");
        this.recursiveDivision = document.getElementById("recursive-division");
        this.mazeChoices = [
            this.basicRandomMaze,
            this.recursiveDivision,
        ]
    }

    initButtonToMazeMap() {
        this.buttonToMazeMap = new Map([
            [this.basicRandomMaze, new BasicRandomMaze(this.grid)],
            [this.recursiveDivision, new RecursiveDivision(this.grid)]
        ]);
    }

    initButtonFunctionality() {
        for (let i = 0; i < this.mazeChoices.length; i++) {
            this.mazeChoices[i].addEventListener("click", () => {
                // Update the UI
                this.resetActiveItems(this.mazeChoices);
                this.mazeChoices[i].classList.add(this.dropdownActiveItem);

                // Get the maze algorithm and run it
                let mazeAlgorithm = this.buttonToMazeMap.get(this.mazeChoices[i]);
                mazeAlgorithm.run();
            });
        }
    }

    resetActiveItems(algorithmChoices) {
        for (let i = 0; i < algorithmChoices.length; i++) {
            algorithmChoices[i].classList.remove(this.dropdownActiveItem);
        }
    }
}