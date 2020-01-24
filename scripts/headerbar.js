import AnimationButtonGroup from "./buttongroup/animationbuttongroup.js";

export default class HeaderBar {
    constructor(grid, utilityBar) {
        this.animationButtonGroup = new AnimationButtonGroup(grid, utilityBar);
    }
}
