import AnimationButtonGroup from "./buttongroup/animationbuttongroup.js";
import AlgorithmButtonGroup from "./buttongroup/algorithmbuttongroup.js";
import ResetButton from "./button/resetbutton.js";

export default class HeaderBar {
    constructor(grid, utilityBar) {
        this.algorithmButtonGroup = new AlgorithmButtonGroup();
        this.animationButtonGroup = new AnimationButtonGroup(grid, utilityBar, this.algorithmButtonGroup);
        this.resetButton = new ResetButton(grid);
    }
}
