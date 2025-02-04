from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:

    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None

        right = self.invertTree(root.right)
        left = self.invertTree(root.left)
        root.left = right
        root.right = left
        return root

def createTree():
    # Create a tree:
    #      4
    #    /   \
    #   2     7
    #  / \   / \
    # 1   3 6   9

    root = TreeNode(4)
    root.left = TreeNode(2)
    root.right = TreeNode(7)
    root.left.left = TreeNode(1)
    root.left.right = TreeNode(3)
    root.right.left = TreeNode(6)
    root.right.right = TreeNode(9)
    return root

def printLevelOrder(root):
    if not root:
        return

    queue = [root]
    result = []

    while queue:
        level_size = len(queue)
        level = []

        for _ in range(level_size):
            node = queue.pop(0)
            level.append(str(node.val))

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(' '.join(level))

    return '\n'.join(result)

if __name__ == "__main__":
    # Create original tree
    root = createTree()
    print("Original Tree:")
    print(printLevelOrder(root))

    # Invert the tree
    solution = Solution()
    inverted_root = solution.invertTree(root)

    print("\nInverted Tree:")
    print(printLevelOrder(inverted_root))