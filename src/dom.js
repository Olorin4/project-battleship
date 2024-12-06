// dom.js will handle rendering and user interaction.

export function render(player, opponent) {
    const board = document.getElementById(`${player.type}-board`);
    board.innerHTML = ""; // Clear the board
    // Create gameboard cells
    player.gameboard.board.forEach((row) => {
        row.forEach((coordinate) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.coordinate = coordinate; // Store coordinate in a data attribute
            board.appendChild(cell);
            // Check if the cell is part of a ship
            player.gameboard.fleet.forEach((ship) => {
                if (ship.position.includes(coordinate)) cell.classList.add("ship");
            });
            if (player.type === "computer") {
                cell.classList.remove("ship");
                cell.addEventListener("click", (event) => {
                    playerAttack(opponent, player, event.target);
                });
            }
        });
    });
}

function playerAttack(player, opponent, cell) {
    try {
        const { coordinate, result } = player.attack(opponent, cell.dataset.coordinate);
        renderMessage(`${player.type} attacks ${coordinate}: ${result}`);
        // Update the UI based on the attack result
        cell.classList.add(result);
        if (opponent.gameboard.fleetSunk())
            renderMessage("Congratulations! You sunk all enemy ships!");
        else computerAttack(opponent, player);
    } catch (error) {
        // Handle errors from the `player.attack` method
        renderMessage(error.message);
    }
}

function computerAttack(computer, player) {
    // Simulate computer attack
    const { coordinate, result } = computer.attack(player);
    renderMessage(`${computer.type} attacks ${coordinate}: ${result}`);
    // Find and update the corresponding cell in the player's board
    const playerBoard = document.getElementById("human-board");
    const cell = [...playerBoard.querySelectorAll(".cell")].find(
        (cell) => cell.dataset.coordinate === coordinate
    );
    cell.classList.add(result);
    // Check if the game is over
    if (player.gameboard.fleetSunk()) renderMessage("Defeat! Your fleet is sunk!");
}

function renderMessage(message) {
    const messageDiv = document.getElementById("message");
    const newMessage = document.createElement("p");
    newMessage.textContent = message;
    messageDiv.appendChild(newMessage);
    // If there are more than two messages, remove the oldest one
    const messages = messageDiv.getElementsByTagName("p");
    if (messages.length > 2) {
        messageDiv.removeChild(messages[0]); // Remove the first (oldest) message
    }
}
