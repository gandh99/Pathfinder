export default class ThemeModifier {
    constructor(cellStyle, gridStyle, utilityIconStyle) {
        this.cellStyle = cellStyle;
        this.gridStyle = gridStyle;
        this.utilityIconStyle = utilityIconStyle;
    }

    activateTheme() {
        this.cellStyleFileref = this.appendThemeToHead(this.cellStyle);
        this.gridStyleFileref = this.appendThemeToHead(this.gridStyle);
        this.utilityIconStyleFileref = this.appendThemeToHead(this.utilityIconStyle);
    }

    appendThemeToHead(filename) {
        // Create CSS link
        let fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
        fileref.setAttribute("media", "all");

        // Append CSS link to head
        let head  = document.getElementsByTagName('head')[0];
        head.appendChild(fileref);

        return fileref;
    }

    removeThemeFromHead() {
        let head  = document.getElementsByTagName('head')[0];
        let linkNodes = document.getElementsByTagName('link');
        let oldCellFileref, oldGridFileref, oldUtilityIconFileref;

        for (let i = 0; i < linkNodes.length; i++) {
            if (linkNodes[i] == this.cellStyleFileref) {
                oldCellFileref = linkNodes[i];
            } else if (linkNodes[i] == this.gridStyleFileref) {
                oldGridFileref = linkNodes[i];
            } else if (linkNodes[i] == this.utilityIconStyleFileref) {
                oldUtilityIconFileref = linkNodes[i];
            }
        }

        // Remove old filerefs from head
        head.removeChild(oldCellFileref);
        head.removeChild(oldGridFileref);
        head.removeChild(oldUtilityIconFileref);
    }
}