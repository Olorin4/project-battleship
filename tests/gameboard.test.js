import { Gameboard } from "../src/classes/gameboard";

describe("Gameboard class with updated Ship implementation", () => {
    let gameboard, ship1, ship2;

    beforeEach(() => {
        gameboard = new Gameboard(12);
        ship1 = gameboard.placeShip(["A1", "A2", "A3"]);
        ship2 = gameboard.placeShip(["B1", "B2", "B3"]);
    });

    test("should create a grid of the correct size", () => {
        expect(gameboard.board.length).toBe(12); // 12 rows
        expect(gameboard.board[0].length).toBe(12); // 12 columns
    });

    test("place a ship on the gameboard", () => {
        expect(gameboard.fleet).toContain(ship1);
        expect(ship1.hull).toEqual(["A1", "A2", "A3"]);
    });

    test("do not allow placing ships outside the gameboard", () => {
        expect(() => gameboard.placeShip(["M1", "M2"])).toThrow("Invalid coordinate");
        expect(() => gameboard.placeShip(["A13", "B13"])).toThrow("Invalid coordinate");
    });

    test("do not allow attacks outside the gameboard", () => {
        expect(() => gameboard.receivedAttackAt("M1")).toThrow("Invalid coordinate");
        expect(() => gameboard.receivedAttackAt(["A13"])).toThrow("Invalid coordinate");
    });

    test("record a hit when a ship is attacked at its position", () => {
        const result = gameboard.receivedAttackAt("A1");
        expect(result).toBe("hit");
        expect(ship1.totalHits.has("A1")).toBe(true);
    });

    test("record a miss when an attack does not hit any ship", () => {
        const result = gameboard.receivedAttackAt("C1");
        expect(result).toBe("miss");
        expect(gameboard.missedShots.has("C1")).toBe(true);
    });

    test("send the hit to the correct ship", () => {
        gameboard.receivedAttackAt("B2");
        expect(ship1.isSunk()).toBe(false); // Ship1 is unaffected
        expect(ship2.isSunk()).toBe(false); // Ship2 is not sunk yet
        gameboard.receivedAttackAt("B1");
        gameboard.receivedAttackAt("B3");
        expect(ship2.isSunk()).toBe(true); // Ship2 is now sunk
    });

    test("fleetSunk returns false when not all ships are sunk", () => {
        gameboard.receivedAttackAt("A1");
        gameboard.receivedAttackAt("A2");
        gameboard.receivedAttackAt("A3");
        expect(ship1.isSunk()).toBe(true);
        expect(gameboard.fleetSunk()).toBe(false);
    });

    test("fleetSunk returns true when all ships are sunk", () => {
        ["A1", "A2", "A3"].forEach((pos) => gameboard.receivedAttackAt(pos));
        ["B1", "B2", "B3"].forEach((pos) => gameboard.receivedAttackAt(pos));
        expect(gameboard.fleetSunk()).toBe(true);
    });

    test("record missed shots accurately", () => {
        gameboard.receivedAttackAt("C1");
        gameboard.receivedAttackAt("D1");
        expect(gameboard.missedShots.has("C1")).toBe(true);
        expect(gameboard.missedShots.has("D1")).toBe(true);
        expect(gameboard.missedShots.size).toBe(2); // Two misses recorded
    });
});
