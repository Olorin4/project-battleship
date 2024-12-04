import "./normalize.css";
import "./styles.css";
import { Player } from "./classes/player";
import { render, playerAttack, resetGame } from "./dom";

// Example initialization
function initializeGame() {
    const player = new Player("human");
    const computer = new Player("computer");
    const playerBoardContainer = document.getElementById("player-board");
    const computerBoardContainer = document.getElementById("computer-board");
    // Render both boards (only the opponent's board is interactive here)
    render(player.gameboard, playerBoardContainer);
    render(computer.gameboard, computerBoardContainer);
    // Setup event listeners for the opponent's board
    playerAttack(player, computer);
    // Optionally add event listener to restart button
    document.getElementById("restart").addEventListener("click", () => resetGame(player, computer));
}

document.addEventListener("DOMContentLoaded", () => {
    initializeGame();
});

// TO DO:

/* 4. Import your classes into another file, and drive the game using event listeners to interact with your objects. Create a module that helps you manage actions that should happen in the DOM.
- At this point it is appropriate to begin crafting your User Interface.
- Set up a new game by creating Players */

/* 5. Finish it up by implementing a system that allows players to place their ships. For example, you can let them type coordinates for each ship or have a button to cycle through random placements. */
