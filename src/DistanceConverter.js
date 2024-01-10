import React, { useState } from "react";

function DistanceConverter() {
  const [kilometers, setKilometers] = useState("");
  const [miles, setMiles] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  const handleKilometersChange = (e) => {
    const km = e.target.value;
    setKilometers(km);
    setMiles(km ? (km / 1.60934).toFixed(2) : ""); // Convert to miles and format, if km is not empty
  };

  const handleMilesChange = (e) => {
    const mi = e.target.value;
    setMiles(mi);
    setKilometers(mi ? (mi * 1.60934).toFixed(2) : ""); // Convert to kilometers and format, if mi is not empty
  };

  const resetFields = () => {
    setKilometers("");
    setMiles("");
    setIsFlipped(false);
  };

  const flipFields = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Distance Converter</h1>
        <div>
          <label>
            Kilometers:
            <input
              type="number"
              value={kilometers}
              onChange={handleKilometersChange}
              placeholder="Enter kilometers"
              disabled={isFlipped}
            />
            <p>{isFlipped && `${kilometers} kilometers is ${miles} miles`}</p>
          </label>
        </div>
        <div>
          <label>
            Miles:
            <input
              type="number"
              value={miles}
              onChange={handleMilesChange}
              placeholder="Enter miles"
              disabled={!isFlipped}
            />
            <p>{!isFlipped && `${miles} miles is ${kilometers} kilometers`}</p>
          </label>
        </div>
        <button onClick={resetFields}>Reset</button>
        <button onClick={flipFields}>Flip</button>
      </header>
    </div>
  );
}

export default DistanceConverter;
