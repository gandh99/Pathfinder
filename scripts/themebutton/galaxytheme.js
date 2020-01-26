import ThemeModifier from "../button/thememodifier.js"

export default class GalaxyTheme extends ThemeModifier {
    constructor() {
        let cellStyle = "styles/themes/galaxy/galaxycell.css";
        let gridStyle = "styles/themes/galaxy/galaxygrid.css";
        super(cellStyle, gridStyle);
    }
}