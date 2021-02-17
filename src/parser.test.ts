import * as parser from "./parser";
import * as core from "./core";

/**
 * @see https://abakbot.com/en/net-en/rpn-en#solution
 */
describe("Parser correct cases", () => {
  it("1 !", () => {
    expect(parser.parseString("1 !")).toEqual([1, "!"]);
  });

  it("1 **", () => {
    expect(parser.parseString("1 **")).toEqual([1, "**"]);
  });

  it("1 + 1", () => {
    expect(parser.parseString("1 + 1")).toEqual([1, 1, "+"]);
  });

  it("1 + 2 * 3", () => {
    expect(parser.parseString("1 + 2 * 3")).toEqual([1, 2, 3, "*", "+"]);
  });

  it("( ( 1 ) )", () => {
    expect(parser.parseString("( ( 1 ) )")).toEqual([1]);
  });

  it("( 1 + 2 ) * 3", () => {
    expect(parser.parseString("( 1 + 2 ) * 3")).toEqual([1, 2, "+", 3, "*"]);
  });

  it("15 / ( 7 - ( 1 + 1 ) )", () => {
    expect(parser.parseString("15 / ( 7 - ( 1 + 1 ) )")).toEqual([15, 7, 1, 1, "+", "-", "/"]);
  });

  it("1 * 2 + 2 / 1 - 5", () => {
    expect(parser.parseString("1 * 2 + 2 / 1 - 5")).toEqual([1, 2, "*", 2, 1, "/", "+", 5, "-"]);
  });

  it("1 ! + 2 * 2 ** - 5 * 3 ^ 3", () => {
    expect(parser.parseString("1 ! + 2 * 2 ** - 5 * 3 ^ 3"))
        .toEqual([1, "!", 2, 2, "**", "*", "+", 5, 3, 3, "^", "*", "-"]);
  });

  it("15 / ( 7 - ( 1 + 1 ) ) * 3 - ( 2 + ( 1 + 1 ) )", () => {
    expect(parser.parseString("15 / ( 7 - ( 1 + 1 ) ) * 3 - ( 2 + ( 1 + 1 ) )"))
        .toEqual([15, 7, 1, 1, "+", "-", "/", 3, "*", 2, 1, 1, "+", "+", "-"]);
  });

  it("sin 90", () => {
    expect(parser.parseString("sin 90")).toEqual([90, "sin"]);
  });

  it("sin 45 + 45", () => {
    expect(parser.parseString("sin 45 + 45")).toEqual([45, "sin", 45, "+"]);
  });

  it("sin ( 45 + 45 )", () => {
    expect(parser.parseString("sin ( 45 + 45 )")).toEqual([45, 45, "+", "sin"]);
  });

  it("sin ( 3 ** )", () => {
    expect(parser.parseString("sin ( 3 ** )")).toEqual([3, "**", "sin"]);
  });

  it("sin cos 45", () => {
    expect(parser.parseString("sin cos 45")).toEqual([45, "cos", "sin"]);
  });

  it("sin 20 * cos 40", () => {
    expect(parser.parseString("sin 20 * cos 40")).toEqual([20, "sin", 40, "cos", "*"]);
  });

  it("cos ( 90 ) - 1 / 2 * sin ( 90 ^ 2 - 2 )", () => {
    expect(parser.parseString("cos ( 90 ) - 1 / 2 * sin ( 90 ^ 2 - 2 )"))
        .toEqual([90, "cos", 1, 2, "/", 90, 2, "^", 2, "-", "sin", "*", "-"]);
  });

  it("1 / 2 + ( 2 + 3 ) / ( sin ( 9 - 2 ) ^ 2 - 6 / 7 )", () => {
    expect(parser.parseString("1 / 2 + ( 2 + 3 ) / ( sin ( 9 - 2 ) ^ 2 - 6 / 7 )"))
        .toEqual([1, 2, "/", 2, 3, "+", 9, 2, "-", "sin", 2, "^", 6, 7, "/", "-", "/", "+"]);
  });
});

describe("Parser invalid cases", () => {
  it("1 . 33", () => {
    expect(() => parser.parseString("1 . 33")).toThrow(
 TypeError("Unexpected string")
    );
  });

  it("+ 1", () => {
    expect(() => parser.parseString("+ 1")).toThrow(
 TypeError("Unexpected string")
    );
  });

  it("1 +", () => {
    expect(() => parser.parseString("1 +")).toThrow(
 TypeError("Unexpected string")
    );
  });

  it("2 + * 2", () => {
    expect(() => parser.parseString("2 + * 2")).toThrow(
 TypeError("Unexpected string")
    );
  });

  it("2 + 2 *", () => {
    expect(() => parser.parseString("2 + 2 *")).toThrow(
 TypeError("Unexpected string")
    );
  });

  it("2 2 +", () => {
    expect(() => parser.parseString("2 2 +")).toThrow(
 TypeError("Unexpected string")
    );
  });

  it("( ( 1 + ) )", () => {
    expect(() => parser.parseString("( ( 1 + ) )")).toThrow(
 TypeError("Unexpected string")
    );
  });

  it("( 1 ( ) )", () => {
    expect(() => parser.parseString("( 1 ( ) )")).toThrow(
 TypeError("Unexpected string")
    );
  });

  it("( ) 2 + 2 ) ", () => {
    expect(() => parser.parseString("( ) 2 + 2 )")).toThrow(
 TypeError("Unexpected string")
    );
  });

  it("( 2 + 2 ) (", () => {
    expect(() => parser.parseString("( 2 + 2 ) (")).toThrow(
 TypeError("Unexpected string")
    );
  });

  it("( 2 + 2 ) )", () => {
    expect(() => parser.parseString("( 2 + 2 ) (")).toThrow(
 TypeError("Unexpected string")
    );
  });

  it("( ( 2 + 2 )", () => {
    expect(() => parser.parseString("( 2 + 2 ) (")).toThrow(
 TypeError("Unexpected string")
    );
  });

  it("2 + 2 2 + 2", () => {
    expect(() => parser.parseString("2 + 2 2 + 2")).toThrow(
 TypeError("Unexpected string")
    );
  });

  it("2 + 2 + 2 2", () => {
    expect(() => parser.parseString("2 + 2 + 2 2")).toThrow(
 TypeError("Unexpected string")
    );
  });
});
