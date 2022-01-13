import { OPERATORS } from "./dictionary";

export const getErrors = (expression: string): string[] => {
  const allErrors: string[] = [];

  const getBracketsError = (): void => {
    const bracketsAmount: Map<string, number> = expression
      .replace(/\s/g, "")
      .split("")
      .reduce(
        (dictionary: Map<string, number>, character: string) => {
          if (dictionary.has(character))
            dictionary.set(
              character,
              (dictionary.get(character) as number) + 1
            );

          return dictionary;
        },
        new Map([
          [OPERATORS.OPEN_BRACKET, 0],
          [OPERATORS.CLOSE_BRACKET, 0],
        ])
      );
    const openBracketsAmount: number = bracketsAmount.get(
      OPERATORS.OPEN_BRACKET
    ) as number;
    const closeBracketsAmount: number = bracketsAmount.get(
      OPERATORS.CLOSE_BRACKET
    ) as number;

    if (openBracketsAmount !== closeBracketsAmount)
      allErrors.push(
        `Missing ${
          openBracketsAmount > closeBracketsAmount
            ? OPERATORS.OPEN_BRACKET
            : OPERATORS.CLOSE_BRACKET
        } bracket`
      );
  };

  const getFloatingNumbersError = (): void => {
    const floatFound: string[] | null = expression.match("[a-zA-Z]");
    if (floatFound) allErrors.push("Letters are not allowed ");
  };

  getBracketsError();
  getFloatingNumbersError();

  return allErrors;
};
