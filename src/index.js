import "./normalize.css";
import "./styles.css";
import { Player } from "./classes/player";
import { render } from "./dom";

function initializeGame() {
    const player = new Player("human");
    const computer = new Player("computer");
    // Place random ships for both players
    player.placeRandomShip(5);
    player.placeRandomShip(4);
    player.placeRandomShip(3);
    computer.placeRandomShip(5);
    computer.placeRandomShip(4);
    computer.placeRandomShip(3);
    render(player, computer);
    render(computer, player);
    document.getElementById("restart").addEventListener("click", initializeGame);
}

document.addEventListener("DOMContentLoaded", () => {
    initializeGame();
});

// TO DO:
/* 4. - Computer ships are not invisible.
      - Write tests for player class. 
      - Render messages */

/* 5. Finish it up by implementing a system that allows players to place their ships. For example, you can let them type coordinates for each ship or have a button to cycle through random placements. */
