import { mdiArrowExpandVertical } from "@mdi/js";
import { Ship } from "../src/classes/ship";

describe("Ship class", () => {
    let ship;

    beforeEach(() => {
        ship = new Ship(["A1", "A2", "A3"]);
    });

    test("initializes new Ship with given positions and no received hits", () => {
        expect(ship.hull).toEqual(["A1", "A2", "A3"]);
        expect(ship.totalHits.size).toBe(0);
        expect(ship.isSunk()).toBe(false);
    });

    test("records a hit on a valid position", () => {
        ship.hitAt("A1");
        expect(ship.totalHits.has("A1")).toBe(true);
        expect(ship.totalHits.size).toBe(1);
    });

    test("does not record a hit on an invalid position", () => {
        ship.hitAt("B1");
        expect(ship.totalHits.has("B1")).toBe(false);
        expect(ship.totalHits.size).toBe(0);
    });

    test("handles multiple hits on different valid positions", () => {
        ship.hitAt("A1");
        ship.hitAt("A2");
        expect(ship.totalHits.has("A1")).toBe(true);
        expect(ship.totalHits.has("A2")).toBe(true);
        expect(ship.totalHits.size).toBe(2);
    });

    test("ignores duplicate hits on the same position", () => {
        ship.hitAt("A1");
        ship.hitAt("A1");
        expect(ship.totalHits.has("A1")).toBe(true);
        expect(ship.totalHits.size).toBe(1);
    });

    test("isSunk returns false when not all positions are hit", () => {
        ship.hitAt("A1");
        ship.hitAt("A2");
        expect(ship.isSunk()).toBe(false);
    });

    test("isSunk returns true when all positions are hit", () => {
        ship.hitAt("A1");
        ship.hitAt("A2");
        ship.hitAt("A3");
        expect(ship.isSunk()).toBe(true);
    });

    test("isSunk works correctly with out-of-order hits", () => {
        ship.hitAt("A3");
        ship.hitAt("A1");
        ship.hitAt("A2");
        expect(ship.isSunk()).toBe(true);
    });
});
