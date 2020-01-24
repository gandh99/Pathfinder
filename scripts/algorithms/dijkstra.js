import CellState from "../cellstate.js";

export default class Dijkstra {
    constructor() {
    }

    run(grid, animationButtonGroup) {
        grid.initGraph();
        let adjacencyList = grid.getAdjacencyList;
        let cellModelMatrix = grid.getCellModelMatrix;
        let numberOfRows = grid.getNumberOfRows;
        let numberOfCols = grid.getNumberOfCols;

        let totalNumberOfCells = numberOfRows * numberOfCols;
        let sourceCell = this.getLocationOfCellState(cellModelMatrix, numberOfRows, numberOfCols, CellState.SOURCE);
        let destinationCell = this.getLocationOfCellState(cellModelMatrix, numberOfRows, numberOfCols, CellState.DESTINATION);
        if (sourceCell == null || destinationCell == null) {
            animationButtonGroup.endAnimation();
            return;
        }

        let distanceMatrix = this.initDistanceMatrix(numberOfRows, numberOfCols);
        let shortestPathSet = this.initShortestPathSet(numberOfRows, numberOfCols);
        let previousArray = {};
        let visitedNodesInOrder = []; //test

        // Initialise distance from source
        distanceMatrix[sourceCell.getX][sourceCell.getY] = 0;

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
        let delay = 2;
        new Promise((resolve, reject) => {
            for (let i = 0; i < visitedNodesInOrder.length; i++) {
                setTimeout(() => {
                    if (visitedNodesInOrder[i] != sourceCell && visitedNodesInOrder[i] != destinationCell) {
                        visitedNodesInOrder[i].updateCellState(CellState.VISITED);
                    }
                }, i * delay);
            }
            resolve(visitedNodesInOrder.length * delay);
        }).then((totalPriorDelay) => {
            setTimeout(() => {
                let currentCell = previousArray[destinationCell.getKey];
                while (currentCell != sourceCell) {
                    currentCell.updateCellState(CellState.SHORTEST_PATH);
                    currentCell = previousArray[currentCell.getKey];
                }
            }, totalPriorDelay);
            return totalPriorDelay;
        }).then((totalPriorDelay) => {
            setTimeout(() => {
                animationButtonGroup.endAnimation();
            }, totalPriorDelay);
        });
    }
}