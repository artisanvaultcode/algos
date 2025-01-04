// Class for tree node
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Main function to get branch sums
function branchSums(root) {
    const sums = [];

    // Handle empty tree
    if (!root) return sums;

    // Helper function to calculate sums recursively
    function calculateSums(node, currentSum) {
        // Add current node's value to running sum
        currentSum += node.value;

        // If we're at a leaf, add the sum to our results
        if (!node.left && !node.right) {
            sums.push(currentSum);
            return;
        }

        // Recurse on existing children
        if (node.left) calculateSums(node.left, currentSum);
        if (node.right) calculateSums(node.right, currentSum);
    }

    calculateSums(root, 0);
    return sums;
}

// Test cases
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.left.left.left = new TreeNode(8);
root.left.left.right = new TreeNode(9);
root.left.right.left = new TreeNode(10);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);


console.log(branchSums(root)); // [7,8,4]