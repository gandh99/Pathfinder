let gridContainer = document.getElementById("grid-container");
let tableRoot = document.createElement("table");
tableRoot.id = "grid-table";
let numberOfRows = 15;
let numberOfCols = 40;

createGrid();

function createGrid() {
    for (let i = 0; i < numberOfRows; i++) {
        let tableRow = document.createElement("tr");

        for (let j = 0; j < numberOfCols; j++) {
            let tableCell = document.createElement("td");
            tableRow.appendChild(tableCell);
        }

        tableRoot.appendChild(tableRow);
    }

    gridContainer.appendChild(tableRoot);
}
