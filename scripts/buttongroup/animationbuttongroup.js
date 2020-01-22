import { grid } from "../index.js";

export default class AnimationButtonGroup {
    constructor(grid, utilityBar) {
        this.utilityBar = utilityBar;
        this.grid = grid;
        this.playButton = document.getElementById("play-button");
        this.initFunctionality();
    }

    initFunctionality() {
        this.playButton.addEventListener("click", () => {
            this.utilityBar.sendAnimationPlayEvent();
            this.grid.startAnimation();
            // this.utilityBar.sendAnimationPlayEvent();
        });
    }
}

