import { mdiArrowExpandVertical } from "@mdi/js";
import { Ship } from "../src/classes/ship";

describe("Ship class", () => {
    let ship;

    beforeEach(() => {
        ship = new Ship(["A1", "A2", "A3"]);
    });

    test("initializes new Ship with given positions and no received hits", () => {
        expect(ship.positions).toEqual(["A1", "A2", "A3"]);
        expect(ship.receivedHits.size).toBe(0);
    });

    test("records a hit on a valid position", () => {
        ship.hit("A1");
        expect(ship.receivedHits.has("A1")).toBe(true); // A1 should be recorded as a hit
        expect(ship.receivedHits.size).toBe(1); // Only one position hit
    });

    test("does not record a hit on an invalid position", () => {
        ship.hit("B1");
        expect(ship.receivedHits.has("B1")).toBe(false); // B1 should not be recorded
        expect(ship.receivedHits.size).toBe(0); // No positions hit
    });

    test("handles multiple hits on different valid positions", () => {
        ship.hit("A1");
        ship.hit("A2");
        expect(ship.receivedHits.has("A1")).toBe(true);
        expect(ship.receivedHits.has("A2")).toBe(true);
        expect(ship.receivedHits.size).toBe(2); // Two positions hit
    });

    test("ignores duplicate hits on the same position", () => {
        ship.hit("A1");
        ship.hit("A1");
        expect(ship.receivedHits.has("A1")).toBe(true);
        expect(ship.receivedHits.size).toBe(1); // Still only one unique hit
    });

    test("isSunk returns false when not all positions are hit", () => {
        ship.hit("A1");
        ship.hit("A2");
        expect(ship.isSunk()).toBe(false); // Not all positions hit
    });

    test("isSunk returns true when all positions are hit", () => {
        ship.hit("A1");
        ship.hit("A2");
        ship.hit("A3");
        expect(ship.isSunk()).toBe(true); // All positions hit
    });

    test("isSunk works correctly with out-of-order hits", () => {
        ship.hit("A3");
        ship.hit("A1");
        ship.hit("A2");
        expect(ship.isSunk()).toBe(true); // Order of hits should not matter
    });
});
