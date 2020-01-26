import ThemeModifier from "../button/thememodifier.js"

export default class PokemonTheme extends ThemeModifier {
    constructor() {
        let cellStyle = "styles/themes/pokemon/pokemoncell.css";
        let gridStyle = "styles/themes/pokemon/pokemongrid.css";
        let utilityIconStyle = "styles/themes/pokemon/pokemonutilityicon.css";
        super(cellStyle, gridStyle, utilityIconStyle);
    }
}