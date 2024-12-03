// app.js ties everything together, driving the game flow using the DOM module.
import "./normalize.css";
import "./styles.css";
import { renderGameboard, updateCell, resetBoards } from "./dom";
import { Player } from "./classes/player";

function setupGame() {
    // Create players
    const player = new Player("human");
    const computer = new Player("computer");
    // Place ships on both gameboards
    // For simplicity, use predefined ship placements
    const playerShipCoordinates = [
        ["A1", "A2", "A3"], // Example: A battleship
        ["B4", "B5"], // Example: A cruiser
        ["D7", "E7", "F7"], // Another battleship
    ];
    const computerShipCoordinates = [
        ["C1", "C2", "C3"], // Example: A battleship
        ["G4", "G5"], // Example: A cruiser
        ["I8", "I9", "I10"], // Another battleship
    ];
    playerShipCoordinates.forEach((coordinates) => {
        player.gameboard.placeShip(coordinates);
    });
    computerShipCoordinates.forEach((coordinates) => {
        computer.gameboard.placeShip(coordinates);
    });
    return { player, computer };
}

function handlePlayerAttack(event, player, computer, container) {
    const cell = event.target;
    const coordinate = cell.dataset.coordinate;
    if (!coordinate || cell.classList.contains("hit") || cell.classList.contains("miss")) {
        return;
    }
    const result = player.attack(computer, coordinate);
    updateCell(container, coordinate, result);
    if (checkGameOver(computer, "You won!")) return;
    handleComputerAttack(computer, player, container);
}

function handleComputerAttack(computer, player, container) {
    const result = computer.attack(player);
    updateCell(container, result.coordinate, result.outcome);
    checkGameOver(player, "Computer won!");
}

function checkGameOver(player, message) {
    if (player.gameboard.fleetSunk()) {
        alert(message);
        resetGame();
        return true;
    }
    return false;
}

function resetGame() {
    const playerContainer = document.getElementById("player-board");
    const computerContainer = document.getElementById("computer-board");
    resetBoards(playerContainer, computerContainer);
    initializeGame();
}

function initializeGame() {
    const { player, computer } = setupGame();
    const playerContainer = document.getElementById("player-board");
    const computerContainer = document.getElementById("computer-board");
    renderGameboard(player.gameboard, playerContainer);
    renderGameboard(computer.gameboard, computerContainer);
    computerContainer.addEventListener("click", (event) =>
        handlePlayerAttack(event, player, computer, computerContainer)
    );
}

document.addEventListener("DOMContentLoaded", () => {
    initializeGame();
});
