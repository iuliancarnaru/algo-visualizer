class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
    constructor() {
      this.root = null;
    }

    insert(value) {
      let newNode = new Node(value);
      if (this.root === null) {
        this.root = newNode;
        return this;
      } else {
        let current = this.root;
        while (true) {
          if (value === current.value) return undefined;
          if (value < current.value) {
            if (current.left === null) {
              current.left = newNode;
              return this;
            } else {
              current = current.left;
            }
          } else if (value > current.value) {
            if (current.right === null) {
              current.right = newNode;
              return this;
            } else {
              current = current.right;
            }
          }
        }
      }
    }

    contains(value) {
      if (this.root === null) return false;
      let current = this.root;
      let found = false;
      while (!found && current) {
        if (value < current.value) {
          current = current.left;
        } else if (value > current.value) {
          current = current.right;
        } else {
          return true
        }
      }
      return false;
    }

    BFS() {
      let data = [];
      let queue = [];
      let node = this.root;
      queue.push(node);
      while (queue.length) {
        node = queue.shift();
        data.push(node.value);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
      return data;
    }

    // pre-order
    DFSPreOrder() {
      let data = [];
      // you can choose a different starting point in the tree
      let current = this.root;
      function traverse(node) {
        data.push(node.value);
        if (node.left) traverse(node.left);
        if (node.right) traverse(node.right);
      }
      traverse(current);
      return data;
    }

    // post-order
    DFSPostOrder() {
      let data = [];
      function traverse(node) {
        if (node.left) traverse(node.left);
        if (node.right) traverse(node.right);
        data.push(node.value);
      }
      traverse(this.root);
      return data;
    }
    // in-order
}

// let tree = new BinarySearchTree();
// tree.root = new Node(10);
// tree.root.right = new Node(15);
// tree.root.left = new Node(7);
// tree.root.left.right = new Node(9);
