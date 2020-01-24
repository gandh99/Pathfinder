import { grid } from "./index.js";
import ResetButtonController from "./controllers/resetbuttoncontroller.js";
import CellStateButtonGroup from "./buttongroup/cellstatebuttongroup.js";

export default class UtilityBar {
    constructor() {
        this.cellStateButtonGroup = new CellStateButtonGroup(grid);

        // Assign the resetButton its controller
        this.resetButton = document.getElementById("reset-button");
        let resetButtonController = new ResetButtonController(grid);
        this.resetButton.addEventListener("click", () => {
            resetButtonController.activate();
        });
    }

    sendAnimationPlayEvent() {
        this.cellStateButtonGroup.toggleAnimationPlaying();
    }
}
