import {
  ERROR_TEXT,
  MATH_OPERATORS,
  OPERATORS,
  OPERATORS_METHODS,
  OPERATORS_PRIORITY,
  SYMBOLS_DELIMETER,
} from "./dictionary";

export const normalizeExpression = (expression: string): string =>
  expression
    .replace(/\s/g, "")
    .split("")
    .reduce((exp: string[], token: string): string[] => {
      if (!isNaN(parseFloat(token)) || token === ".") exp.push(token);

      if (token === OPERATORS.OPEN_BRACKET)
        exp.push(...[OPERATORS.OPEN_BRACKET, SYMBOLS_DELIMETER]);

      if (token === OPERATORS.CLOSE_BRACKET)
        exp.push(...[SYMBOLS_DELIMETER, OPERATORS.CLOSE_BRACKET]);

      if (MATH_OPERATORS.includes(token))
        exp.push(...[SYMBOLS_DELIMETER, token, SYMBOLS_DELIMETER]);

      return exp;
    }, [])
    .join("");

export const convertToRPN = (expression: string): string => {
  const peek: Function = (array): string => array[array.length - 1];
  const stack: string[] = [];

  return expression
    .split(" ")
    .reduce((acc: string[], token: string) => {
      if (!isNaN(parseFloat(token))) {
        acc.push(token);
      }

      if (token in OPERATORS_PRIORITY) {
        while (
          peek(stack) in OPERATORS_PRIORITY &&
          OPERATORS_PRIORITY[token] <= OPERATORS_PRIORITY[peek(stack)]
        )
          acc.push(stack.pop() as string);
        stack.push(token);
      }

      if (token === OPERATORS.OPEN_BRACKET) {
        stack.push(token);
      }

      if (token === OPERATORS.CLOSE_BRACKET) {
        while (peek(stack) !== OPERATORS.OPEN_BRACKET)
          acc.push(stack.pop() as string);
        stack.pop();
      }

      return acc;
    }, [])
    .concat(stack.reverse())
    .join(SYMBOLS_DELIMETER);
};

export const calculateResult = (normalizedExpression): string => {
  const exp = normalizedExpression.split(" ");
  const stack: string[] = [];

  if (exp.length === 0 || exp.length === 1 || exp.length === 2) {
    return ERROR_TEXT;
  }

  exp.forEach((token: string) => {
    if (!isNaN(parseFloat(token))) {
      stack.push(token);
    } else {
      const b: string | undefined = stack.pop();
      const a: string | undefined = stack.pop();

      if (a === undefined || b === undefined) {
        return ERROR_TEXT;
      }

      const operationResult: number = OPERATORS_METHODS[token](a, b);

      if (isNaN(operationResult)) return;

      stack.push(operationResult.toString());
    }
  });

  if (stack.length > 1 || stack.length === 0) {
    return ERROR_TEXT;
  } else {
    return stack.pop() as string;
  }
};
