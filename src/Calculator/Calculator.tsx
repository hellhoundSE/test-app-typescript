import { ChangeEvent, useState } from "react";
import {
  calculateResult,
  convertToRPN,
  normalizeExpression,
} from "./utils/math";
import { getErrors } from "./utils/validation";

const Calculator = () => {
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  const expressionChangeListener = (event: ChangeEvent) => {
    const element: HTMLInputElement = event.currentTarget as HTMLInputElement;
    const value: string = element.value;

    setExpression(value);

    if (!value) {
      setErrors([]);
      return;
    }

    setErrors(getErrors(value));
  };

  const handleCalculate = () => {
    const normalizedExpression: string = normalizeExpression(expression);
    const rpn: string = convertToRPN(normalizedExpression);
    setResult(calculateResult(rpn));
  };

  const handleClear = () => {
    setExpression("");
    setErrors([]);
    setResult("");
  };

  return (
    <div>
      <input
        style={{ minWidth: "400px" }}
        id="expInput"
        value={expression}
        onChange={expressionChangeListener}
      />{" "}
      = <span>{result}</span>
      <br />
      <button onClick={handleCalculate}>Calculate</button>
      <button onClick={handleClear}>Clear</button>
      {errors.map((error) => (
        <p key={error} style={{ color: "red" }}>
          {error}
        </p>
      ))}
    </div>
  );
};

export default Calculator;
