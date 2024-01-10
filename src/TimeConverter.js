import React, { useState } from "react";

function TimeConverter() {
  const [minutes, setMinutes] = useState("");
  const [hours, setHours] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMinutesChange = (e) => {
    const min = e.target.value;
    setMinutes(min);
    setHours(min / 60);
  };

  const handleHoursChange = (e) => {
    const hrs = e.target.value;
    setHours(hrs);
    setMinutes(hrs * 60);
  };

  const resetFields = () => {
    setMinutes("");
    setHours("");
    setIsFlipped(false);
  };

  const flipFields = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Time Converter</h1>
        <div>
          <label>
            Minutes:
            <input
              type="number"
              value={minutes}
              onChange={handleMinutesChange}
              placeholder="Enter minutes"
              disabled={isFlipped}
            />
            <p>{isFlipped ? `${minutes} minutes is ${hours} hours` : ""}</p>
          </label>
        </div>
        <div>
          <label>
            Hours:
            <input
              type="number"
              value={hours}
              onChange={handleHoursChange}
              placeholder="Enter hours"
              disabled={!isFlipped}
            />
            <p>{!isFlipped ? `${hours} hours is ${minutes} minutes` : ""}</p>
          </label>
        </div>
        <button onClick={resetFields}>Reset</button>
        <button onClick={flipFields}>Flip</button>
      </header>
    </div>
  );
}

export default TimeConverter;
