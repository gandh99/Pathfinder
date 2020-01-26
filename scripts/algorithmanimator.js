import CellState from "./cellstate.js";

export function animate(visitedNodesInOrder, shortestPathArray, sourceCell, destinationCell, animationButtonGroup) {
    new Promise((resolve, reject) => {
        // Visualise the visited nodes in order
        let delay = 2;
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            setTimeout(() => {
                if (visitedNodesInOrder[i] != sourceCell && visitedNodesInOrder[i] != destinationCell) {
                    visitedNodesInOrder[i].updateCellState(CellState.VISITED);
                }
            }, i * delay);
        }
        resolve(visitedNodesInOrder.length * delay);
    }).then((totalPriorDelay) => {
        // Visualise the shortest path
        setTimeout(() => {
            // Animation parameters
            let delay = 50;
            let i = 0;

            // First mark the source cell
            sourceCell.updateCellState(CellState.SOURCE_VISITED);

            // Mark the shortest path
            var interval = setInterval(() => {
                if (!shortestPathArray[i + 1]) {
                    // At the end of the animation, mark the destination cell
                    destinationCell.updateCellState(CellState.DESTINATION_VISITED);
                    clearInterval(interval);
                }
                let currentCell = shortestPathArray[i++];
                currentCell.updateCellState(CellState.SHORTEST_PATH);
            }, delay);
        }, totalPriorDelay);
        return totalPriorDelay;
    }).then((totalPriorDelay) => {
        setTimeout(() => {
            animationButtonGroup.endAnimation();
        }, totalPriorDelay);
    });
}