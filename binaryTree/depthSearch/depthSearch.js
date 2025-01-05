// Node class with enhanced functionality
class Node {
    constructor(name, value = null) {
        this.name = name;
        this.value = value;  // Optional value for business logic
        this.children = [];
        this.visited = false;  // For cycle detection
    }

    addChild(name, value = null) {
        const child = new Node(name, value);
        this.children.push(child);
        return child;  // Return child for chaining
    }

    // Recursive DFS implementation
    depthFirstSearchRecursive(array = []) {
        if (!array) {
            throw new Error("Output array must be initialized");
        }

        // Add current node
        array.push(this.name);
        this.visited = t

        // Process all children from left to right
        for (const child of this.children) {
            if (!child.visited) {
                child.depthFirstSearchRecursive(array);
            }
        }

        // Reset visited flag for reuse
        this.visited = false;
        return array;
    }

    // Iterative DFS implementation using stack
    depthFirstSearchIterative(array = []) {
        if (!array) {
            throw new Error("Output array must be initialized");
        }

        const stack = [this];

        while (stack.length > 0) {
            const current = stack.pop();
            array.push(current.name);
            current.visited = true;

            // Add children in reverse order to maintain left-to-right traversal
            for (let i = current.children.length - 1; i >= 0; i--) {
                const child = current.children[i];
                if (!child.visited) {
                    stack.push(child);
                }
            }
        }

        // Reset visited flags
        this.resetVisited();
        return array;
    }

    // Helper method to reset visited flags
    resetVisited() {
        this.visited = false;
        for (const child of this.children) {
            child.resetVisited();
        }
    }

    // Advanced DFS with path tracking and depth information
    depthFirstSearchAdvanced(
        callback = null,
        maxDepth = Infinity,
        path = [],
        depth = 0
    ) {
        if (depth > maxDepth) return;

        // Current path and node information
        const nodeInfo = {
            name: this.name,
            value: this.value,
            depth: depth,
            path: [...path, this.name]
        };

        // Execute callback if provided
        if (callback) {
            callback(nodeInfo);
        }

        // Process children
        for (const child of this.children) {
            child.depthFirstSearchAdvanced(
                callback,
                maxDepth,
                nodeInfo.path,
                depth + 1
            );
        }
    }
}

// Test suite
function runTests() {
    // Test Case 1: Basic Tree
    console.log("\nTest Case 1: Basic Tree");
    const basicTree = new Node("A");
    basicTree.addChild("B").addChild("D");
    basicTree.addChild("C");

    console.log("Recursive DFS:", basicTree.depthFirstSearchRecursive([]));
    console.log("Iterative DFS:", basicTree.depthFirstSearchIterative([]));

    // Test Case 2: Complex Tree
    console.log("\nTest Case 2: Complex Tree");
    const complexTree = new Node("A");
    const bNode = complexTree.addChild("B");
    const cNode = complexTree.addChild("C");
    const dNode = complexTree.addChild("D");

    bNode.addChild("E");
    const fNode = bNode.addChild("F");
    cNode.addChild("G");
    dNode.addChild("H");
    dNode.addChild("K");
    fNode.addChild("I");
    fNode.addChild("J");

    console.log("Recursive DFS:", complexTree.depthFirstSearchRecursive([]));
    console.log("Iterative DFS:", complexTree.depthFirstSearchIterative([]));

    // Test Case 3: Advanced DFS with path tracking
    console.log("\nTest Case 3: Advanced DFS with path tracking");
    complexTree.depthFirstSearchAdvanced((nodeInfo) => {
        console.log(
            `Node: ${nodeInfo.name}, ` +
            `Depth: ${nodeInfo.depth}, ` +
            `Path: ${nodeInfo.path.join(" -> ")}`
        );
    });

    // Test Case 4: Error Handling
    console.log("\nTest Case 4: Error Handling");
    try {
        complexTree.depthFirstSearchRecursive(null);
    } catch (error) {
        console.log("Error caught:", error.message);
    }
}

// Run all tests
runTests();

/*
Key Interview Discussion Points:

1. Time Complexity:
   - O(V + E) where V is vertices and E is edges
   - Each node and edge visited exactly once

2. Space Complexity:
   - Recursive: O(H) where H is height of tree (recursion stack)
   - Iterative: O(W) where W is max width of tree (stack size)
   - Advanced: O(H) for path tracking

3. Trade-offs between implementations:
   - Recursive: Cleaner code but limited by call stack
   - Iterative: More complex code but better space efficiency
   - Advanced: Most flexible but higher overhead

4. Real-world applications:
   - File system traversal
   - DOM tree traversal
   - Network routing
   - Dependency resolution
*/