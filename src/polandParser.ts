import * as operators from "./operators";
import * as parserHelper from "./parserHelper";

export function parseString(input: string): (number | string)[] {
  const result: (number | string)[] = [];

  const elements = parserHelper.splitAndFilter(input);
  let stackSize = 0;
  for (const item of elements) {
    if (!validateElement(item)) {
      throw new TypeError("Unexpected string");
    }

    stackSize += 1 - (operators.isOperator(item) ? operators.getValence(item) : 0);
    if (0 >= stackSize) {
      throw new TypeError("Unexpected string");
    }

    result.push(parserHelper.isNumber(item) ? Number(item) : item);
  }

  if (1 !== stackSize) {
    throw new TypeError("Unexpected string");
  }

  return result;
}

function validateElement(element: string): boolean {
  return operators.isOperator(element)
      || parserHelper.isNumber(element);
}
