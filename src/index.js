import "./normalize.css";
import "./styles.css";
import { Player } from "./classes/player";
import { render } from "./dom";

// Example initialization
function initializeGame() {
    const player = new Player("human");
    const computer = new Player("computer");
    render(player, computer);
    render(computer, player);
    document.getElementById("restart").addEventListener("click", initializeGame);
}

document.addEventListener("DOMContentLoaded", () => {
    initializeGame();
});

// TO DO:

/* 5. Finish it up by implementing a system that allows players to place their ships. For example, you can let them type coordinates for each ship or have a button to cycle through random placements. */
