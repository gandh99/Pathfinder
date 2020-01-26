export default class NormalTheme {
    constructor() {
        this.cellStyle = "styles/themes/normal/cell.css";
        this.gridStyle = "styles/themes/normal/grid.css";
    }

    activateTheme() {
        this.appendThemeToHead(this.cellStyle);
        this.appendThemeToHead(this.gridStyle);
    }

    appendThemeToHead(filename) {
        let fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
        fileref.setAttribute("media", "all");

        let head  = document.getElementsByTagName('head')[0];
        head.appendChild(fileref);
    }
}