import React, { useState } from "react";

function WeightConverter() {
  const [kilograms, setKilograms] = useState("");
  const [pounds, setPounds] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  const handleKilogramsChange = (e) => {
    const kg = e.target.value;
    setKilograms(kg);
    setPounds(kg ? (kg * 2.20462).toFixed(2) : ""); // 1 kilogram is approximately 2.20462 pounds
  };

  const handlePoundsChange = (e) => {
    const lbs = e.target.value;
    setPounds(lbs);
    setKilograms(lbs ? (lbs / 2.20462).toFixed(2) : ""); // 1 pound is approximately 0.453592 kilograms
  };

  const resetFields = () => {
    setKilograms("");
    setPounds("");
    setIsFlipped(false);
  };

  const flipFields = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weight Converter</h1>
        <div>
          <label>
            Kilograms:
            <input
              type="number"
              value={kilograms}
              onChange={handleKilogramsChange}
              placeholder="Enter kilograms"
              disabled={isFlipped}
            />
            <p>
              {isFlipped ? `${kilograms} kilograms is ${pounds} pounds` : ""}
            </p>
          </label>
        </div>
        <div>
          <label>
            Pounds:
            <input
              type="number"
              value={pounds}
              onChange={handlePoundsChange}
              placeholder="Enter pounds"
              disabled={!isFlipped}
            />
            <p>
              {!isFlipped ? `${pounds} pounds is ${kilograms} kilograms` : ""}
            </p>
          </label>
        </div>
        <button onClick={resetFields}>Reset</button>
        <button onClick={flipFields}>Flip</button>
      </header>
    </div>
  );
}

export default WeightConverter;
