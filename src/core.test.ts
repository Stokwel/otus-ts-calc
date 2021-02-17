import * as core from "./core";

describe("Calc correct cases", () => {
  it("3 !", () => {
    expect(core.run("3 !")).toEqual(6);
  });

  it("3 **", () => {
    expect(core.run("3 **")).toEqual(9);
  });

  it("10 / 2", () => {
    expect(core.run("10 / 2")).toEqual(5);
  });

  it("1 + 2 * 3", () => {
    expect(core.run("1 + 2 * 3")).toEqual(7);
  });

  it("1 * 2 + 2 / 1 - 5", () => {
    expect(core.run("1 * 2 + 2 / 1 - 5")).toEqual(-1);
  });

  it("1 ! + 2 * 2 ** - 5 * 3 ^ 3", () => {
    expect(core.run("1 ! + 2 * 2 ** - 5 * 3 ^ 3")).toEqual(-126);
  });

  it("( 1 + 2 ) * 3", () => {
    expect(core.run("( 1 + 2 ) * 3")).toEqual(9);
  });

  it("15 / ( 7 - ( 1 + 1 ) ) **", () => {
    expect(core.run("15 / ( 7 - ( 1 + 1 ) ) **")).toEqual(0.6);
  });

  it("15 / ( 7 - ( 1 + 1 ) ^ 2 )", () => {
    expect(core.run("15 / ( 7 - ( 1 + 1 ) ^ 2 )")).toEqual(5);
  });

  it("15 / ( 7 - ( 1 + 1 ) ) * 3 - ( 2 + ( 1 + 1 ) )", () => {
    expect(core.run("15 / ( 7 - ( 1 + 1 ) ) * 3 - ( 2 + ( 1 + 1 ) )")).toEqual(5);
  });

  it("sin 90", () => {
    expect(core.run("sin 90")).toEqual(1);
  });

  it("sin 45 + 45", () => {
    expect(core.run("sin 45 + 45")).toEqual(45.7071);
  });

  it("sin ( 45 + 45 )", () => {
    expect(core.run("sin ( 45 + 45 )")).toEqual(1);
  });

  it("sin cos 45", () => {
    expect(core.run("sin cos 45")).toEqual(0.0123);
  });

  it("sin 5 !", () => {
    expect(core.run("sin 5 !")).toEqual(0.866);
  });

  it("sin 3 **", () => {
    expect(core.run("sin 3 **")).toEqual(0.0027);
  });

  it("sin ( 3 ** )", () => {
    expect(core.run("sin ( 3 ** )")).toEqual(0.1564);
  });

  it("sin 20 * cos 40", () => {
    expect(core.run("sin 20 * cos 40")).toEqual(0.262);
  });

  it("sin 20 * cos 40 + cos 20 * sin ( 40 )", () => {
    expect(core.run("sin 20 * cos 40 + cos 20 * sin ( 40 )")).toEqual(0.866);
  });

  it("cos ( 90 ) - 1 / 2 * sin ( 90 ^ 2 - 2 )", () => {
    expect(core.run("cos ( 90 ) - 1 / 2 * sin ( 90 ^ 2 - 2 )")).toEqual(-0.0174);
  });

  it("1 / 2 + ( 2 + 3 ) / ( sin ( 9 - 2 ) ^ 2 - 6 / 7 )", () => {
    expect(core.run("1 / 2 + ( 2 + 3 ) / ( sin ( 9 - 2 ) ^ 2 - 6 / 7 )")).toEqual(-5.4362);
  });
});

describe("Poland calc correct cases", () => {
  it("3 !", () => {
    expect(core.runPoland("3 !")).toEqual(6);
  });

  it("3 **", () => {
    expect(core.runPoland("3 **")).toEqual(9);
  });

  it("90 cos 1 2 / 90 2 ^ 2 - sin * -", () => {
    expect(core.runPoland("90 cos 1 2 / 90 2 ^ 2 - sin * -")).toEqual(-0.0174);
  });

  it("15 7 1 1 + - / 3 * 2 1 1 + + -", () => {
    expect(core.runPoland("15 7 1 1 + - / 3 * 2 1 1 + + -")).toEqual(5);
  });
  
  it("1 2 / 2 3 + 9 2 - sin 2 ^ 6 7 / - / +", () => {
    expect(core.runPoland("1 2 / 2 3 + 9 2 - sin 2 ^ 6 7 / - / +")).toEqual(-5.4362);
  });
});
