/**
 * Node class for doubly linked list
 * @private
 */
class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    if (capacity <= 0) throw new Error("Capacity must be positive");

    // Initialize capacity and cache Map
    this.capacity = capacity;
    this.cache = new Map();

    // Initialize dummy head and tail nodes
    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
};

/**
 * Get value from cache and mark as most recently used
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    const node = this.cache.get(key);
    if (!node) return -1;

    // Move to front (most recently used)
    this._removeNode(node);
    this._addToFront(node);

    return node.value;
};

/**
 * Add or update key-value pair in cache
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    // Check if key exists
    const existingNode = this.cache.get(key);

    if (existingNode) {
        // Update existing node
        existingNode.value = value;
        this._removeNode(existingNode);
        this._addToFront(existingNode);
    } else {
        // Create new node
        const newNode = new Node(key, value);

        // Check if cache is at capacity
        if (this.cache.size >= this.capacity) {
            // Remove least recently used (last node before tail)
            const lru = this.tail.prev;
            this._removeNode(lru);
            this.cache.delete(lru.key);
        }

        // Add new node
        this.cache.set(key, newNode);
        this._addToFront(newNode);
    }
};

/**
 * Remove node from linked list
 * @private
 */
LRUCache.prototype._removeNode = function(node) {
    const prev = node.prev;
    const next = node.next;
    prev.next = next;
    next.prev = prev;
};

/**
 * Add node to front of linked list (most recently used)
 * @private
 */
LRUCache.prototype._addToFront = function(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

// Example usage:
function runExample() {
    // Create cache with capacity 2
    const cache = new LRUCache(2);

    // Test operations
    cache.put(1, 1);    // Cache: [1: 1]
    cache.put(2, 2);    // Cache: [2: 2, 1: 1]
    console.log(cache.get(1));       // returns 1, Cache: [1: 1, 2: 2]
    cache.put(3, 3);    // evicts key 2, Cache: [3: 3, 1: 1]
    console.log(cache.get(2));       // returns -1 (not found)
    cache.put(4, 4);    // evicts key 1, Cache: [4: 4, 3: 3]
    console.log(cache.get(1));       // returns -1 (not found)
    console.log(cache.get(3));       // returns 3
    console.log(cache.get(4));       // returns 4
}

// Time Complexity:
// - get: O(1)
// - put: O(1)

// Space Complexity:
// - O(capacity) for storing nodes
// - O(1) additional space for dummy nodes

runExample()