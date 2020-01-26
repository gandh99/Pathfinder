import NormalTheme from "../themebutton/normaltheme.js";
import IslandTheme from "../themebutton/islandtheme.js";
import GalaxyTheme from "../themebutton/galaxytheme.js";

export default class ThemeButtonGroup {
    constructor(grid) {
        this.dropdownActiveItem = "dropdown-active-item";
        this.grid = grid;
        this.activeTheme;
        this.getThemeButtons();
        this.initButtonToThemeMap();
        this.initButtonFunctionality();
        this.setDefaultTheme();
    }

    getThemeButtons() {
        this.normalTheme = document.getElementById("normal-theme");
        this.galaxyTheme = document.getElementById("galaxy-theme");
        this.islandTheme = document.getElementById("island-theme");
        this.themeChoices = [
            this.normalTheme,
            this.galaxyTheme,
            this.islandTheme,
        ]
    }

    initButtonToThemeMap() {
        this.buttonToThemeMap = new Map([
            [this.normalTheme, new NormalTheme()],
            [this.galaxyTheme, new GalaxyTheme()],
            [this.islandTheme, new IslandTheme()],
        ]);
    }

    initButtonFunctionality() {
        for (let i = 0; i < this.themeChoices.length; i++) {
            this.themeChoices[i].addEventListener("click", () => {
                // Update the UI
                this.resetActiveItems(this.themeChoices);
                this.themeChoices[i].classList.add(this.dropdownActiveItem);

                // Remove any other theme and then activate this theme
                this.activeTheme.removeThemeFromHead();
                let theme = this.buttonToThemeMap.get(this.themeChoices[i]);
                theme.activateTheme();
                this.activeTheme = theme;
            });
        }
    }

    resetActiveItems(themeChoices) {
        for (let i = 0; i < themeChoices.length; i++) {
            themeChoices[i].classList.remove(this.dropdownActiveItem);
        }
    }

    setDefaultTheme() {
        this.normalTheme.classList.add(this.dropdownActiveItem);
        let theme = this.buttonToThemeMap.get(this.normalTheme);
        theme.activateTheme();
        this.activeTheme = theme;
    }
}