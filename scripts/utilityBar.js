import { grid } from "./index.js";
import ResetButtonController from "./controllers/resetbuttoncontroller.js";
import CellStateButtonGroup from "./buttongroup/cellstatebuttongroup.js";

export default class UtilityBar {
    constructor() {
        this.cellStateButtonGroup = new CellStateButtonGroup(grid);
    }

    sendAnimationPlayEvent() {
        this.cellStateButtonGroup.toggleAnimationPlaying();
    }
}
