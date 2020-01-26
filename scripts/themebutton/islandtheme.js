import ThemeModifier from "../button/thememodifier.js"

export default class IslandTheme extends ThemeModifier {
    constructor() {
        let cellStyle = "styles/themes/island/islandcell.css";
        let gridStyle = "styles/themes/island/islandgrid.css";
        let utilityIconStyle = "styles/themes/island/islandutilityicon.css";
        super(cellStyle, gridStyle, utilityIconStyle);
    }
}