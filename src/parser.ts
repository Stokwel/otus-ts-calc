import * as operators from "./operators";
import * as parserHelper from "./parserHelper";

export function parseString(input: string): (number | string)[] {
  const operatorsStack: string[] = [];

  const result: (number | string)[] = [];

  const elements = parserHelper.splitAndFilter(input);

  let isNextItemShouldBeOperator = false;
  let isAvailableOpenBracket = true;
  let isAvailableCloseBracket = false;
  let bracketBalance = 0;
  for (const item of elements) {
    switch (true) {
      case parserHelper.isNumber(item) && !isNextItemShouldBeOperator:
        isAvailableOpenBracket = false;
        isAvailableCloseBracket = true;
        result.push(Number(item));
        break;
      case item === operators.openBracket && isAvailableOpenBracket:
        bracketBalance++;
        isAvailableOpenBracket = true;
        isAvailableCloseBracket = false;
        operatorsStack.push(item);
        break;
      case item === operators.closeBracket && isAvailableCloseBracket:
        bracketBalance--;
        isAvailableOpenBracket = false;
        isAvailableCloseBracket = true;
        result.push(...extractStackByBracket(operatorsStack));
        break;
      case isNextItemShouldBeOperator:
      case operators.isTrigonometricOperators(item):
        isAvailableOpenBracket = true;
        isAvailableCloseBracket = item in operators.oneArgumentOperators;
        result.push(
          ...extractStackByPriority(operators.getPriority(item), operatorsStack)
        );
        operatorsStack.push(item);
        break;
      default:
        throw new TypeError("Unexpected string");
    }

    isNextItemShouldBeOperator = checkIsNextItemShouldBeOperator(item);
  }

  if (
    (elements.length > 0 && !isNextItemShouldBeOperator) ||
    bracketBalance !== 0
  ) {
    throw new TypeError("Unexpected string");
  }

  result.push(...extractStackByPriority(operators.zero, operatorsStack));

  return result;
}

function extractStackByBracket(stack: string[]): string[] {
  if (stack.length === 0) {
    return [];
  }

  const resultStack: string[] = [];
  let item = stack.pop();
  while (item !== operators.openBracket) {
    resultStack.push(item);
    item = stack.pop();
  }

  return resultStack;
}

function extractStackByPriority(
  currentOperatorPriority: number,
  stack: string[]
): string[] {
  if (stack.length === 0) {
    return [];
  }

  const resultStack: string[] = [];
  const clonedStack = Object.assign([], stack).reverse();
  for (const item of clonedStack) {
    if (
      item === operators.openBracket ||
      currentOperatorPriority > operators.getPriority(item) ||
      (operators.isTrigonometricOperators(item) &&
        currentOperatorPriority >= operators.getPriority(item))
    ) {
      break;
    }
    resultStack.push(stack.pop());
  }

  return resultStack;
}

function checkIsNextItemShouldBeOperator(element: string): boolean {
  return (
    parserHelper.isNumber(element) ||
    element in operators.oneArgumentOperators ||
    element === operators.closeBracket
  );
}
