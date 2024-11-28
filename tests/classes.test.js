import { mdiArrowExpandVertical } from "@mdi/js";
import { Ship } from "../src/classes";

describe("Ship class", () => {
    test("receiving a hit should increase ship total hits by 1", () => {
        expect(Ship.receivedHits).toBe(Ship.receivedHits + 1);
    });
});
