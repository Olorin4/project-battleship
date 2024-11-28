/* 1. Create a Ship class.
- Include their length, the number of times they’ve been hit and whether or not they’ve been sunk.
- Ships should have a hit() function that increases the number of ‘hits’ in your ship.
- isSunk() should be a function that calculates whether a ship is considered sunk based on its length and the number of hits it has received. */

export class Ship {
    constructor(positions) {
        this.positions = positions; // Array of positions, e.g., ["A1", "A2", "A3"]
        this.receivedHits = new Set(); // Tracks positions hit
    }

    hit(position) {
        if (this.positions.includes(position)) {
            this.receivedHits.add(position);
        }
    }

    isSunk() {
        return this.receivedHits.size === this.positions.length;
    }
}
