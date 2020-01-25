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
            let delay = 50;
            let i = 0;
            var interval = setInterval(() => {
                if (!shortestPathArray[i + 1]) clearInterval(interval);
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