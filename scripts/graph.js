import CellState from "./cellstate.js";

export default class Graph {
    constructor(grid, numberOfRows, numberOfCols) {
        this.grid = grid;
        this.numberOfRows = numberOfRows;
        this.numberOfCols = numberOfCols;
        this.adjacencyList = {};
        this.createGraph();
    }

    createGraph() {
        for (let i = 0; i < this.numberOfRows; i++) {
            for (let j = 0; j < this.numberOfCols; j++) {
                this.addVertex(this.grid[i][j].getKey);
                let edges = this.getEdges(i, j);
                edges.forEach(edge => { this.addEdge(this.grid[i][j].getKey, edge); });
            }
        }
    }

    // The key to the adjacency list needs to be serializable
    addVertex(vertex) {
        this.adjacencyList[vertex] = [];
    }

    addEdge(sourceVertex, destinationVertex) {
        this.adjacencyList[sourceVertex].push(destinationVertex);
    }

    getEdges(x, y) {
        let edges = [];
        if (this.isWithinBounds(x - 1, y) && this.grid[x - 1][y].getCellState != CellState.OBSTACLE) { edges.push(this.grid[x - 1][y]); }
        if (this.isWithinBounds(x, y - 1) && this.grid[x][y - 1].getCellState != CellState.OBSTACLE) { edges.push(this.grid[x][y - 1]); }
        if (this.isWithinBounds(x + 1, y) && this.grid[x + 1][y].getCellState != CellState.OBSTACLE) { edges.push(this.grid[x + 1][y]); }
        if (this.isWithinBounds(x, y + 1) && this.grid[x][y + 1].getCellState != CellState.OBSTACLE) { edges.push(this.grid[x][y + 1]); }

        return edges;
    }

    isWithinBounds(x, y) {
        return (x >= 0 && x < this.numberOfRows && y >= 0 && y < this.numberOfCols);
    }

    get getGraph() {
        return this.adjacencyList;
    }
}