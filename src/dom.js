// dom.js will handle rendering and user interaction.

function render(player, opponent) {
    const board = document.getElementById(`${player.type}-board`);
    board.innerHTML = ""; // Clear the board
    // Create gameboard cells
    player.gameboard.board.forEach((row) => {
        row.forEach((coordinate) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.coordinate = coordinate; // Store coordinate in a data attribute
            board.appendChild(cell);
            if (player.type === "computer") {
                cell.addEventListener("click", (event) => {
                    const clickedCell = event.target;
                    if (clickedCell.classList.contains("cell")) {
                        playerAttack(player, opponent, clickedCell);
                    }
                });
            }
        });
    });
}

function playerAttack(player, opponent, cell) {
    // Ensure clicks only affect valid cells
    if (cell.classList.contains("cell")) {
        try {
            const result = player.attack(opponent, cell.dataset.coordinate);
            // Update the UI based on the attack result
            cell.classList.add(result);
            if (opponent.gameboard.fleetSunk()) alert(`${player.type} wins!`);
            else computerAttack(opponent, player);
        } catch (error) {
            // Handle errors from the `player.attack` method
            alert(error.message);
        }
    }
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

function randomPlacement(gameboard, shipSizes) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, gameboard.size);
    shipSizes.forEach((size) => {
        let placed = false;
        while (!placed) {
            const startRow = Math.floor(Math.random() * gameboard.size);
            const startCol = Math.floor(Math.random() * gameboard.size);
            const isHorizontal = Math.random() > 0.5;
            const coordinates = [];
            for (let i = 0; i < size; i++) {
                const row = isHorizontal ? startRow : startRow + i;
                const col = isHorizontal ? startCol + i : startCol;
                if (row >= gameboard.size || col >= gameboard.size) break;
                coordinates.push(`${alphabet[row]}${col + 1}`);
            }
            if (
                coordinates.length === size &&
                !gameboard.fleet.some((ship) =>
                    ship.hull.some((coord) => coordinates.includes(coord))
                )
            ) {
                gameboard.placeShip(coordinates);
                placed = true;
            }
        }
    });
}

export { render, playerAttack };
