class BinaryTree {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
/**
 * Calculates sum of all node depths in a binary tree
 * Time: O(n) where n is number of nodes
 * Space: O(h) where h is height of tree
 */
function getNodeDepths(root) {
    // Approach 1: Recursive DFS
    function calculateDepthsRecursive(node, depth = 0) {
        // Base case: empty node
        if (!node) return 0;

        // Current depth + sum of children's depths
        return depth +
            calculateDepthsRecursive(node.left, depth + 1) +
            calculateDepthsRecursive(node.right, depth + 1);
    }

    // Approach 2: Iterative using stack
    function calculateDepthsIterative(root) {
        if (!root) return 0;

        let sumOfDepths = 0;
        // Stack holds pairs of [node, depth]
        const stack = [[root, 0]];

        while (stack.length > 0) {
            const [currentNode, depth] = stack.pop();

            sumOfDepths += depth;

            // Process children
            if (currentNode.right) {
                stack.push([currentNode.right, depth + 1]);
            }
            if (currentNode.left) {
                stack.push([currentNode.left, depth + 1]);
            }
        }

        return sumOfDepths;
    }

    // For interview: Explain you're providing both approaches
    // and let interviewer choose which one to focus on
    return {
        recursive: calculateDepthsRecursive(root),
        iterative: calculateDepthsIterative(root)
    };
}

// Test cases
function runTests() {
    // Test 1: Basic tree
    console.log("Test 1: Basic tree");
    const tree1 = new BinaryTree(1);
    tree1.left = new BinaryTree(2);
    tree1.right = new BinaryTree(3);
    tree1.left.left = new BinaryTree(4);
    tree1.left.right = new BinaryTree(5);
    tree1.right.left = new BinaryTree(6);
    tree1.right.right = new BinaryTree(7);
    tree1.left.left.left = new BinaryTree(8);
    tree1.left.left.right = new BinaryTree(9);
// Test both solutions
    console.log(getNodeDepths(tree1));

    // Test 2: Empty tree
    console.log("\nTest 2: Empty tree");
    console.log(getNodeDepths(null));

    // Test 3: Single node
    console.log("\nTest 3: Single node");
    console.log(getNodeDepths(new BinaryTree(1)));

    // Test 4: Unbalanced tree
    console.log("\nTest 4: Unbalanced tree");
    const tree4 = new BinaryTree(1);
    tree4.left = new BinaryTree(2);
    tree4.left.left = new BinaryTree(3);
    tree4.left.left.left = new BinaryTree(4);
    console.log(getNodeDepths(tree4));
}

// Run tests
runTests();

/*
Common Follow-up Questions & Solutions:

1. What if we need to find the average depth?
   - Keep track of node count while calculating sum
   - Return sum/count at the end

2. What if we need to find the maximum depth sum for any path?
   function maxDepthSum(root, depth = 0) {
       if (!root) return 0;
       if (!root.left && !root.right) return depth;

       return Math.max(
           maxDepthSum(root.left, depth + 1),
           maxDepthSum(root.right, depth + 1)
       );
   }

3. How would you modify for n-ary trees?
   - Change node structure to have children array
   - Loop through children instead of just left/right

4. How to handle very large trees?
   - Use iterative solution to avoid stack overflow
   - Could implement level-by-level processing
   - Consider batch processing for extreme cases

5. What if we need to weight depths differently?
   - Add weight parameter to function
   - Multiply depth by weight in calculation
*/