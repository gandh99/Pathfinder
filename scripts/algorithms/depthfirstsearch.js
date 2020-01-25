import CellState from "../cellstate.js";
import { animate } from "../algorithmanimator.js";

export default class DepthFirstSearch {
    constructor() {

    }

    run(grid, animationButtonGroup) {
        // Covnert grid into graph data
        grid.initGraph();
        this.adjacencyList = grid.getAdjacencyList;
        this.cellModelMatrix = grid.getCellModelMatrix;
        this.numberOfRows = grid.getNumberOfRows;
        this.numberOfCols = grid.getNumberOfCols;

        // Get source and destination cells
        this.sourceCell = this.getLocationOfCellState(this.cellModelMatrix, this.numberOfRows, this.numberOfCols, CellState.SOURCE);
        this.destinationCell = this.getLocationOfCellState(this.cellModelMatrix, this.numberOfRows, this.numberOfCols, CellState.DESTINATION);
        if (this.sourceCell == null || this.destinationCell == null) {
            animationButtonGroup.endAnimation();
            return;
        }

        this.visitedCellMatrix = this.initVisitedCellMatrix(this.numberOfRows, this.numberOfCols);

        // Data for animation
        this.visitedNodesInOrder = [];
        this.shortestPathArray = [];
        this.destinationReached = false;

        // Run the search
        this.depthFirstSearch(this.sourceCell);

        // Animate
        animate(this.visitedNodesInOrder, this.shortestPathArray, this.sourceCell, this.destinationCell, animationButtonGroup);
    }

    initVisitedCellMatrix(numberOfRows, numberOfCols) {
        let visitedCellMatrix = new Array(numberOfRows);
        for (let i = 0; i < numberOfCols; i++) {
            visitedCellMatrix[i] = new Array(numberOfCols);
        }

        for (let i = 0; i < numberOfRows; i++) {
            for (let j = 0; j < numberOfCols; j++) {
                visitedCellMatrix[i][j] = false;
            }
        }

        // Mark source cell as visited
        visitedCellMatrix[this.sourceCell.getX][this.sourceCell.getY] = true;

        return visitedCellMatrix;
    }

    getLocationOfCellState(cellModelMatrix, numberOfRows, numberOfCols, cellstate) {
        for (let i = 0; i < numberOfRows; i++) {
            for (let j = 0; j < numberOfCols; j++) {
                if (cellModelMatrix[i][j].getCellState === cellstate) {
                    return cellModelMatrix[i][j];
                }
            }
        }
    }

    depthFirstSearch(currentCell) {
        if (this.destinationReached || currentCell == this.destinationCell) {
            this.destinationReached = true;
            return;
        }

        this.visitedNodesInOrder.push(currentCell);
        for (let v = 0; v < this.adjacencyList[currentCell.getKey].length; v++) {
            let neighbourCell = this.adjacencyList[currentCell.getKey][v];
            if (!this.destinationReached && !this.visitedCellMatrix[neighbourCell.getX][neighbourCell.getY]) {
                if (neighbourCell != this.destinationCell) {
                    // We don't want the destination cell to be part of the shortest path array
                    this.shortestPathArray.push(neighbourCell);
                }
                this.visitedCellMatrix[neighbourCell.getX][neighbourCell.getY] = true;
                this.depthFirstSearch(neighbourCell);
            }
        }

        if (!this.destinationReached) {
            this.shortestPathArray.pop();
        }
    }
}