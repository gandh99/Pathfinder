import CellState from "../cellstate.js";

export default class DepthFirst {
    constructor() {

    }

    run(grid, animationButtonGroup) {
        grid.initGraph();
        this.adjacencyList = grid.getAdjacencyList;
        let cellModelMatrix = grid.getCellModelMatrix;
        let numberOfRows = grid.getNumberOfRows;
        let numberOfCols = grid.getNumberOfCols;
        this.initVisitedCellMatrix(numberOfRows, numberOfCols);

        let totalNumberOfCells = numberOfRows * numberOfCols;
        this.sourceCell = this.getLocationOfCellState(cellModelMatrix, numberOfRows, numberOfCols, CellState.SOURCE);
        this.destinationCell = this.getLocationOfCellState(cellModelMatrix, numberOfRows, numberOfCols, CellState.DESTINATION);
        if (this.sourceCell == null || this.destinationCell == null) {
            animationButtonGroup.endAnimation();
            return;
        }

        this.visitedNodesInOrder = [];
        this.destinationReached = false;
        this.depthFirst(this.sourceCell);
        this.animateDepthFirst(this.visitedNodesInOrder, this.sourceCell, this.destinationCell, animationButtonGroup);
    }

    initVisitedCellMatrix(numberOfRows, numberOfCols) {
        this.visitedCellMatrix = new Array(numberOfRows);
        for (let i = 0; i < numberOfCols; i++) {
            this.visitedCellMatrix[i] = new Array(numberOfCols);
        }

        for (let i = 0; i < numberOfRows; i++) {
            for (let j = 0; j < numberOfCols; j++) {
                this.visitedCellMatrix[i][j] = false;
            }
        }
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

    depthFirst(currentCell) {
        if (this.destinationReached || currentCell == this.destinationCell) {
            this.destinationReached = true;
            return;
        }
        
        this.visitedNodesInOrder.push(currentCell);
        for (let v = 0; v < this.adjacencyList[currentCell.getKey].length; v++) {
            let neighbourCell = this.adjacencyList[currentCell.getKey][v];
            if (!this.visitedCellMatrix[neighbourCell.getX][neighbourCell.getY]) {
                this.visitedCellMatrix[neighbourCell.getX][neighbourCell.getY] = true;
                this.depthFirst(neighbourCell);
            }
        }
    }

    animateDepthFirst(visitedNodesInOrder, sourceCell, destinationCell, animationButtonGroup) {
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
            // setTimeout(() => {
            //     let currentCell = previousArray[destinationCell.getKey];
            //     while (currentCell != sourceCell) {
            //         currentCell.updateCellState(CellState.SHORTEST_PATH);
            //         currentCell = previousArray[currentCell.getKey];
            //     }
            // }, totalPriorDelay);
            return totalPriorDelay;
        }).then((totalPriorDelay) => {
            setTimeout(() => {
                animationButtonGroup.endAnimation();
            }, totalPriorDelay);
        });

    }
}