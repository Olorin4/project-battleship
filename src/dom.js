// dom.js will handle rendering and user interaction.

function render(gameboard, container) {
    container.innerHTML = ""; // Clear the board
    // Render cells
    gameboard.board.forEach((row) => {
        row.forEach((coordinate) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.coordinate = coordinate; // Store coordinate in a data attribute
            container.appendChild(cell);
        });
    });
}

function playerAttack(player, opponent) {
    const playerBoard = document.getElementById("player-board");
    playerBoard.addEventListener("click", (event) => {
        const cell = event.target;
        // Ensure clicks only affect valid cells
        if (cell.classList.contains("cell")) {
            const coordinate = cell.dataset.coordinate;
            try {
                // Player attacks opponent
                const result = player.attack(opponent, coordinate);
                // Update the UI based on the attack result
                cell.classList.add(result);
                // Check if the game is over
                if (opponent.gameboard.fleetSunk()) alert(`${player.type} wins!`);
                else computerAttack(opponent, player);
            } catch (error) {
                // Handle errors from the `player.attack` method
                alert(error.message);
            }
        }
    });
}

function computerAttack(computer, opponent) {
    // Simulate computer attack
    const coordinate = computer.getRandomCoordinateOf(opponent.gameboard);
    const result = computer.attack(opponent, coordinate);
    // Find and update the corresponding cell in the DOM
    const playerBoard = document.getElementById("player-board");
    const cell = [...playerBoard.querySelectorAll(".cell")].find(
        (cell) => cell.dataset.coordinate === coordinate
    );
    cell.classList.add(result);
    // Check if the game is over
    if (opponent.gameboard.fleetSunk()) alert(`${computer.type} wins!`);
}

function resetGame(player, opponent) {
    const playerBoard = document.getElementById("player-board");
    const computerBoard = document.getElementById("computer-board");
    // Remove previous event listeners
    playerBoard.innerHTML = "";
    computerBoard.innerHTML = "";
    // Re-render gameboards with new listeners
    render(player.gameboard, playerBoard);
    render(opponent.gameboard, computerBoard);
    // Attach the player attack event listener again
    playerAttack(player, opponent);
    // Optionally, reset game state variables
    // For example, reset the attack logs, hit/miss counts, etc.
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

export { render, playerAttack, resetGame };
