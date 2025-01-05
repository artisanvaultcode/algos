// Main function to find all quadruplets that sum to target
function fourNumberSum(array, targetSum) {
    // Sort array for optimization and to avoid duplicates
    array.sort((a, b) => a - b);
    const quadruplets = [];
    const n = array.length;

    // Edge cases
    if (n < 4) return [];

    // Iterate through first number
    for (let i = 0; i < n - 3; i++) {
        // Skip duplicates for first number
        if (i > 0 && array[i] === array[i - 1]) continue;

        // Iterate through second number
        for (let j = i + 1; j < n - 2; j++) {
            // Skip duplicates for second number
            if (j > i + 1 && array[j] === array[j - 1]) continue;

            // Use two pointers for remaining sum
            let left = j + 1;
            let right = n - 1;

            while (left < right) {
                const currentSum = array[i] + array[j] + array[left] + array[right];

                if (currentSum === targetSum) {
                    quadruplets.push([array[i], array[j], array[left], array[right]]);

                    // Skip duplicates for third number
                    while (left < right && array[left] === array[left + 1]) left++;
                    // Skip duplicates for fourth number
                    while (left < right && array[right] === array[right - 1]) right--;

                    left++;
                    right--;
                } else if (currentSum < targetSum) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }

    return quadruplets;
}

// Optimized version with hash table for better average case
function fourNumberSumOptimized(array, targetSum) {
    const allPairSums = new Map();
    const quadruplets = [];

    // Build pairs after current number to avoid duplicates
    for (let i = 1; i < array.length - 1; i++) {
        // Look for remaining pairs that complete the sum
        for (let j = i + 1; j < array.length; j++) {
            const currentSum = array[i] + array[j];
            const difference = targetSum - currentSum;

            if (allPairSums.has(difference)) {
                for (const pair of allPairSums.get(difference)) {
                    quadruplets.push([...pair, array[i], array[j]]);
                }
            }
        }

        // Store pairs before current number
        for (let k = 0; k < i; k++) {
            const sum = array[k] + array[i];
            if (!allPairSums.has(sum)) {
                allPairSums.set(sum, []);
            }
            allPairSums.get(sum).push([array[k], array[i]]);
        }
    }

    return quadruplets;
}

// Test cases
function runTests() {
    // Test Case 1: Basic case
    console.log("Test Case 1:");
    const test1 = [7, 6, 4, -1, 1, 2];
    const target1 = 16;
    console.log(fourNumberSum(test1, target1));
    // Expected: [[7, 6, 4, -1]]

    // Test Case 2: Multiple solutions
    console.log("\nTest Case 2:");
    const test2 = [1, 0, -1, 0, -2, 2];
    const target2 = 0;
    console.log(fourNumberSum(test2, target2));
    // Expected: [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]

    // Test Case 3: No solution
    console.log("\nTest Case 3:");
    const test3 = [1, 2, 3, 4];
    const target3 = 20;
    console.log(fourNumberSum(test3, target3));
    // Expected: []

    // Test Case 4: Large numbers
    console.log("\nTest Case 4:");
    const test4 = [1000, 2000, 3000, 4000, -5000, -6000, 7000, 8000];
    const target4 = 16000;
    console.log(fourNumberSum(test4, target4));

    // Performance comparison
    console.log("\nPerformance Test:");
    const largeArray = Array.from({length: 100}, () =>
        Math.floor(Math.random() * 200) - 100);

    console.time('Sorted approach');
    fourNumberSum(largeArray, 100);
    console.timeEnd('Sorted approach');

    console.time('Hash table approach');
    fourNumberSumOptimized(largeArray, 100);
    console.timeEnd('Hash table approach');
}

runTests();