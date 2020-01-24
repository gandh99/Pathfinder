import Dijkstra from "../algorithms/dijkstra.js";

export default class AlgorithmButtonGroup {
    constructor() {
        this.dropdownActiveItem = "dropdown-active-item";
        this.selectedAlgorithm;
        this.getAlgorithmButtons();
        this.setDefaultAlgorithm();
        for (let i = 0; i < this.algorithmChoices.length; i++) {
            this.algorithmChoices[i].addEventListener("click", () => {
                this.resetActiveItems(this.algorithmChoices);
                this.algorithmChoices[i].classList.add(this.dropdownActiveItem);
                this.selectedAlgorithm = this.buttonToAlgorithmMap.get(this.algorithmChoices[i]);
            });
        }
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
        this.buttonToAlgorithmMap = new Map([
            [this.dijkstra, new Dijkstra()],
            [this.astar, new Dijkstra()],
            [this.breadthFirst, new Dijkstra()],
            [this.depthFirst, new Dijkstra()]
        ]);
    }

    setDefaultAlgorithm() {
        // Set Dijkstra's as default
        this.dijkstra.classList.add(this.dropdownActiveItem);
        this.selectedAlgorithm = this.buttonToAlgorithmMap.get(this.dijkstra);
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