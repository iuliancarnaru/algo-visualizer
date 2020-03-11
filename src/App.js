import React, { useState, useEffect } from "react";
import "./App.css";
import styled from "styled-components";

const App = () => {
  const [randomArr, setRandomArr] = useState([]);

  const generateRandomArray = () => {
    setRandomArr(
      Array(50)
        .fill("")
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
      let j;
      for (j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
        arr[j + 1] = arr[j];
      }
      arr[j + 1] = currentVal;
    }
    return arr;
  };

  // mergeSort is splitted in 2 (merge and mergeSort called recursively)
  const merge = (arr1, arr2) => {
    let result = [];

    let i = 0;
    let j = 0;

    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] > arr2[j]) {
        result.push(arr2[j]);
        j++;
      } else {
        result.push(arr1[i]);
        i++;
      }
    }

    while (i < arr1.length) {
      result.push(arr1[i]);
      i++;
    }

    while (j < arr2.length) {
      result.push(arr2[j]);
      j++;
    }

    return result;
  };

  const mergeSort = arr => {
    if (arr.length <= 1) return arr;

    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));

    return merge(left, right);
  };

  // quicksort is splitted in 2 (pivot, quickSort)
  const pivot = (arr, start = 0, end = arr.length - 1) => {
    const swap = (arr, idx1, idx2) => {
      [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
    };

    let pivot = arr[start];
    let swapIdx = start;

    for (let i = start + 1; i <= end; i++) {
      if (pivot > arr[i]) {
        swapIdx++;
        swap(arr, swapIdx, i);
      }
    }

    swap(arr, start, swapIdx);
    return swapIdx;
  };

  const quickSort = (arr, left = 0, right = arr.length - 1) => {
    if (left < right) {
      let pivotIdx = pivot(arr, left, right);
      // left
      quickSort(arr, left, pivotIdx - 1);

      // right
      quickSort(arr, pivotIdx + 1, right);
    }
    return arr;
  };

  // radixsort is splitted in 2 (pivot, quickSort)
  const getDigit = (num, i) => {
    return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
  };

  const digitCount = num => {
    if (num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
  };

  const mostDigits = nums => {
    let maxDigits = 0;
    for (let i = 0; i < nums.length; i++) {
      maxDigits = Math.max(maxDigits, digitCount(nums[i]));
    }
    return maxDigits;
  };

  const radixSort = nums => {
    let maxDigitsCount = mostDigits(nums);
    for (let i = 0; i < maxDigitsCount; i++) {
      let digitBuckets = Array.from({ length: 10 }, () => []);
      for (let j = 0; j < nums.length; j++) {
        let digit = getDigit(nums[j], i);
        digitBuckets[digit].push(nums[j]);
      }
      nums = [].concat(...digitBuckets);
    }
    return nums;
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
