import { grid } from "../index.js";

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
            this.grid.startAnimation(this);
        });
    }

    animationFinished() {
        this.utilityBar.sendAnimationPlayEvent();  
    }
}

