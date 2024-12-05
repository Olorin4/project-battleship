/* 2. Create a Gameboard class.
- Gameboards should be able to place ships at specific coordinates by calling the ship class.
- Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
- Gameboards should keep track of missed attacks so they can display them properly. */

import { Ship } from "./ship";

export class Gameboard {
    constructor(size) {
        this.size = size;
        this.fleet = []; // Array of Ship objects with their positions
        this.missedShots = new Set(); // Set of missed attack coordinates
        this.board = this.createBoard();
    }

    // Method to create a grid of a given size (e.g., 10x10 or 12x12)
    createBoard() {
        const board = [];
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, this.size);
        for (let row = 0; row < this.size; row++) {
            const rowData = [];
            for (let col = 1; col <= this.size; col++) {
                const coordinate = `${alphabet[row]}${col}`; // Generate coordinates like A1, B2, C10, etc.
                rowData.push(coordinate);
            }
            board.push(rowData);
        }
        return board;
    }

    // Method to receive an attack at a coordinate
    receivedAttackAt(coordinate) {
        this.validate(coordinate);
        // Check if any ship occupies the attacked coordinate
        for (const ship of this.fleet) {
            if (ship.position.includes(coordinate)) {
                ship.hitAt(coordinate); // Mark the hit on the correct ship
                return "hit";
            }
        }
        // If no ship was hit, record the missed shot
        this.missedShots.add(coordinate);
        return "miss";
    }

    // Method to check if all ships are sunk
    fleetSunk() {
        return this.fleet.every((ship) => ship.isSunk());
    }

    // Method to place a ship on the board (given an array of coordinates)
    placeShip(coordinates) {
        coordinates.forEach(this.validate.bind(this));
        const newShip = new Ship(coordinates);
        this.fleet.push(newShip);
        return newShip;
    }

    // Helper method to validate coordinates
    validate(coordinate) {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, this.size);
        const letter = coordinate[0].toUpperCase();
        const number = parseInt(coordinate.slice(1), 10);
        // Ensure the letter is within the valid range (e.g., A-J for 10x10)
        if (alphabet.indexOf(letter) === -1 || number < 1 || number > this.size) {
            throw new Error("Invalid coordinate");
        }
        return;
    }
}
