import React, { useEffect, useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = (value) => {
    if (value === "=") {
      try {
        setResult(Function('"use strict";return (' + input + ')')());
      } catch {
        setResult("Error");
      }
    } else if (value === "C") {
      setInput("");
      setResult("");
    } else {
      setInput((prev) => prev + value);
    }
  };

  const handleKeyPress = (event) => {
    const { key } = event;
    if (/[0-9+\-*/.]/.test(key)) {
      setInput((prev) => prev + key);
    } else if (key === "Enter") {
      handleButtonClick("=");
    } else if (key === "Backspace") {
      setInput((prev) => prev.slice(0, -1));
    } else if (key === "Escape") {
      handleButtonClick("C");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="calculator">
      <div className="display">
        <div className="input">{input || "0"}</div>
        <div className="result">{result}</div>
      </div>
      <div className="buttons">
        {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+", "C"].map((char) => (
          <button key={char} onClick={() => handleButtonClick(char)}>
            {char}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
