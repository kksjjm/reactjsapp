import { useState, useEffect } from "react";
import Button from "./Button";
import styles from "./App.module.css";

import TimeConverter from "./TimeConverter";
import DistanceConverter from "./DistanceConverter";
import WeightConverter from "./WeightConverter";
import TodoApp from "./TodoApp";
import CryptoPriceList from "./CryptoPriceList";

function App() {
  const [activeConverter, setActiveConverter] = useState("0");

  // Array of available converters
  const converters = [
    { id: "0", name: "Time Converter", component: TimeConverter },
    { id: "1", name: "Distance Converter", component: DistanceConverter },
    { id: "2", name: "Weight Converter", component: WeightConverter },
    { id: "3", name: "TodoApp", component: TodoApp },
    { id: "4", name: "CryptoPriceList", component: CryptoPriceList },
    // Add more converters here
  ];

  const handleConverterChange = (event) => {
    setActiveConverter(event.target.value);
  };

  // Find the active converter component
  const ActiveConverterComponent = converters.find(
    (c) => c.id === activeConverter
  )?.component;

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Applications</h1>
        <div>
          <label>
            Choose a converter:
            <select value={activeConverter} onChange={handleConverterChange}>
              {converters.map((converter) => (
                <option key={converter.id} value={converter.id}>
                  {converter.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        {ActiveConverterComponent && <ActiveConverterComponent />}
      </header>
    </div>
  );
}

export default App;
