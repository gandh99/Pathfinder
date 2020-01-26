export default class ThemeButtonGroup {
    constructor(grid) {
        this.dropdownActiveItem = "dropdown-active-item";
        this.grid = grid;
        this.getThemeButtons();
        this.initButtonToThemeMap();
        this.initButtonFunctionality();
    }

    getThemeButtons() {
        this.normalTheme = document.getElementById("normal-theme");
        this.galaxyTheme = document.getElementById("galaxy-theme");
        this.islandTheme = document.getElementById("island-theme");
        this.arcadeTheme = document.getElementById("arcade-theme");
        this.themeChoices = [
            this.normalTheme,
            this.galaxyTheme,
            this.islandTheme,
            this.arcadeTheme
        ]
    }

    initButtonToThemeMap() {
        this.buttonToThemeMap = new Map([
            // [this.normalTheme, new BasicRandomMaze(this.grid)],
            // [this.galaxyTheme, new RecursiveDivision(this.grid)],
            // [this.islandTheme, new RecursiveDivision(this.grid)],
            // [this.arcadeTheme, new RecursiveDivision(this.grid)]
        ]);
    }

    initButtonFunctionality() {
        for (let i = 0; i < this.themeChoices.length; i++) {
            this.themeChoices[i].addEventListener("click", () => {
                // Update the UI
                this.resetActiveItems(this.themeChoices);
                this.themeChoices[i].classList.add(this.dropdownActiveItem);

                // Get the maze algorithm and run it
                // let mazeAlgorithm = this.buttonToMazeMap.get(this.themeChoices[i]);
                // mazeAlgorithm.run();
            });
        }
    }

    resetActiveItems(themeChoices) {
        for (let i = 0; i < themeChoices.length; i++) {
            themeChoices[i].classList.remove(this.dropdownActiveItem);
        }
    }
}