export const OPERATORS = {
  PLUS: "+",
  MINUS: "-",
  MULTIPLY: "*",
  DIVIDE: "/",
  OPEN_BRACKET: "(",
  CLOSE_BRACKET: ")",
};

export const MATH_OPERATORS = [
  OPERATORS.PLUS,
  OPERATORS.MINUS,
  OPERATORS.MULTIPLY,
  OPERATORS.DIVIDE,
];
export const OPERATORS_PRIORITY = {
  [OPERATORS.PLUS]: 1,
  [OPERATORS.MINUS]: 1,
  [OPERATORS.MULTIPLY]: 2,
  [OPERATORS.DIVIDE]: 2,
};
export const OPERATORS_METHODS = {
  [OPERATORS.PLUS]: (a: string, b: string): number => Number(a) + Number(b),
  [OPERATORS.MINUS]: (a: string, b: string): number => Number(a) - Number(b),
  [OPERATORS.MULTIPLY]: (a: string, b: string): number => Number(a) * Number(b),
  [OPERATORS.DIVIDE]: (a: string, b: string): number => Number(a) / Number(b),
};

export const SYMBOLS_DELIMETER: string = " ";
export const ERROR_TEXT: string = "error";
