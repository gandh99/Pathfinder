import ResetButtonController from "../controllers/resetbuttoncontroller.js";

export default class ResetButton {
    constructor(grid) {
        // Assign the resetButton its controller
        this.resetButton = document.getElementById("reset-button");
        let resetButtonController = new ResetButtonController(grid);
        this.resetButton.addEventListener("click", () => {
            resetButtonController.activate();
        });
    }
}