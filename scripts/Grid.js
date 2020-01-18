import Cell from "./Cell.js";
import {getClassOfActiveButton} from "./utilityBar.js";

export default class Grid {
    constructor(numberOfRows, numberOfCols) {
        this.grid;
        this.numberOfRows = numberOfRows;
        this.numberOfCols = numberOfCols;
        this.initGrid();
    }

    // Draw the 2D grid and assign click listeners
    initGrid() {
        let gridContainer = document.getElementById("grid-container");
        let tableRoot = document.createElement("table");
        tableRoot.id = "grid-table";
        this.grid = new Array(this.numberOfRows);

        for (let i = 0; i < this.numberOfRows; i++) {
            let tableRow = document.createElement("tr");
            this.grid[i] = new Array(this.numberOfCols);

            for (let j = 0; j < this.numberOfCols; j++) {
                // Draw table cell
                let tableCell = document.createElement("td");
                tableRow.appendChild(tableCell);

                // Assign functionality to table cell
                this.grid[i][j] = new Cell(i, j);
                tableCell.addEventListener("click", this.selectCell);
            }

            tableRoot.appendChild(tableRow);
        }

        gridContainer.appendChild(tableRoot);
    }

    selectCell() {
        this.className = "";
        this.classList.add(getClassOfActiveButton());
    }
}