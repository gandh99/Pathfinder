import CellState from "../cellstate.js";
import { animate } from "../algorithmanimator.js";

export default class BreadthFirstSearch {
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
        this.previousArray = {};

        // Run the search
        this.breadthFirstSearch(this.sourceCell, this.destinationCell);
        this.shortestPathArray = this.getShortestPathArray(this.previousArray, this.sourceCell, this.destinationCell);

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

    breadthFirstSearch(sourceCell, destinationCell) {
        let queue = [];
        queue.push(sourceCell);

        while (queue.length != 0) {
            let currentCell = queue.shift();
            this.visitedNodesInOrder.push(currentCell);
            this.visitedCellMatrix[currentCell.getX][currentCell.getY] = true;

            if (currentCell == destinationCell) {
                break;
            }

            for (let v = 0; v < this.adjacencyList[currentCell.getKey].length; v++) {
                let neighbourCell = this.adjacencyList[currentCell.getKey][v];
                if (!this.visitedCellMatrix[neighbourCell.getX][neighbourCell.getY]) {
                    this.visitedCellMatrix[neighbourCell.getX][neighbourCell.getY] = true;
                    this.previousArray[neighbourCell.getKey] = currentCell;
                    queue.push(neighbourCell);
                }
            }
        }
    }

    getShortestPathArray(previousArray, sourceCell, destinationCell) {
        // First convert to stack, where the top is the earlier cells in the path
        let stack = [];
        let currentCell = previousArray[destinationCell.getKey];
        while (currentCell != sourceCell) {
            stack.push(currentCell);
            currentCell = previousArray[currentCell.getKey];
        }

        // Then convert to an array, where smaller indices are the earleir cells in the path
        let shortestPathArray = [];
        while (stack.length != 0) {
            shortestPathArray.push(stack.pop());
        }

        return shortestPathArray;
    }

}