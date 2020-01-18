import CellModel from "./cellmodel.js";
import CellView from "./cellview.js";
import {selectCell} from "./controllers.js";

export default class Grid {
    constructor(numberOfRows, numberOfCols) {
        this.numberOfRows = numberOfRows;
        this.numberOfCols = numberOfCols;
        this.grid = new Array(this.numberOfRows);
        this.initGrid();
    }

    // Draw the 2D grid and assign click listeners
    initGrid() {
        let gridContainer = document.getElementById("grid-container");
        let tableRoot = document.createElement("table");
        tableRoot.id = "grid-table";

        for (let i = 0; i < this.numberOfRows; i++) {
            let tableRow = document.createElement("tr");
            this.grid[i] = new Array(this.numberOfCols);

            for (let j = 0; j < this.numberOfCols; j++) {
                // Draw table cell
                let tableCell = document.createElement("td");
                tableRow.appendChild(tableCell);

                // Create CellModel and CellView
                let cellView = new CellView(tableCell);
                let cellModel = new CellModel(i, j, cellView);
                tableCell.addEventListener("click", function(event) {
                    selectCell(cellModel);
                });
            }

            tableRoot.appendChild(tableRow);
        }

        gridContainer.appendChild(tableRoot);
    }
}