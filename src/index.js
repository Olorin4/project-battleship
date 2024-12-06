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
/*  - Implement drag and drop to allow players to place their ships.
    - Create a 2-player option that lets users take turns by passing the laptop back and    forth, - or by spinning the monitor around on a desktop. Implement a ‘pass device’ screen so that players don’t see each other’s boards!
    - Polish the intelligence of the computer player by having it try adjacent slots after  getting a ‘hit’. 
*/
