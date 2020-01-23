import CellModel from "./cellmodel.js";
import CellView from "./cellview.js";
import Graph from "./graph.js";
import { dijkstra } from "./algorithms/dijkstra.js";

export default class Grid {
    constructor(numberOfRows, numberOfCols) {
        this.numberOfRows = numberOfRows;
        this.numberOfCols = numberOfCols;
        this.cellModelMatrix = new Array(this.numberOfRows);
        this.tableCellMatrix = new Array(this.numberOfRows);
        this.adjacencyList;
        this.initGrid();
    }

    // Draw the 2D grid and assign click listeners
    initGrid() {
        let gridContainer = document.getElementById("grid-container");
        let tableRoot = document.createElement("table");
        tableRoot.id = "grid-table";

        for (let i = 0; i < this.numberOfRows; i++) {
            let tableRow = document.createElement("tr");
            this.cellModelMatrix[i] = new Array(this.numberOfCols);
            this.tableCellMatrix[i] = new Array(this.numberOfCols);

            for (let j = 0; j < this.numberOfCols; j++) {
                // Draw table cell
                let tableCell = document.createElement("td");
                tableRow.appendChild(tableCell);

                let cellView = new CellView(tableCell);
                let cellModel = new CellModel(i, j, cellView);
                this.cellModelMatrix[i][j] = cellModel;
                this.tableCellMatrix[i][j] = tableCell;
            }

            tableRoot.appendChild(tableRow);
        }

        gridContainer.appendChild(tableRoot);
    }

    initGraph() {
        let graph = new Graph(this.cellModelMatrix, this.numberOfRows, this.numberOfCols);
        this.adjacencyList = graph.getGraph;
    }

    startAnimation(animationButtonGroup) {
        this.animationButtonGroup = animationButtonGroup;
        this.initGraph();
        dijkstra(this.adjacencyList, this.cellModelMatrix, this.numberOfRows, this.numberOfCols, this);
    }

    endAnimation() {
        this.animationButtonGroup.animationFinished();
    }

    get getCellModelMatrix() {
        return this.cellModelMatrix;
    }

    get getTableCellMatrix() {
        return this.tableCellMatrix;
    }
}