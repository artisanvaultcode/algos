function minCost(grid) {
    const m = grid.length;
    const n = grid[0].length;

    // Create cost matrix initialized with Infinity
    const costs = Array(m).fill().map(() => Array(n).fill(Infinity));
    costs[0][0] = 0;

    // Priority queue for Dijkstra's algorithm
    // Each element is [row, col, currentCost]
    const queue = [[0, 0, 0]];

    // All possible directions: right, left, down, up
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    while (queue.length > 0) {
        // Get the cell with minimum cost
        queue.sort((a, b) => a[2] - b[2]);
        const [row, col, currentCost] = queue.shift();

        // Skip if we've found a better path to this cell
        if (currentCost > costs[row][col]) continue;

        // Try all four directions
        for (let i = 0; i < 4; i++) {
            const newRow = row + directions[i][0];
            const newCol = col + directions[i][1];

            // Skip if out of bounds
            if (newRow < 0 || newRow >= m || newCol < 0 || newCol >= n) continue;

            // Calculate new cost
            // If current sign points to this direction, cost is 0
            // Otherwise, we need to change the sign, cost is 1
            const signPoints = getDirectionNumber(grid[row][col]);
            const additionalCost = (i + 1 === signPoints) ? 0 : 1;
            const newCost = currentCost + additionalCost;

            // If we found a better path, update cost and add to queue
            if (newCost < costs[newRow][newCol]) {
                costs[newRow][newCol] = newCost;
                queue.push([newRow, newCol, newCost]);
            }
        }
    }

    return costs[m - 1][n - 1];
}

// Helper function to convert grid value to direction index
function getDirectionNumber(value) {
    return value; // Since the grid values already match our direction indexing
}

// Test cases
const test1 = [
    [1, 1, 1, 1],
    [2, 2, 2, 2],
    [1, 1, 1, 1],
    [2, 2, 2, 2]
];
console.log("Test 1:", minCost(test1)); // Expected: 3

const test2 = [
    [1, 1, 3],
    [3, 2, 2],
    [1, 1, 4]
];
console.log("Test 2:", minCost(test2)); // Expected: 0

const test3 = [
    [1, 2],
    [4, 3]
];
console.log("Test 3:", minCost(test3)); // Expected: 1