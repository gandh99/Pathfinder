import Cell from "./Cell.js";

export default class Grid {
    constructor(numberOfRows, numberOfCols) {
        this.grid;
        this.numberOfRows = numberOfRows;
        this.numberOfCols = numberOfCols;
        this.initGrid();
        this.populateGrid();
    }

    // Make a 2D array and store in grid
    initGrid() {
        this.grid = new Array(this.numberOfRows);
        for (let i = 0; i < this.grid.length; i++) {
            this.grid[i] = new Array(this.numberOfCols);
        }

        return this.grid;
    }

    // Draw the 2D grid and assign click listeners
    populateGrid() {
        let gridContainer = document.getElementById("grid-container");
        let tableRoot = document.createElement("table");
        tableRoot.id = "grid-table";
        
        for (let i = 0; i < this.numberOfRows; i++) {
            let tableRow = document.createElement("tr");

            for (let j = 0; j < this.numberOfCols; j++) {
                let tableCell = document.createElement("td");
                tableRow.appendChild(tableCell);
                this.grid[i][j] = new Cell(i, j);
            }

            tableRoot.appendChild(tableRow);
        }

        gridContainer.appendChild(tableRoot);
    }
}