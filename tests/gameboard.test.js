import { Gameboard } from "../src/classes/gameboard";

describe("Gameboard class with updated Ship implementation", () => {
    let gameboard;
    let ship1, ship2;

    beforeEach(() => {
        gameboard = new Gameboard();
        ship1 = gameboard.placeShip(["A1", "A2", "A3"]);
        ship2 = gameboard.placeShip(["B1", "B2", "B3"]);
    });

    test("can place a ship on the gameboard", () => {
        expect(gameboard.fleet).toContain(ship1);
        expect(ship1.hull).toEqual(["A1", "A2", "A3"]);
    });

    test("records a hit when a ship is attacked at its position", () => {
        const result = gameboard.receiveAttack("A1");
        expect(result).toBe("hit");
    });

    test("records a miss when an attack does not hit any ship", () => {
        const result = gameboard.receiveAttack("C1");
        expect(result).toBe("miss");
        expect(gameboard.missedShots.has("C1")).toBe(true);
    });

    test("sends the hit to the correct ship", () => {
        gameboard.receiveAttack("B2");
        expect(ship1.isSunk()).toBe(false); // Ship1 is unaffected
        expect(ship2.isSunk()).toBe(false); // Ship2 is not sunk yet
        gameboard.receiveAttack("B1");
        gameboard.receiveAttack("B3");
        expect(ship2.isSunk()).toBe(true); // Ship2 is now sunk
    });

    test("fleetSunk returns false when not all ships are sunk", () => {
        gameboard.receiveAttack("A1");
        gameboard.receiveAttack("A2");
        expect(gameboard.fleetSunk()).toBe(false);
    });

    test("fleetSunk returns true when all ships are sunk", () => {
        ["A1", "A2", "A3"].forEach((pos) => gameboard.receiveAttack(pos));
        ["B1", "B2", "B3"].forEach((pos) => gameboard.receiveAttack(pos));
        expect(gameboard.fleetSunk()).toBe(true);
    });

    test("records missed shots accurately", () => {
        gameboard.receiveAttack("C1");
        gameboard.receiveAttack("D1");
        expect(gameboard.missedShots.has("C1")).toBe(true);
        expect(gameboard.missedShots.has("D1")).toBe(true);
        expect(gameboard.missedShots.size).toBe(2); // Two misses recorded
    });
});
