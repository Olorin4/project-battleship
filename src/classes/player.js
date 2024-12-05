/* 3. Create a Player class/factory.
 - There will be two types of players in the game, ‘real’ players and ‘computer’ players.
 - Each player object should contain its own gameboard. */

import { Gameboard } from "./gameboard";

export class Player {
    constructor(type = "human", size = 10) {
        if (!["human", "computer"].includes(type))
            throw new Error("Invalid player type. Must be 'human' or 'computer'.");
        this.type = type; // 'human' or 'computer'
        this.gameboard = new Gameboard(size); // Each player has their own gameboard
        this.attackLog = new Set(); // Tracks all coordinates attacked by this player
    }

    attack(opponent, coordinate = null) {
        if (this.type === "human") {
            if (this.attackLog.has(coordinate))
                throw new Error("This coordinate has already been attacked.");
            this.attackLog.add(coordinate);
            return opponent.gameboard.receivedAttackAt(coordinate);
        } else if (this.type === "computer") {
            const randomCoordinate = this.getRandomCoordinateOf(opponent.gameboard);
            this.attackLog.add(randomCoordinate);
            return opponent.gameboard.receivedAttackAt(randomCoordinate);
        }
    }

    getRandomCoordinateOf(gameboard) {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, gameboard.size);
        const row = alphabet[Math.floor(Math.random() * gameboard.size)]; // Random letter
        const column = Math.floor(Math.random() * gameboard.size) + 1; // Random number
        const coordinate = `${row}${column}`;
        // Ensure the coordinate is not already attacked or hit
        if (this.attackLog.has(coordinate)) return this.getRandomCoordinateOf(gameboard);
        return coordinate;
    }
}
