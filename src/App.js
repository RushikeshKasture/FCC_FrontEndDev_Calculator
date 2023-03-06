import "./styles.css";
import React, { useEffect, useState } from "react";

const calcKeyBoardData = [
  { id: "nine", value: 9 },
  { id: "eight", value: 8 },
  { id: "seven", value: 7 },
  { id: "add", value: "+" },
  { id: "six", value: 6 },
  { id: "five", value: 5 },
  { id: "four", value: 4 },
  { id: "subtract", value: "-" },
  { id: "three", value: 3 },
  { id: "two", value: 2 },
  { id: "one", value: 1 },
  { id: "multiply", value: "x" },
  { id: "clear", value: "C" },
  { id: "decimal", value: "." },
  { id: "equals", value: "=" },
  { id: "zero", value: 0 },
  { id: "divide", value: "/" }
];

const operators = ["C", "/", "x", "+", "-", "="];

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const ResultTab = ({ input, output }) => (
  <div className="output">
    <span className="result">{output}</span>
    <span id="display" className="input">
      {input}
    </span>
  </div>
);

const Calcboard = ({ handleInput }) => (
  <div className="keys">
    {calcKeyBoardData.map((key) => (
      <button key={key.id} id={key.id} onClick={() => handleInput(key.value)}>
        {key.value}
      </button>
    ))}
  </div>
);

export default function App() {
  const [input, setInput] = useState("0");
  const [output, setOutput] = useState("");
  const [calculatorData, setCalculatorData] = useState("");

  const handleEqualTo = () => {
    const total = eval(calculatorData);
    setInput(total);
    setOutput(`${total}`);
    setCalculatorData(`${total}`);
  };

  const handleClear = () => {
    setInput("0");
    setCalculatorData("");
  };

  const handleNumbers = (value) => {
    if (!calculatorData.length) {
      setInput(`${value}`);
      setCalculatorData(`${value}`);
    } else {
      if (value === 0 && (calculatorData === "0" || input === "0")) {
        setCalculatorData(`${calculatorData}`);
      } else {
        const lastChar = calculatorData.charAt(calculatorData.length - 1);
        const isLastCharOperator = operators.includes(lastChar);
        setInput(isLastCharOperator ? `${value}` : `${input}${value}`);
        setCalculatorData(`${calculatorData}${value}`);
      }
    }
  };

  const handleDotOperator = () => {
    const lastChar = calculatorData.charAt(calculatorData.length - 1);

    if (!calculatorData.length) {
      setInput("0.");
      setCalculatorData("0.");
    } else {
      if (operators.includes(lastChar)) {
        setInput("0.");
        setCalculatorData(`${calculatorData}0.`);
      } else {
        setInput(
          input.includes(".") || lastChar === "." ? `${input}` : `${input}.`
        );
        setCalculatorData(
          lastChar === "." || input.includes(".")
            ? `${calculatorData}`
            : `${calculatorData}.`
        );
      }
    }
  };

  const handleOperators = (operator) => {
    if (calculatorData.length) {
      setInput(`${operator}`);

      const validOperator = operator === "x" ? "*" : operator;

      const lastChar = calculatorData.charAt(calculatorData.length - 1);
      const isLastCharOperator =
        operators.includes(lastChar) || lastChar === "*";

      const beforeLastChar = calculatorData.charAt(calculatorData.length - 2);
      const beforeLastCharIsOperator =
        operators.includes(beforeLastChar) || beforeLastChar === "*";

      if (
        (isLastCharOperator && operator !== "-") ||
        (beforeLastCharIsOperator && isLastCharOperator)
      ) {
        if (beforeLastCharIsOperator) {
          const updatedValue = `${calculatorData.substring(
            0,
            calculatorData.length - 2
          )}${operator}`;
          setCalculatorData(updatedValue);
        } else {
          setCalculatorData(
            `${calculatorData.substring(
              0,
              calculatorData.length - 1
            )}${validOperator}`
          );
        }
      } else {
        setCalculatorData(`${calculatorData}${validOperator}`);
      }
    }
  };

  const handleInput = (value) => {
    const entered_number = numbers.find((number) => number === value);
    const entered_operator = operators.find((operator) => operator === value);

    switch (value) {
      case "=":
        handleEqualTo();
        break;
      case "C":
        handleClear();
        break;
      case entered_number:
        handleNumbers(value);
        break;
      case ".":
        handleDotOperator();
        break;
      case entered_operator:
        handleOperators(value);
        break;
      default:
        break;
    }
  };

  const handleOutput = () => {
    setOutput(calculatorData);
  };

  useEffect(() => {
    handleOutput();
  }, [calculatorData]);

  return (
    <div className="container">
      <div className="calculator">
        <ResultTab input={input} output={output} />
        <Calcboard handleInput={handleInput} />
      </div>
    </div>
  );
}
