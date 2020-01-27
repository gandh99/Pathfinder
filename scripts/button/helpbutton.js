export default class HelpButton {
    constructor() {
        let helpButton = document.getElementById("help-button");
        helpButton.addEventListener("click", () => {
            let modalWindow = document.getElementById("help-window-modal");
            modalWindow.style.display = "block";
        })
    }
}