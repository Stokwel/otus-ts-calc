import * as operators from "./operators";

describe("One argument operators correct cases", () => {
  it("Factorial", () => {
    expect(operators.factorial(3)).toEqual(6);
  });

  it("Sqr", () => {
    expect(operators.sqr(3)).toEqual(9);
  });

  it("Fib", () => {
    expect(operators.fib(3)).toEqual(2);
  });

  it("Sin", () => {
    expect(operators.sin(90)).toEqual(1);
  });

  it("Cos", () => {
    expect(operators.cos(180)).toEqual(-1);
  });

  it("Tan", () => {
    expect(operators.tan(10)).toEqual(0.17632698070846498);
  });
});

describe("Two arguments operators correct cases", () => {
  it("Plus", () => {
    expect(operators.plus(105, 401)).toEqual(506);
  });

  it("Minus", () => {
    expect(operators.minus(11, 34)).toEqual(-23);
  });

  it("Mul", () => {
    expect(operators.mul(5, 7)).toEqual(35);
  });

  it("Div", () => {
    expect(operators.div(5, 10)).toEqual(0.5);
  });

  it("Pow", () => {
    expect(operators.pow(3, 3)).toEqual(27);
  });
});
