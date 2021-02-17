import * as polandParser from "./polandParser";

/**
 * @see https://abakbot.com/en/net-en/rpn-en#solution
 */
describe("Poland parser correct cases", () => {
  it("1 !", () => {
    expect(polandParser.parseString("1 !")).toEqual([1, "!"]);
  });

  it("1 **", () => {
    expect(polandParser.parseString("1 **")).toEqual([1, "**"]);
  });

  it("1 1 +", () => {
    expect(polandParser.parseString("1 1 +")).toEqual([1, 1, "+"]);
  });

  it("1 2 3 * +", () => {
    expect(polandParser.parseString("1 2 3 * +")).toEqual([1, 2, 3, "*", "+"]);
  });

  it("1 2 + 3 *", () => {
    expect(polandParser.parseString("1 2 + 3 *")).toEqual([1, 2, "+", 3, "*"]);
  });

  it("90 sin", () => {
    expect(polandParser.parseString("90 sin")).toEqual([90, "sin"]);
  });

  it("45 sin 45 +", () => {
    expect(polandParser.parseString("45 sin 45 +")).toEqual([45, "sin", 45, "+"]);
  });

  it("3 ** sin", () => {
    expect(polandParser.parseString("3 ** sin")).toEqual([3, "**", "sin"]);
  });

  it("45 cos sin", () => {
    expect(polandParser.parseString("45 cos sin")).toEqual([45, "cos", "sin"]);
  });
});

describe("Poland parser invalid cases", () => {
  it("1 . 33", () => {
    expect(() => polandParser.parseString("1 . 33")).toThrow(TypeError("Unexpected string"));
  });

  it("+ 2", () => {
    expect(() => polandParser.parseString("+ 2")).toThrow(TypeError("Unexpected string"));
  });

  it("3 +", () => {
    expect(() => polandParser.parseString("3 +")).toThrow(TypeError("Unexpected string"));
  });

  it("10 / 5", () => {
    expect(() => polandParser.parseString("10 / 5")).toThrow(TypeError("Unexpected string"));
  });

  it("1 * 2 + 2 / 1 - 5", () => {
    expect(() => polandParser.parseString("1 * 2 + 2 / 1 - 5")).toThrow(TypeError("Unexpected string"));
  });
});
