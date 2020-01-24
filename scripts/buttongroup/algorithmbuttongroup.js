export default class AlgorithmButtonGroup {
    constructor() {
        let algorithmButton = document.getElementById("algorithm-dropdown-menu");
        let algorithmChoices = algorithmButton.getElementsByClassName("dropdown-item");
        for (let i = 0; i < algorithmChoices.length; i++) {
            algorithmChoices[i].addEventListener("click", () => {
                this.resetActiveItems(algorithmChoices);
                algorithmChoices[i].classList.add("dropdown-active-item");
            });
        }
    }

    resetActiveItems(algorithmChoices) {
        for (let i = 0; i < algorithmChoices.length; i++) {
            algorithmChoices[i].classList.remove("dropdown-active-item");
        }
    }
}