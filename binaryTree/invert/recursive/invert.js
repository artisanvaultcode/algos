/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if (!root) {
        return null;
    }

    const queue = [root];

    while (queue.length > 0) {
        const current = queue.shift();

        // Swap the left and right children
        [current.left, current.right] = [current.right, current.left];

        if (current.left) {
            queue.push(current.left);
        }

        if (current.right) {
            queue.push(current.right);
        }
    }

    return root;
};

function printTree(root) {
    if (!root) {
        return [];
    }

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);

            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }

        result.push(currentLevel);
    }

    return result;
}

function printTreeVisual(root) {
    if (!root) {
        return "Empty tree";
    }

    const levels = printTree(root);
    return levels.map(level => level.join(" ")).join("\n");
}

function printTreeStructure(root) {
    if (!root) {
        return "Empty tree";
    }

    // Function to get the height of the tree
    function getHeight(node) {
        if (!node) return 0;
        return 1 + Math.max(getHeight(node.left), getHeight(node.right));
    }

    // Function to get string length
    function getSpacing(height) {
        return Math.pow(2, height) - 1;
    }

    const height = getHeight(root);
    const levels = [];
    const queue = [[root, 0]];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];
        const edges = [];

        for (let i = 0; i < levelSize; i++) {
            const [node, position] = queue.shift();
            currentLevel.push([node.val, position]);

            if (node.left) {
                queue.push([node.left, position * 2]);
            }
            if (node.right) {
                queue.push([node.right, position * 2 + 1]);
            }
        }
        levels.push(currentLevel);
    }

    let result = "";
    for (let i = 0; i < levels.length; i++) {
        const spacing = getSpacing(height - i);
        let levelStr = " ".repeat(spacing);

        // Add node values
        for (let [val, pos] of levels[i]) {
            levelStr += val;
            levelStr += " ".repeat(spacing * 2 + 1);
        }

        result += levelStr + "\n";

        // Add edges except for the last level
        if (i < levels.length - 1) {
            let edgeStr = " ".repeat(spacing - 1);
            for (let [val, pos] of levels[i]) {
                const hasLeft = levels[i + 1].some(([_, p]) => p === pos * 2);
                const hasRight = levels[i + 1].some(([_, p]) => p === pos * 2 + 1);

                if (hasLeft) edgeStr += "/";
                else edgeStr += " ";

                edgeStr += " ".repeat(spacing - 1);

                if (hasRight) edgeStr += "\\";
                else edgeStr += " ";

                edgeStr += " ".repeat(spacing);
            }
            result += edgeStr + "\n";
        }
    }

    return result;
}
// Test cases
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

// Test case:
//     4
//    / \
//   2   7
//  / \ / \
// 1  3 6  9
const tree = new TreeNode(4);
tree.left = new TreeNode(2);
tree.right = new TreeNode(7);
tree.left.left = new TreeNode(1);
tree.left.right = new TreeNode(3);
tree.right.left = new TreeNode(6);
tree.right.right = new TreeNode(9);


console.log("Original tree:");
console.log(printTreeStructure(tree));

const invertedTree = invertTree(tree);
console.log("\nInverted tree:");
console.log(printTreeStructure(invertedTree));