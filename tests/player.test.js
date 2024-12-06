import { Player } from "../src/classes/player";
import { Gameboard } from "../src/classes/gameboard";

describe("Player class", () => {
    let player1, computerPlayer, opponent;

    beforeEach(() => {
        player1 = new Player("human");
        computerPlayer = new Player("computer");
        opponent = new Player("human");
        opponent.gameboard.placeShip(["A1", "A2", "A3"]);
    });

    test("creates a human or a computer player with a gameboard", () => {
        expect(player1.type).toBe("human");
        expect(player1.gameboard).toBeInstanceOf(Gameboard);
        expect(computerPlayer.type).toBe("computer");
        expect(computerPlayer.gameboard).toBeInstanceOf(Gameboard);
    });

    test("human player can attack an opponent", () => {
        const { coordinate, result } = player1.attack(opponent, "A1");
        expect(coordinate).toBe("A1"); // Ensure the coordinate is correct
        expect(result).toBe("hit"); // Attack hits the opponent's ship
        expect(opponent.gameboard.fleet[0].totalHits.has("A1")).toBe(true); // Marked as hit
    });

    test("computer player attacks the opponent at a random coordinate", () => {
        const { coordinate, result } = computerPlayer.attack(opponent);
        expect(["hit", "miss"]).toContain(result); // Result should be "hit" or "miss"
        expect(coordinate).toBeDefined(); // Ensure a coordinate is returned
        expect(computerPlayer.attackLog.has(coordinate)).toBe(true); // The coordinate is logged
        expect(computerPlayer.attackLog.size).toBe(1); // The log should have exactly one entry
    });

    test("computer does not attack the same spot twice", () => {
        const totalAttacks = 100;
        for (let i = 0; i < totalAttacks; i++) {
            computerPlayer.attack(opponent);
        }
        /// Verify that the computer attacked the correct number of unique coordinates
        expect(computerPlayer.attackLog.size).toBe(totalAttacks);
    });
});
