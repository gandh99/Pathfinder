import AnimationButtonGroup from "./buttongroup/animationbuttongroup.js";
import AlgorithmButtonGroup from "./buttongroup/algorithmbuttongroup.js";
import ResetButton from "./button/resetbutton.js";
import MazeButtonGroup from "./buttongroup/mazebuttongroup.js";
import ThemeButtonGroup from "./buttongroup/themebuttongroup.js";

export default class HeaderBar {
    constructor(grid, utilityBar) {
        this.algorithmButtonGroup = new AlgorithmButtonGroup();
        this.themeButtonGroup = new ThemeButtonGroup();
        this.animationButtonGroup = new AnimationButtonGroup(grid, utilityBar, this.algorithmButtonGroup);
        this.mazeButtonGroup = new MazeButtonGroup(grid);
        this.resetButton = new ResetButton(grid);
    }
}
