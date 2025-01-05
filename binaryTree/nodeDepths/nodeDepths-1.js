class BinaryTree {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Iterative solution using a stack
function nodeDepthsIterative(root) {
    if (!root) return 0;

    let depthSum = 0;
    const stack = [{node: root, depth: 0}];

    while (stack.length > 0) {
        const {node, depth} = stack.pop();

        // Add current node's depth to sum
        depthSum += depth;

        // Add children to stack with increased depth
        if (node.right) stack.push({node: node.right, depth: depth + 1});
        if (node.left) stack.push({node: node.left, depth: depth + 1});
    }

    return depthSum;
}

// Recursive solution
// function nodeDepthsRecursive(root, depth = 0) {
//     // Base case: empty node
//     if (!root) return 0;
//
//     // Return current depth plus sum of children's depths
//     return depth + nodeDepthsRecursive(root.left, depth + 1) +
//         nodeDepthsRecursive(root.right, depth + 1);
// }

const root = new BinaryTree(1);
root.left = new BinaryTree(2);
root.right = new BinaryTree(3);
root.left.left = new BinaryTree(4);
root.left.right = new BinaryTree(5);
root.right.left = new BinaryTree(6);
root.right.right = new BinaryTree(7);
root.left.left.left = new BinaryTree(8);
root.left.left.right = new BinaryTree(9);
// Test both solutions
console.log("Iterative Solution:", nodeDepthsIterative(root));  // Should output: 16
// console.log("Recursive Solution:", nodeDepthsRecursive(root));  // Should output: 16
