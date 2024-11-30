/* 2. Create a Gameboard class.
- Gameboards should be able to place ships at specific coordinates by calling the ship class.
- Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
- Gameboards should keep track of missed attacks so they can display them properly. */

import { Ship } from "./ship";

export class Gameboard {
    constructor() {
        this.fleet = []; // Array of Ship objects with their positions
        this.missedShots = new Set(); // Set of missed attack coordinates
    }

    placeShip(positions) {
        const newShip = new Ship(positions);
        this.fleet.push(newShip);
        return newShip;
    }

    receiveAttack(coordinate) {
        // Check if any ship occupies the attacked coordinate
        for (const ship of this.fleet) {
            if (ship.hull.includes(coordinate)) {
                ship.hit(coordinate); // Mark the hit on the correct ship
                return "hit";
            }
        }
        // If no ship was hit, record the missed shot
        this.missedShots.add(coordinate);
        return "miss";
    }

    fleetSunk() {
        // Check if all ships on the board are sunk
        return this.fleet.every((ship) => ship.isSunk());
    }
}
