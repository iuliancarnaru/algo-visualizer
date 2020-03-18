// basic hash function (only strings)
function basicHash(key, arrLength) {
  let total = 0;
  for (let char of key) {
    let value = char.charCodeAt(0) - 96;
    total = (total + value) % arrLength;
  }
  return total;
}

// arrLength should be a prime number (to avoid collisions)
function advancedHash(key, arrLength) {
  let total = 0;
  let WEIRD_PRIME = 31;
  for (let i=0; i < Math.min(key.length, 100); i++) {
    let char = key[i];
    let value = char.charCodeAt(0) - 96;
    total = (total * WEIRD_PRIME + value) % arrLength;
  }
  return total;
}

class HashTable {
  constructor(size=53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    let WIRED_PRIME = 31;
    for (let i=0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96;
      total = (total * WIRED_PRIME + value) % this.keyMap.length;
    }
    return total;
  }

  set(key, value) {
    let index = this._hash(key);
    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }
    this.keyMap[index].push([key, value]);
  }

  get(key) {
    let index = this._hash(key);
    if (this.keyMap[index]) {
      for (let i=0; i < this.keyMap[index].length; i++) {
        if (this.keyMap[index][i][0] === key) {
          // return value associated with the key
          return this.keyMap[index][i][1];
        }
      }
    }
    return undefined;
  }

  keys() {
    let keysArray = [];
    for (let i=0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j=0; j < this.keyMap[i].length; j++) {
          if (!keysArray.includes((this.keyMap[i][j][0]))) {
            keysArray.push(this.keyMap[i][j][0]);
          }
        }
      }
    }
    return keysArray;
  }

  values() {
    let valuesArray = [];
    for (let i=0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j=0; j < this.keyMap[i].length; j++) {
          if (!valuesArray.includes((this.keyMap[i][j][1]))) {
            valuesArray.push(this.keyMap[i][j][1]);
          }
        }
      }
    }
    return valuesArray;
  }
}

let ht = new HashTable();
ht.set("greeting", "hello world");
ht.get("greeting");

ht.keys().forEach(function(key) {
  console.log(ht.get(key));
});