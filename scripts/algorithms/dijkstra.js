import CellState from "../cellstate.js";

export function dijkstra(adjacencyList, grid, numberOfRows, numberOfCols) {
    let totalNumberOfCells = numberOfRows * numberOfCols;
    let sourceCell = getLocationOfCellState(grid, numberOfRows, numberOfCols, CellState.SOURCE);
    let destinationCell = getLocationOfCellState(grid, numberOfRows, numberOfCols, CellState.DESTINATION);
    let distanceMatrix = initDistanceMatrix(grid, numberOfRows, numberOfCols);
    let shortestPathSet = initShortestPathSet(grid, numberOfRows, numberOfCols);
    let previousArray = {};
    let visitedNodesInOrder = []; //test

    // Initialise distance from source
    distanceMatrix[sourceCell.getX][sourceCell.getY] = 0;

    for (let u = 0; u < totalNumberOfCells; u++) {
        // TODO: Fix bug where if the destination is surrounded by obstacles, minDistanceCell would be undefined
        let minDistanceCell = getMinimumDistanceCell(grid, distanceMatrix, shortestPathSet, numberOfRows, numberOfCols);
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
                animateDijkstra(previousArray, visitedNodesInOrder, sourceCell, destinationCell);
                return;
            }
        }
    }

    animateDijkstra(previousArray, visitedNodesInOrder, sourceCell, destinationCell);
}

function getLocationOfCellState(grid, numberOfRows, numberOfCols, cellstate) {
    for (let i = 0; i < numberOfRows; i++) {
        for (let j = 0; j < numberOfCols; j++) {
            if (grid[i][j].getCellState === cellstate) {
                return grid[i][j];
            }
        }
    }
}

function initDistanceMatrix(grid, numberOfRows, numberOfCols) {
    let distanceMatrix = new Array(numberOfRows);

    for (let i = 0; i < numberOfRows; i++) {
        distanceMatrix[i] = new Array(numberOfCols);

        for (let j = 0; j < numberOfCols; j++) {
            distanceMatrix[i][j] = Infinity;
        }
    }

    return distanceMatrix;
}

function initShortestPathSet(grid, numberOfRows, numberOfCols) {
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
function getMinimumDistanceCell(grid, distanceMatrix, shortestPathSet, numberOfRows, numberOfCols) {
    let shortestDistance = Infinity;
    let shortestDistanceCell;

    for (let i = 0; i < numberOfRows; i++) {
        for (let j = 0; j < numberOfCols; j++) {
            if (!shortestPathSet[i][j] && distanceMatrix[i][j] < shortestDistance) {
                shortestDistance = distanceMatrix[i][j];
                shortestDistanceCell = grid[i][j];
            }
        }
    }

    return shortestDistanceCell;
}

function animateDijkstra(previousArray, visitedNodesInOrder, sourceCell, destinationCell) {
    let delay = 1;
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
    });
}