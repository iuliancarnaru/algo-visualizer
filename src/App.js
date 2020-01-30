import React, { useState, useEffect } from "react";
import "./App.css";
import styled from "styled-components";

const App = () => {
  const [randomArr, setRandomArr] = useState([]);

  const generateRandomArray = () => {
    setRandomArr(
      Array(50)
        .fill()
        .map(() => Math.floor(Math.random() * 100) + 1)
    );
  };

  const bubbleSort = arr => {
    const swap = (arr, idx1, idx2) => {
      [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
    };
    let noSwaps;
    for (let i = arr.length; i > 0; i--) {
      noSwaps = true;
      for (let j = 0; j < i - 1; j++) {
        swap(arr, j, j + 1);
        noSwaps = false;
      }
      if (noSwaps) break;
    }
    return arr;
  };
  const selectionSort = arr => {
    const swap = (arr, idx1, idx2) => {
      [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
    };

    for (let i = 0; i < arr.length; i++) {
      let lowest = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[lowest]) {
          lowest = j;
        }
      }
      if (i !== lowest) swap(arr, i, lowest);
    }
    return arr;
  };

  const insertionSort = arr => {
    for (let i = 1; i < arr.length; i++) {
      let currentVal = arr[i];
      for (let j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
        arr[j + 1] = arr[j];
      }
      arr[j + 1] = currentVal;
    }
    return arr;
  };

  const mergeSort = () => {
    console.log(`merge sort`);
  };
  const quickSort = () => {
    console.log(`quick sort`);
  };
  const radixSort = () => {
    console.log(`radix sort`);
  };

  const [algorithms] = useState([
    { name: "random array", method: generateRandomArray },
    { name: "bubble sort", method: bubbleSort },
    { name: "selection sort", method: selectionSort },
    { name: "insertion sort", method: insertionSort },
    { name: "merge sort", method: mergeSort },
    { name: "quick sort", method: quickSort },
    { name: "radix sort", method: radixSort }
  ]);

  useEffect(() => {
    generateRandomArray();
  }, []);

  return (
    <div className="App">
      <h1>Algorithm visualizer</h1>
      <StyledContainer>
        {randomArr.map((number, index) => (
          <StyledBar key={index} height={(number / 100) * 100} />
        ))}
      </StyledContainer>
      {algorithms.map(algorithm => (
        <button key={algorithm.name} onClick={() => algorithm.method()}>
          {algorithm.name}
        </button>
      ))}
    </div>
  );
};

const StyledContainer = styled.div`
  width: 900px;
  height: 400px;
  margin: 0 auto;
  border: 0.5px solid grey;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const StyledBar = styled.div`
  width: 16px;
  height: ${({ height }) => height}%;
  background-color: green;
`;

export default App;
