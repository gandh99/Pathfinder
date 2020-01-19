import CellState from "../cellstate.js";

export function dijkstra(adjacencyList, grid, numberOfRows, numberOfCols) {
    let sourceCell = getLocationOfCellState(grid, numberOfRows, numberOfCols, CellState.SOURCE);
    let destinationCell = getLocationOfCellState(grid, numberOfRows, numberOfCols, CellState.DESTINATION);
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