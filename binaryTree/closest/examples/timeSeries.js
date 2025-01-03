class TimeSeriesNode {
    constructor(timestamp, value) {
        this.timestamp = timestamp;  // Unix timestamp
        this.value = value;         // Data value at this timestamp
        this.left = null;
        this.right = null;
        this.count = 1;            // Number of nodes in subtree (for balancing)
    }
}

class TimeSeriesBST {
    constructor() {
        this.root = null;
    }

    // Insert a new time series data point
    insert(timestamp, value) {
        this.root = this._insertRec(this.root, timestamp, value);
    }

    _insertRec(node, timestamp, value) {
        if (node === null) {
            return new TimeSeriesNode(timestamp, value);
        }

        if (timestamp < node.timestamp) {
            node.left = this._insertRec(node.left, timestamp, value);
        } else if (timestamp > node.timestamp) {
            node.right = this._insertRec(node.right, timestamp, value);
        } else {
            // Update value if timestamp already exists
            node.value = value;
        }

        node.count = 1 + this._getCount(node.left) + this._getCount(node.right);
        return node;
    }

    _getCount(node) {
        return node ? node.count : 0;
    }

    // Find closest timestamp to target
    findClosestTimestamp(targetTimestamp) {
        if (!this.root) return null;

        let closest = this.root;
        let minDiff = Math.abs(targetTimestamp - this.root.timestamp);

        const findClosest = (node) => {
            if (!node) return;

            const currentDiff = Math.abs(targetTimestamp - node.timestamp);
            if (currentDiff < minDiff) {
                minDiff = currentDiff;
                closest = node;
            }

            if (targetTimestamp < node.timestamp) {
                findClosest(node.left);
            } else if (targetTimestamp > node.timestamp) {
                findClosest(node.right);
            }
        };

        findClosest(this.root);
        return closest;
    }

    // Find data points within a time range
    findInTimeRange(startTime, endTime) {
        const result = [];

        const collectInRange = (node) => {
            if (!node) return;

            if (node.timestamp >= startTime && node.timestamp <= endTime) {
                result.push({ timestamp: node.timestamp, value: node.value });
            }

            if (startTime < node.timestamp) {
                collectInRange(node.left);
            }
            if (endTime > node.timestamp) {
                collectInRange(node.right);
            }
        };

        collectInRange(this.root);
        return result.sort((a, b) => a.timestamp - b.timestamp);
    }

    // Calculate moving average over a time window
    calculateMovingAverage(targetTimestamp, windowSize) {
        const halfWindow = windowSize / 2;
        const startTime = targetTimestamp - halfWindow;
        const endTime = targetTimestamp + halfWindow;

        const pointsInRange = this.findInTimeRange(startTime, endTime);

        if (pointsInRange.length === 0) return null;

        const sum = pointsInRange.reduce((acc, point) => acc + point.value, 0);
        return sum / pointsInRange.length;
    }

    // Detect anomalies based on standard deviation
    detectAnomalies(threshold = 2) {
        const values = [];
        const anomalies = [];

        // Collect all values
        const collectValues = (node) => {
            if (!node) return;
            values.push(node.value);
            collectValues(node.left);
            collectValues(node.right);
        };

        collectValues(this.root);

        // Calculate mean and standard deviation
        const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
        const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
        const stdDev = Math.sqrt(variance);

        // Detect anomalies
        const checkAnomalies = (node) => {
            if (!node) return;

            const zScore = Math.abs((node.value - mean) / stdDev);
            if (zScore > threshold) {
                anomalies.push({
                    timestamp: node.timestamp,
                    value: node.value,
                    zScore: zScore
                });
            }

            checkAnomalies(node.left);
            checkAnomalies(node.right);
        };

        checkAnomalies(this.root);
        return anomalies;
    }
}

// Example usage with stock price data
const demo = () => {
    const stockPrices = new TimeSeriesBST();

    // Insert sample stock price data
    const now = Date.now();
    const minute = 60 * 1000;

    stockPrices.insert(now - 5 * minute, 150.25);
    stockPrices.insert(now - 4 * minute, 151.50);
    stockPrices.insert(now - 3 * minute, 149.75);
    stockPrices.insert(now - 2 * minute, 180.00); // Anomaly
    stockPrices.insert(now - 1 * minute, 151.25);
    stockPrices.insert(now, 150.75);

    // Find closest price to a specific timestamp
    const targetTime = now - 2.5 * minute;
    const closest = stockPrices.findClosestTimestamp(targetTime);
    console.log('Closest price point:', {
        timestamp: new Date(closest.timestamp).toISOString(),
        price: closest.value
    });

    // Calculate moving average
    const movingAvg = stockPrices.calculateMovingAverage(now - 2 * minute, 3 * minute);
    console.log('Moving average:', movingAvg);

    // Detect anomalies
    const anomalies = stockPrices.detectAnomalies(2);
    console.log('Detected anomalies:', anomalies.map(a => ({
        timestamp: new Date(a.timestamp).toISOString(),
        price: a.value,
        zScore: a.zScore.toFixed(2)
    })));
};

// Run the demo
demo();