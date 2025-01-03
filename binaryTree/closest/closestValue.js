// Step 1: Define the node structure
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
/**
 * Approach 1: Binary Search Approach (Optimal Solution)
 * Time Complexity: O(log n) for balanced BST, O(n) worst case
 * Space Complexity: O(1)
 */
function findClosestValue(root, target) {
    // Edge case: empty tree
    if (!root) return null;

    let closest = root.value;
    let current = root;

    while (current !== null) {
        // Update closest if current value is closer to target
        if (Math.abs(target - closest) > Math.abs(target - current.value)) {
            closest = current.value;
        }

        // Use BST property to traverse
        if (target < current.value) {
            current = current.left;
        } else if (target > current.value) {
            current = current.right;
        } else {
            // Found exact match
            return current.value;
        }
    }

    return closest;
}

/**
 * Approach 2: Recursive Inorder Traversal
 * Time Complexity: O(n)
 * Space Complexity: O(h) where h is height of tree
 */
function findClosestValueInorder(root, target) {
    let closest = { value: root.value, diff: Math.abs(root.value - target) };

    function inorderTraversal(node) {
        if (!node) return;

        // Left subtree
        inorderTraversal(node.left);

        // Process current node
        const currentDiff = Math.abs(node.value - target);
        if (currentDiff < closest.diff) {
            closest.value = node.value;
            closest.diff = currentDiff;
        }

        // Right subtree
        inorderTraversal(node.right);
    }

    inorderTraversal(root);
    return closest.value;
}

/**
 * Follow-up 1: Find K Closest Values
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function findKClosestValues(root, target, k) {
    const values = [];

    // Collect all values with their differences
    function inorder(node) {
        if (!node) return;
        inorder(node.left);
        values.push({
            value: node.value,
            diff: Math.abs(node.value - target)
        });
        inorder(node.right);
    }

    inorder(root);

    // Sort by difference and get k closest
    return values
        .sort((a, b) => a.diff - b.diff)
        .slice(0, k)
        .map(item => item.value);
}

// Test cases
function runTests() {
    // Create test tree:
    //       10
    //      /  \
    //     5    15
    //    / \   / \
    //   2   5 13  22
    //  /      \
    // 1        14

    const root = new Node(10);
    root.left = new Node(5);
    root.right = new Node(15);
    root.left.left = new Node(2);
    root.left.right = new Node(5);
    root.left.left.left = new Node(1);
    root.right.left = new Node(13);
    root.right.right = new Node(22);
    root.right.left.right = new Node(14);

    // Test cases for basic closest value
    console.log("\nTesting findClosestValue (Optimal Approach):");
    const testCases = [12, 4, 17, 0, 23];
    testCases.forEach(target => {
        console.log(`Target: ${target}, Closest: ${findClosestValue(root, target)}`);
    });

    // Test cases for inorder approach
    console.log("\nTesting findClosestValueInorder:");
    testCases.forEach(target => {
        console.log(`Target: ${target}, Closest: ${findClosestValueInorder(root, target)}`);
    });

    // Test K closest values
    console.log("\nTesting findKClosestValues (k=3):");
    testCases.forEach(target => {
        console.log(`Target: ${target}, 3 Closest: ${findKClosestValues(root, target, 3)}`);
    });

    // Edge cases
    console.log("\nTesting Edge Cases:");
    const singleNode = new Node(1);
    console.log("Single node tree, target 0:", findClosestValue(singleNode, 0));
    console.log("Empty tree:", findClosestValue(null, 5));
}

// Run all tests
runTests();

/*
Key Interview Points to Mention:

1. Time Complexity Analysis:
   - Optimal approach: O(log n) for balanced BST, O(n) worst case
   - Inorder approach: O(n) always
   - K closest values: O(n log n) due to sorting

2. Space Complexity:
   - Optimal approach: O(1)
   - Recursive approach: O(h) where h is height
   - K closest values: O(n) for storing all values

3. Optimizations Made:
   - Early termination on exact match
   - Using BST property to traverse efficiently
   - Handling edge cases (null root)

4. Trade-offs:
   - Iterative vs Recursive
   - Memory vs Time complexity
   - Simplicity vs Performance

5. Follow-up Improvements:
   - Could use a min heap for k closest values
   - Could handle duplicate values differently
   - Could optimize for unbalanced trees
*/