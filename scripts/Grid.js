import CellModel from "./cellmodel.js";
import CellView from "./cellview.js";
import Graph from "./graph.js";
import { selectCell } from "./controllers.js";
import { dijkstra } from "./algorithms/dijkstra.js";

export default class Grid {
    constructor(numberOfRows, numberOfCols) {
        this.numberOfRows = numberOfRows;
        this.numberOfCols = numberOfCols;
        this.grid = new Array(this.numberOfRows);
        this.adjacencyList;
        this.initGrid();
        this.initGraph();
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
                this.grid[i][j] = cellModel;

                // Add event listeners to the table cell
                tableCell.addEventListener("mousedown", function (event) {
                    selectCell(cellModel);
                });
                tableCell.addEventListener("mouseenter", function (event) {
                    selectCell(cellModel);
                });
                tableCell.addEventListener("mouseup", function (event) {
                    getEventListeners().click.forEach((e) => { e.remove(); console.log(e); })
                });
            }

            tableRoot.appendChild(tableRow);
        }

        gridContainer.appendChild(tableRoot);
    }

    initGraph() {
        let graph = new Graph(this.grid, this.numberOfRows, this.numberOfCols);
        this.adjacencyList = graph.getGraph;
    }

    startAnimation() {
        dijkstra(this.adjacencyList, this.grid, this.numberOfRows, this.numberOfCols);
    }
}