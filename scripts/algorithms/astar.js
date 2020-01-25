import CellState from "../cellstate.js";
import { animate } from "../algorithmanimator.js";

export default class AStar {
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

        this.fScoreCellMatrix = this.initFScoreCellMatrix(this.numberOfRows, this.numberOfCols);
        this.gScoreCellMatrix = this.initGScoreCellMatrix(this.numberOfRows, this.numberOfCols);

        // Data for animation
        this.visitedNodesInOrder = [];
        this.previousArray = {};

        // Run the search
        this.astarSearch();
        this.shortestPathArray = this.getShortestPathArray(this.previousArray, this.sourceCell, this.destinationCell);

        // Animate
        animate(this.visitedNodesInOrder, this.shortestPathArray, this.sourceCell, this.destinationCell, animationButtonGroup);
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

    initFScoreCellMatrix(numberOfRows, numberOfCols) {
        let fScoreCellMatrix = new Array(numberOfRows);
        for (let i = 0; i < numberOfCols; i++) {
            fScoreCellMatrix[i] = new Array(numberOfCols);
        }

        for (let i = 0; i < numberOfRows; i++) {
            for (let j = 0; j < numberOfCols; j++) {
                fScoreCellMatrix[i][j] = Infinity;
            }
        }

        return fScoreCellMatrix;
    }

    initGScoreCellMatrix(numberOfRows, numberOfCols) {
        let gScoreCellMatrix = new Array(numberOfRows);
        for (let i = 0; i < numberOfCols; i++) {
            gScoreCellMatrix[i] = new Array(numberOfCols);
        }

        for (let i = 0; i < numberOfRows; i++) {
            for (let j = 0; j < numberOfCols; j++) {
                gScoreCellMatrix[i][j] = Infinity;
            }
        }

        // Source cell has g score of 0
        gScoreCellMatrix[this.sourceCell.getX][this.sourceCell.getY] = 0;

        return gScoreCellMatrix;
    }

    astarSearch() {
        let openList = {};
        let closedList = {};

        // Initialise open list by adding the starting cell
        openList[this.sourceCell.getKey] = this.sourceCell;

        while (openList.length != 0) {
            // Get cell with lowest f value
            let selectedCell = this.getCellModelWithLowestFScore(openList);

            // Mark cell as visited
            this.visitedNodesInOrder.push(selectedCell);

            // Transfer selectedCell from openList to closed list
            delete openList[selectedCell.getKey];
            closedList[selectedCell.getKey] = selectedCell;

            // Check if destination is reached
            if (selectedCell == this.destinationCell) {
                break;
            }

            // Iterate through the neighbours
            for (let v = 0; v < this.adjacencyList[selectedCell.getKey].length; v++) {
                let neighbourCell = this.adjacencyList[selectedCell.getKey][v];

                // If neighbour is in closed list, continue
                if (closedList[neighbourCell.getKey]) {
                    continue;
                }

                // Create the f, g and h values
                let neighbourCellGScore = this.getGScore(selectedCell, neighbourCell);
                let neighbourCellHScore = this.getHScore(neighbourCell);
                this.fScoreCellMatrix[neighbourCell.getX][neighbourCell.getY] =
                    neighbourCellGScore + neighbourCellHScore;

                // If neighbour is in open list, and its g score in the open list is lower, do not proceed. 
                if (openList[neighbourCell.getKey]
                    && neighbourCellGScore > this.gScoreCellMatrix[neighbourCell.getX][neighbourCell.getY]) {
                    continue;
                } else {
                    // Update g score matrix
                    this.gScoreCellMatrix[neighbourCell.getX][neighbourCell.getY] = neighbourCellGScore;
                }

                // Add neighbour to open list
                openList[neighbourCell.getKey] = neighbourCell;
                this.previousArray[neighbourCell.getKey] = selectedCell;
            }
        }
    }

    getCellModelWithLowestFScore(openList) {
        let cellModelWithLowestFScore;
        let lowestFScore = Infinity;

        for (let key in openList) {
            let currentCell = openList[key];
            let currentCellFScore = this.fScoreCellMatrix[currentCell.getX][currentCell.getY];
            if (currentCellFScore <= lowestFScore) {
                cellModelWithLowestFScore = currentCell;
                lowestFScore = currentCellFScore;
            }
        }

        return cellModelWithLowestFScore;
    }

    getGScore(selectedCell, neighbourCell) {
        // g = selectedCell.g + distance between neighbourCell and selectedCell
        let gScore =
            this.gScoreCellMatrix[selectedCell.getX][selectedCell.getY]
            + Math.abs(selectedCell.getX - neighbourCell.getX)
            + Math.abs(selectedCell.getY - neighbourCell.getY);

        return gScore;
    }

    getHScore(neighbourCell) {
        // h score calculated using Manhattan distance
        return Math.abs(this.destinationCell.getX - neighbourCell.getX)
            + Math.abs(this.destinationCell.getY - neighbourCell.getY);
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