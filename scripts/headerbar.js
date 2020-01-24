import AnimationButtonGroup from "./buttongroup/animationbuttongroup.js";
import AlgorithmButtonGroup from "./buttongroup/algorithmbuttongroup.js";

export default class HeaderBar {
    constructor(grid, utilityBar) {
        this.algorithmButtonGroup = new AlgorithmButtonGroup();
        this.animationButtonGroup = new AnimationButtonGroup(grid, utilityBar);
    }
}
