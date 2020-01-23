import Dijkstra from "../algorithms/dijkstra.js";

export default class AnimationButtonGroup {
    constructor(grid, utilityBar) {
        this.utilityBar = utilityBar;
        this.grid = grid;
        this.getAnimationButtons();
        this.initFunctionality();
    }

    getAnimationButtons() {
        this.playButton = document.getElementById("play-button");
    }

    initFunctionality() {
        this.playButton.addEventListener("click", () => {
            this.utilityBar.sendAnimationPlayEvent();
            this.startAnimation();
        });
    }

    startAnimation() {
        let dijkstra = new Dijkstra(this.grid, this);
    }

    endAnimation() {
        this.utilityBar.sendAnimationPlayEvent();
    }
}

