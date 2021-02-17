export const isNumber = (str: string): boolean => !isNaN(Number(str));

export function splitAndFilter(input: string): string[] {
  let elements: string[] = input.split(" ");

  elements = elements.filter((e) => {
    return e != "";
  });

  return elements;
}
