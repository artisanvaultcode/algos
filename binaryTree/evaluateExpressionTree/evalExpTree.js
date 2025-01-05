// Binary Tree Node class definition
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Main function to evaluate expression tree
function evaluateExpressionTree(root) {
    // Edge case: empty tree
    if (!root) {
        throw new Error("Empty tree provided");
    }

    // Base case: leaf node (operand)
    if (root.value >= 0) {
        return root.value;
    }

    // Recursively evaluate left and right subtrees
    const leftValue = evaluateExpressionTree(root.left);
    const rightValue = evaluateExpressionTree(root.right);

    // Perform operation based on operator value
    switch (root.value) {
        case -1: // Addition
            return leftValue + rightValue;
        case -2: // Subtraction
            return leftValue - rightValue;
        case -3: // Division
            // Handle division by zero
            if (rightValue === 0) {
                throw new Error("Division by zero");
            }
            // JavaScript truncates towards zero with Math.trunc
            return Math.trunc(leftValue / rightValue);
        case -4: // Multiplication
            return leftValue * rightValue;
        default:
            throw new Error(`Invalid operator: ${root.value}`);
    }
}

// Helper function to create a test tree
function createTestTree(value, left = null, right = null) {
    const node = new TreeNode(value);
    node.left = left;
    node.right = right;
    return node;
}

// Test cases
function runTests() {
    // Test Case 1: Simple addition
    const test1 = createTestTree(-1,
        createTestTree(4),
        createTestTree(5)
    );
    console.log("Test 1 (4 + 5):", evaluateExpressionTree(test1)); // Expected: 9

    // Test Case 2: Complex expression
    const test2 = createTestTree(-1,
        createTestTree(-4,
            createTestTree(2),
            createTestTree(3)
        ),
        createTestTree(5)
    );
    console.log("Test 2 ((2 * 3) + 5):", evaluateExpressionTree(test2)); // Expected: 11

    // Test Case 3: Division with rounding
    const test3 = createTestTree(-3,
        createTestTree(7),
        createTestTree(2)
    );
    console.log("Test 3 (7 / 2):", evaluateExpressionTree(test3)); // Expected: 3

    // Test Case 4: Complex nested expression
    const test4 = createTestTree(-4,
        createTestTree(-1,
            createTestTree(2),
            createTestTree(3)
        ),
        createTestTree(-2,
            createTestTree(8),
            createTestTree(3)
        )
    );
    console.log("Test 4 ((2 + 3) * (8 - 3)):", evaluateExpressionTree(test4)); // Expected: 25

    try {
        // Test Case 5: Division by zero
        const test5 = createTestTree(-3,
            createTestTree(4),
            createTestTree(0)
        );
        evaluateExpressionTree(test5);
    } catch (error) {
        console.log("Test 5 (Division by zero):", error.message);
    }
}

// Run the tests
runTests();