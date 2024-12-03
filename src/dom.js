// dom.js will handle rendering and user interaction.

function renderGameboard(gameboard, container) {
    // Set up the container as a grid
    container.style.display = "grid";
    container.style.gridTemplateColumns = `repeat(${gameboard.size}, 1fr)`;
    container.style.gridGap = "1px";
    // Iterate over the gameboard rows and columns
    gameboard.board.forEach((row) => {
        row.forEach((coordinate) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.coordinate = coordinate; // Store coordinate in a data attribute
            cell.textContent = coordinate; // Optional: Show the coordinate for debugging
            container.appendChild(cell);
        });
    });
}

function displayShipPlacements(gameboard, container, isPlayer = true) {
    if (!isPlayer) return; // Skip displaying ships for the computer's board
    gameboard.fleet.forEach((ship) => {
        ship.hull.forEach((coordinate) => {
            const cell = container.querySelector(`[data-coordinate="${coordinate}"]`);
            if (cell) {
                cell.classList.add("ship"); // Add the ship class for visualization
            }
        });
    });
}

function updateCell(container, coordinate, result) {
    const cell = container.querySelector(`[data-coordinate="${coordinate}"]`);
    if (cell) {
        cell.classList.add(result); // Adds "hit" or "miss"
    }
}

function resetBoards(playerContainer, computerContainer) {
    playerContainer.innerHTML = "";
    computerContainer.innerHTML = "";
}

export { renderGameboard, updateCell, resetBoards, displayShipPlacements };
