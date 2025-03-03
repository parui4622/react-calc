import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./Calculator.css";

const Calculator = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const [history, setHistory] = useState([]); // Stores calculation history
    const [showHistory, setShowHistory] = useState(false); // Controls history panel visibility

    // Function to handle button clicks
    const handleButtonClick = (value) => {
        if (value === "=") {
            try {
                const res = eval(input);
    
                setHistory((prevHistory) => {
                    const newEntry = `${input} = ${res}`;
                    return prevHistory.includes(newEntry) ? prevHistory : [...prevHistory, newEntry];
                });
    
                setResult(res);
                setInput(res.toString());
            } catch {
                setResult("Error");
            }
        } else if (value === "C") {
            setInput("");
            setResult("");
        } else if (value === "√") {
            try {
                const res = Math.sqrt(eval(input));
                setResult(res);
                setInput(res.toString());
            } catch {
                setResult("Error");
            }
        } else if (value === "%") {
            try {
                const res = eval(input) / 100;
                setResult(res);
                setInput(res.toString());
            } catch {
                setResult("Error");
            }
        } else {
            setInput((prev) => prev + value);
        }
    };
    
    

    // Function to handle keyboard input
    const handleKeyPress = (event) => {
        const { key } = event;
    
        if (/[0-9+\-*/.%]/.test(key)) {
            setInput((prev) => prev + key);
        } else if (key === "Enter") {
            event.preventDefault(); // Prevents page refresh
    
            if (input.trim() === "") return; // Prevents evaluating an empty string
    
            try {
                const res = eval(input);
    
                setHistory((prevHistory) => {
                    const newEntry = `${input} = ${res}`;
                    return prevHistory.includes(newEntry) ? prevHistory : [...prevHistory, newEntry];
                });
    
                setResult(res);
                setInput(res.toString());
            } catch {
                setResult("Error");
            }
        } else if (key === "Backspace") {
            setInput((prev) => prev.slice(0, -1));
        } else if (key === "Escape") {
            handleButtonClick("C");
        }
    };
    
    

    // Add keyboard event listener
    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [input]);

    // Function to clear history
    const clearHistory = () => {
        setHistory([]);
    };

    return (
        <motion.div className="calculator"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Display Section */}
            <motion.div className="display"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
            >
                <div className="input">{input || "0"}</div>
                <div className="result">{result}</div>
            </motion.div>

            {/* Buttons Section */}
            <div className="buttons">
                {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+", "C", "%", "√"].map((char) => (
                    <motion.button key={char}
                        className="button"
                        whileTap={{ scale: 0.8 }}
                        onClick={() => handleButtonClick(char)}
                    >
                        {char}
                    </motion.button>
                ))}
            </div>

            {/* Toggle History Panel Button */}
            <button className="toggle-history" onClick={() => setShowHistory(!showHistory)}>
                {showHistory ? "Hide History" : "Show History"}
            </button>

            {/* History Panel */}
            {showHistory && (
                <motion.div className="history-panel"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <h3>Calculation History</h3>
                    <ul>
                        {history.map((item, index) => (
                            <motion.li key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                {item}
                            </motion.li>
                        ))}
                    </ul>
                    <button className="clear-history" onClick={clearHistory}>Clear History</button>
                </motion.div>
            )}
        </motion.div>
    );
};

export default Calculator;
