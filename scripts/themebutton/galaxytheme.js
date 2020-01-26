import ThemeModifier from "../button/thememodifier.js"

export default class GalaxyTheme extends ThemeModifier {
    constructor() {
        let cellStyle = "styles/themes/galaxy/galaxycell.css";
        let gridStyle = "styles/themes/galaxy/galaxygrid.css";
        let utilityIconStyle = "styles/themes/galaxy/galaxyutilityicon.css";
        super(cellStyle, gridStyle, utilityIconStyle);
    }
}