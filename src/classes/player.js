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

    // Place ships randomly on the board
    placeRandomShip(shipSize, maxRetries = 10) {
        const randomCoordinates = this.generateRandomCoordinates(shipSize);
        if (this.validateShipPlacement(randomCoordinates)) {
            this.gameboard.placeShip(randomCoordinates); // Place the ship on the gameboard
        } else if (maxRetries > 0) {
            // Retry if invalid placement, decrement retries
            return this.placeRandomShip(shipSize, maxRetries - 1);
        } else {
            console.error("Failed to place ship after multiple attempts.");
            // Optionally, log or return an error if ship placement fails after retries
        }
    }

    // Helper to generate random ship coordinates
    generateRandomCoordinates(shipSize) {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, this.gameboard.size);
        const randomOrientation = Math.random() > 0.5 ? "horizontal" : "vertical";
        const randomRow = alphabet[Math.floor(Math.random() * this.gameboard.size)];
        const randomCol = Math.floor(Math.random() * this.gameboard.size) + 1;
        const coordinates = [];
        if (randomOrientation === "horizontal") {
            for (let i = 0; i < shipSize; i++) {
                const coordinate = `${randomRow}${randomCol + i}`;
                coordinates.push(coordinate);
            }
        } else {
            for (let i = 0; i < shipSize; i++) {
                const coordinate = `${alphabet[alphabet.indexOf(randomRow) + i]}${randomCol}`;
                coordinates.push(coordinate);
            }
        }
        return coordinates;
    }

    // Check if the coordinates are within bounds and not overlapping with other ships
    validateShipPlacement(coordinates) {
        for (const coordinate of coordinates) {
            const letter = coordinate[0];
            const number = parseInt(coordinate.slice(1), 10);
            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, this.gameboard.size);
            if (alphabet.indexOf(letter) === -1 || number < 1 || number > this.gameboard.size) {
                return false; // Out of bounds
            }
            // Check for overlap with existing ships
            for (const ship of this.gameboard.fleet) {
                if (ship.position.includes(coordinate)) {
                    return false; // Overlapping with an existing ship
                }
            }
        }
        return true; // All checks passed
    }
}
