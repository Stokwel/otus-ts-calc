import * as parser from "./parser";
import * as polandParser from "./polandParser";
import * as operators from "./operators";

export function runCalculate(input: string): number {
  return calculate(parser.parseString(input));
}

export function runCalculatePoland(input: string): number {
  return calculate(polandParser.parseString(input));
}

function calculate(parsedInput: (number | string)[]): number {
  const stack: (number | string)[] = [];
  while (parsedInput.length > 0) {
    const element = parsedInput.shift();
    if (!operators.isOperator(element)) {
      stack.push(element);
      continue;
    }

    let result = 0;
    if (element in operators.oneArgumentOperators) {
      const leftOperand = Number(stack.pop());
      result = operators.oneArgumentOperators[element as operators.OneArgumentOperatorType](leftOperand);
    } else if (element in operators.trigonometricOperators) {
      const leftOperand = Number(stack.pop());
      result = operators.trigonometricOperators[element as operators.TrigonometricOperatorType](leftOperand);
    } else {
      const rightOperand = Number(stack.pop());
      const leftOperand = Number(stack.pop());
      result = operators.twoArgumentsOperators[element as operators.TwoArgumentsOperatorType](leftOperand, rightOperand);
    }

    stack.push(result);
  }

  return Number(Number(stack.pop()).toFixed(4));
}
