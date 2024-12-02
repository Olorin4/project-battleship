/* 1. Create a Ship class.
- Include their length, the number of times they’ve been hit and whether or not they’ve been sunk.
- Ships should have a hit() function that increases the number of ‘hits’ in your ship.
- isSunk() should be a function that calculates whether a ship is considered sunk based on its length and the number of hits it has received. */

export class Ship {
    constructor(positions) {
        this.hull = positions; // Array of positions, e.g., ["A1", "A2", "A3"]
        this.totalHits = new Set(); // Tracks positions hit
    }

    hit(position) {
        if (this.hull.includes(position)) {
            this.totalHits.add(position);
        }
    }

    isSunk() {
        return this.totalHits.size === this.hull.length;
    }
}
