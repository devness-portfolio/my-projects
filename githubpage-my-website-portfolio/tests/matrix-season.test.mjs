import assert from "node:assert/strict";
import test from "node:test";
import { isHalloweenSeason } from "../portfolio/assets/js/matrix-intro.js";

test("Halloween season repeats annually from September 15 through November 1 inclusive", () => {
  for (const year of [2026, 2027, 2028, 2030]) {
    for (const [month, day, expected] of [[0, 1, false], [8, 14, false], [8, 15, true], [9, 31, true], [10, 1, true], [10, 2, false], [11, 31, false]]) {
      assert.equal(isHalloweenSeason(new Date(year, month, day, 23, 59)), expected, `${year}-${month + 1}-${day}`);
    }
  }
});
