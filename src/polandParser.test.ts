import * as polandParser from "./polandParser";
import * as parser from "./parser";

/**
 * @see https://abakbot.com/en/net-en/rpn-en#solution
 */
describe("Poland parser correct cases", () => {
  test.each([
    ["1 !", [1, "!"]],
    ["1 **", [1, "**"]],
    ["1 1 +", [1, 1, "+"]],
    ["1 2 3 * +", [1, 2, 3, "*", "+"]],
    ["1 2 + 3 *", [1, 2, "+", 3, "*"]],
    ["90 sin", [90, "sin"]],
    ["45 sin 45 +", [45, "sin", 45, "+"]],
    ["3 ** sin", [3, "**", "sin"]],
    ["45 cos sin", [45, "cos", "sin"]],
  ])('%s', (input, expected) => {
    expect(polandParser.parseString(input)).toEqual(expected);
  });
});

describe("Poland parser invalid cases", () => {
  test.each([
    ["1 . 33"],
    ["+ 2"],
    ["3 +"],
    ["10 / 5"],
    ["1 * 2 + 2 / 1 - 5"],
  ])('%s', (input) => {
    expect(() => polandParser.parseString(input)).toThrow(TypeError("Unexpected string"));
  });
});
