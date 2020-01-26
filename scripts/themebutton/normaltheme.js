import ThemeModifier from "../button/thememodifier.js"

export default class NormalTheme extends ThemeModifier {
    constructor() {
        let cellStyle = "styles/themes/normal/normalcell.css";
        let gridStyle = "styles/themes/normal/normalgrid.css";
        super(cellStyle, gridStyle);
    }
}