import CellState from "../cellstate.js";
import { animate } from "../algorithmanimator.js";

export default class Dijkstra {
    constructor() {
    }

    run(grid, animationButtonGroup) {
        // Covnert grid into graph data
        grid.initGraph();
        let adjacencyList = grid.getAdjacencyList;
        let cellModelMatrix = grid.getCellModelMatrix;
        let numberOfRows = grid.getNumberOfRows;
        let numberOfCols = grid.getNumberOfCols;

        // Get source and destination cells
        let totalNumberOfCells = numberOfRows * numberOfCols;
        let sourceCell = this.getLocationOfCellState(cellModelMatrix, numberOfRows, numberOfCols, CellState.SOURCE);
        let destinationCell = this.getLocationOfCellState(cellModelMatrix, numberOfRows, numberOfCols, CellState.DESTINATION);
        if (sourceCell == null || destinationCell == null) {
            animationButtonGroup.endAnimation();
            return;
        }

        // Data for animation
        let distanceMatrix = this.initDistanceMatrix(numberOfRows, numberOfCols);
        let shortestPathSet = this.initShortestPathSet(numberOfRows, numberOfCols);
        let previousArray = {};
        let visitedNodesInOrder = [];

        // Initialise distance from source
        distanceMatrix[sourceCell.getX][sourceCell.getY] = 0;

        // Perform Dijkstra's algorithm
        for (let u = 0; u < totalNumberOfCells; u++) {
            let minDistanceCell = this.getMinimumDistanceCell(cellModelMatrix, distanceMatrix, shortestPathSet, numberOfRows, numberOfCols);
            if (minDistanceCell == null) {
                continue;
            }
            shortestPathSet[minDistanceCell.getX][minDistanceCell.getY] = true;

            // Iterate through the adjacency list (i.e. the neighbouring vertices of the minDistanceCell)
            for (let v = 0; v < adjacencyList[minDistanceCell.getKey].length; v++) {
                let neighbourCell = adjacencyList[minDistanceCell.getKey][v];
                let costToNeighbourCell = 1;

                // We will use this when calling animateDijkstra()
                visitedNodesInOrder.push(neighbourCell);

                // Update distanceMatrix if a shorter route was found to reach this current cell
                if (distanceMatrix[minDistanceCell.getX][minDistanceCell.getY] + costToNeighbourCell
                    < distanceMatrix[neighbourCell.getX][neighbourCell.getY]) {
                    distanceMatrix[neighbourCell.getX][neighbourCell.getY]
                        = distanceMatrix[minDistanceCell.getX][minDistanceCell.getY] + costToNeighbourCell;
                    previousArray[neighbourCell.getKey] = minDistanceCell;
                }

                // Stop if destination reached
                if (destinationCell == neighbourCell) {
                    this.animateDijkstra(previousArray, visitedNodesInOrder, sourceCell, destinationCell, animationButtonGroup);
                    return;
                }
            }
        }

        this.animateDijkstra(previousArray, visitedNodesInOrder, sourceCell, destinationCell, animationButtonGroup);
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

    initDistanceMatrix(numberOfRows, numberOfCols) {
        let distanceMatrix = new Array(numberOfRows);

        for (let i = 0; i < numberOfRows; i++) {
            distanceMatrix[i] = new Array(numberOfCols);

            for (let j = 0; j < numberOfCols; j++) {
                distanceMatrix[i][j] = Infinity;
            }
        }

        return distanceMatrix;
    }

    initShortestPathSet(numberOfRows, numberOfCols) {
        let shortestPathSet = new Array(numberOfRows);

        for (let i = 0; i < numberOfRows; i++) {
            shortestPathSet[i] = new Array(numberOfCols);

            for (let j = 0; j < numberOfCols; j++) {
                shortestPathSet[i][j] = false;
            }
        }

        return shortestPathSet;
    }

    /* Returns the CellModel whose corresponding value in the distanceMatrix is the smallest */
    getMinimumDistanceCell(cellModelMatrix, distanceMatrix, shortestPathSet, numberOfRows, numberOfCols) {
        let shortestDistance = Infinity;
        let shortestDistanceCell;

        for (let i = 0; i < numberOfRows; i++) {
            for (let j = 0; j < numberOfCols; j++) {
                if (!shortestPathSet[i][j] && distanceMatrix[i][j] < shortestDistance) {
                    shortestDistance = distanceMatrix[i][j];
                    shortestDistanceCell = cellModelMatrix[i][j];
                }
            }
        }

        return shortestDistanceCell;
    }

    animateDijkstra(previousArray, visitedNodesInOrder, sourceCell, destinationCell, animationButtonGroup) {
        let shortestPathArray = this.getShortestPathArray(previousArray, sourceCell, destinationCell);
        animate(visitedNodesInOrder, shortestPathArray, sourceCell, destinationCell, animationButtonGroup);
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