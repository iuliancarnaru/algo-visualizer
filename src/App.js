import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [randomArr, setRandomArr] = useState([]);

  const generateRandomArray = () => {
    setRandomArr(
      Array(50)
        .fill()
        .map(number => Math.floor(Math.random() * 100) + 1)
    );
  };

  useEffect(() => {
    generateRandomArray();
  }, []);

  return (
    <div className="App">
      <h1>Algorithm visualizer</h1>
      {randomArr.map((number, index) => (
        <div key={index}>{number}</div>
      ))}
    </div>
  );
};

export default App;
