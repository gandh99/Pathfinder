import Dijkstra from "../algorithms/dijkstra.js";
import AStar from "../algorithms/astar.js";
import BreadthFirst from "../algorithms/breadthfirstsearch.js";
import DepthFirst from "../algorithms/depthfirstsearch.js";

export default class AlgorithmButtonGroup {
    constructor() {
        this.dropdownActiveItem = "dropdown-active-item";
        this.selectedAlgorithm;
        this.getAlgorithmButtons();
        this.initButtonToAlgorithmMap();
        this.setDefaultAlgorithm();
        this.initButtonFunctionality();
    }

    getAlgorithmButtons() {
        this.dijkstra = document.getElementById("dijkstras-algorithm");
        this.astar = document.getElementById("astar-algorithm");
        this.breadthFirst = document.getElementById("breadth-first-algorithm");
        this.depthFirst = document.getElementById("depth-first-algorithm");
        this.algorithmChoices = [
            this.dijkstra,
            this.astar,
            this.breadthFirst,
            this.depthFirst
        ]
    }

    initButtonToAlgorithmMap() {
        this.buttonToAlgorithmMap = new Map([
            [this.dijkstra, new Dijkstra()],
            [this.astar, new AStar()],
            [this.breadthFirst, new BreadthFirst()],
            [this.depthFirst, new DepthFirst()]
        ]);
    }

    setDefaultAlgorithm() {
        // Set Dijkstra's as default
        this.dijkstra.classList.add(this.dropdownActiveItem);
        this.selectedAlgorithm = this.buttonToAlgorithmMap.get(this.dijkstra);
    }

    initButtonFunctionality() {
        for (let i = 0; i < this.algorithmChoices.length; i++) {
            this.algorithmChoices[i].addEventListener("click", () => {
                this.resetActiveItems(this.algorithmChoices);
                this.algorithmChoices[i].classList.add(this.dropdownActiveItem);
                this.selectedAlgorithm = this.buttonToAlgorithmMap.get(this.algorithmChoices[i]);
            });
        }
    }

    resetActiveItems(algorithmChoices) {
        for (let i = 0; i < algorithmChoices.length; i++) {
            algorithmChoices[i].classList.remove(this.dropdownActiveItem);
        }
    }

    getSelectedAlgorithm() {
        return this.selectedAlgorithm;
    }
}