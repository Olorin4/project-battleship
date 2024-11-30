/* 3. Create a Player class/factory.
 - There will be two types of players in the game, ‘real’ players and ‘computer’ players.
 - Each player object should contain its own gameboard. */

import { Gameboard } from "./gameboard";

export class Player {
    constructor(type = "human") {
        if (!["human", "computer"].includes(type)) {
            throw new Error("Invalid player type. Must be 'human' or 'computer'.");
        }
        this.type = type; // 'human' or 'computer'
        this.gameboard = new Gameboard(); // Each player has their own gameboard
    }

    attack(opponent, coordinate = null) {
        if (this.type === "human") {
            if (!coordinate) {
                throw new Error("Human players must provide a coordinate for the attack.");
            }
            return opponent.gameboard.receiveAttack(coordinate);
        } else if (this.type === "computer") {
            const randomCoordinate = this.getRandomCoordinate(opponent.gameboard);
            return opponent.gameboard.receiveAttack(randomCoordinate);
        }
    }

    getRandomCoordinate(gameboard) {
        const alphabet = "ABCDEFGHIJ";
        const row = alphabet[Math.floor(Math.random() * 10)];
        const column = Math.floor(Math.random() * 10) + 1;
        const coordinate = `${row}${column}`;
        // Ensure the computer doesn't attack the same spot twice
        if (
            gameboard.missedShots.has(coordinate) ||
            gameboard.fleet.some(
                (ship) => ship.hull.includes(coordinate) && ship.totalHits.has(coordinate)
            )
        ) {
            return this.getRandomCoordinate(gameboard); // Recursively find a new coordinate
        }
        return coordinate;
    }
}
