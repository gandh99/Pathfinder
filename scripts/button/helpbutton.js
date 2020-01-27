export default class HelpButton {
    constructor() {
        let modalWindow = document.getElementById("help-window-modal");
        
        let helpButton = document.getElementById("help-button");
        helpButton.addEventListener("click", () => {
            modalWindow.style.display = "block";
        });

        let doneButton = document.getElementById("close-help-window");
        doneButton.addEventListener("click", () => {
            modalWindow.style.display = "none";
        });
    }
}