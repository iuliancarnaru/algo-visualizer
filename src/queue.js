// Queue FIFO
// with arrays [push -> shift], [unshift -> pop]
// linked list implementation

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  enqueue(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    return ++this.length;
  }

  dequeue() {
    if (!this.head) return null;
    let temp = this.head;

    if (this.head === this.tail) {
      this.tail = null;
    }
    this.head = this.head.next;
    this.length--;
    return temp.val;
  }
}

// let stack = new Stack();