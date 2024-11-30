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
        ship.hit("A1");
        expect(ship.totalHits.has("A1")).toBe(true);
        expect(ship.totalHits.size).toBe(1);
    });

    test("does not record a hit on an invalid position", () => {
        ship.hit("B1");
        expect(ship.totalHits.has("B1")).toBe(false);
        expect(ship.totalHits.size).toBe(0);
    });

    test("handles multiple hits on different valid positions", () => {
        ship.hit("A1");
        ship.hit("A2");
        expect(ship.totalHits.has("A1")).toBe(true);
        expect(ship.totalHits.has("A2")).toBe(true);
        expect(ship.totalHits.size).toBe(2);
    });

    test("ignores duplicate hits on the same position", () => {
        ship.hit("A1");
        ship.hit("A1");
        expect(ship.totalHits.has("A1")).toBe(true);
        expect(ship.totalHits.size).toBe(1);
    });

    test("isSunk returns false when not all positions are hit", () => {
        ship.hit("A1");
        ship.hit("A2");
        expect(ship.isSunk()).toBe(false);
    });

    test("isSunk returns true when all positions are hit", () => {
        ship.hit("A1");
        ship.hit("A2");
        ship.hit("A3");
        expect(ship.isSunk()).toBe(true);
    });

    test("isSunk works correctly with out-of-order hits", () => {
        ship.hit("A3");
        ship.hit("A1");
        ship.hit("A2");
        expect(ship.isSunk()).toBe(true);
    });
});
