export type OneArgumentOperatorType = "!" | "**";
export type TwoArgumentsOperatorType = "+" | "-" | "*" | "/" | "^";
export type TrigonometricOperatorType = "sin" | "cos" | "tan" | "fib";
export type MathOperatorType = OneArgumentOperatorType | TwoArgumentsOperatorType;

export type OneArgumentOperatorFuncType = (operand: number) => number;
export type TwoArgumentsOperatorFuncType = (left: number, right: number) => number;

export const factorial: OneArgumentOperatorFuncType = (operand) => operand ? operand * factorial(operand - 1) : 1;
export const sqr: OneArgumentOperatorFuncType = (operand) => operand * operand;
export const fib: OneArgumentOperatorFuncType = (operand) => operand <= 1 ? operand : fib(operand - 1) + fib(operand - 2);

const deg2rad = Math.PI/180;
export const sin: OneArgumentOperatorFuncType = (operand) => Math.sin(operand * deg2rad);
export const cos: OneArgumentOperatorFuncType = (operand) => Math.cos(operand * deg2rad);
export const tan: OneArgumentOperatorFuncType = (operand) => Math.tan(operand * deg2rad);

export const plus: TwoArgumentsOperatorFuncType = (left, right) => left + right;
export const minus: TwoArgumentsOperatorFuncType = (left, right) => left - right;
export const mul: TwoArgumentsOperatorFuncType = (left, right) => left * right;
export const div: TwoArgumentsOperatorFuncType = (left, right) => left / right;
export const pow: TwoArgumentsOperatorFuncType = (left, right) => Math.pow(left, right);

export const mathPriorities: number[] = [0, 1, 2, 3, 4];
export const [zero, first, second, third, fourth] = mathPriorities;

export const openBracket = "(";
export const closeBracket = ")";
export const brackets = [openBracket, closeBracket];

export const mathOperatorsPriorities: {
  [key in MathOperatorType | TrigonometricOperatorType]: number;
} = {
  "+": first,
  "-": first,
  "*": second,
  "/": second,
  "**": third,
  "^": third,
  "!": fourth,
  fib: fourth,
  sin: fourth,
  cos: fourth,
  tan: fourth,
};

export const trigonometricOperators: {
  [key in TrigonometricOperatorType]: OneArgumentOperatorFuncType;
} = {
  sin: sin,
  cos: cos,
  tan: tan,
  fib: fib,
};

export const oneArgumentOperators: {
  [key in OneArgumentOperatorType]: OneArgumentOperatorFuncType;
} = {
  "!": factorial,
  "**": sqr,
};

export const twoArgumentsOperators: {
  [key in TwoArgumentsOperatorType]: TwoArgumentsOperatorFuncType;
} = {
  "+": plus,
  "-": minus,
  "*": mul,
  "/": div,
  "^": pow,
};

export const operators: {
  [key in MathOperatorType]:
    | OneArgumentOperatorFuncType
    | TwoArgumentsOperatorFuncType;
} = {
  ...oneArgumentOperators,
  ...twoArgumentsOperators,
  ...trigonometricOperators,
};

export const isOperator = (str: any): boolean => str in operators;
export const isTrigonometricOperators = (str: any): boolean => str in trigonometricOperators;

export function getPriority(str: string): number {
  if (!isOperator(str)) {
    throw new TypeError("Unexpected string");
  }

  return mathOperatorsPriorities[str as MathOperatorType];
}

export function getValence(operator: string): number {
  return operator in twoArgumentsOperators ? 2 : 1
}
