class FileNode {
    constructor(name, isDirectory, size = 0) {
        this.name = name;
        this.isDirectory = isDirectory;
        this.size = size;
        this.children = [];  // For directories
    }

    addChild(childNode) {
        this.children.push(childNode);
        return this;
    }
}

function analyzeFileSystem(root) {
    if (!root) return { totalDepth: 0, maxDepth: 0, pathAnalysis: [] };

    const analysis = {
        totalDepth: 0,          // Sum of all file/folder depths
        maxDepth: 0,            // Deepest nesting level
        averageDepth: 0,        // Average nesting level
        pathAnalysis: [],       // Details of each path
        depthDistribution: {},  // Count of items at each depth
    };

    function exploreFileSystem(node, path = [], depth = 0) {
        // Update analysis
        analysis.totalDepth += depth;
        analysis.maxDepth = Math.max(analysis.maxDepth, depth);

        // Track depth distribution
        analysis.depthDistribution[depth] = (analysis.depthDistribution[depth] || 0) + 1;

        // Record path details
        const fullPath = [...path, node.name].join('/');
        analysis.pathAnalysis.push({
            path: fullPath,
            depth: depth,
            type: node.isDirectory ? 'Directory' : 'File',
            size: node.size
        });

        // Recurse through children if it's a directory
        if (node.isDirectory) {
            for (const child of node.children) {
                exploreFileSystem(child, [...path, node.name], depth + 1);
            }
        }
    }

    exploreFileSystem(root);

    // Calculate average depth
    const totalItems = analysis.pathAnalysis.length;
    analysis.averageDepth = (analysis.totalDepth / totalItems).toFixed(2);

    return analysis;
}

// Create example file system structure
const rootDir = new FileNode('project', true);

// src directory
const srcDir = new FileNode('src', true);
srcDir.addChild(new FileNode('index.js', false, 1024))
    .addChild(new FileNode('styles.css', false, 512));

// components directory
const componentsDir = new FileNode('components', true);
componentsDir.addChild(new FileNode('Button.js', false, 256))
    .addChild(new FileNode('Card.js', false, 384))
    .addChild(new FileNode('Form.js', false, 640));

srcDir.addChild(componentsDir);

// utils directory with nested structure
const utilsDir = new FileNode('utils', true);
const helpersDir = new FileNode('helpers', true);
helpersDir.addChild(new FileNode('format.js', false, 128))
    .addChild(new FileNode('validate.js', false, 192));
utilsDir.addChild(helpersDir);
srcDir.addChild(utilsDir);

// Add src to root
rootDir.addChild(srcDir);

// Add config files to root
rootDir.addChild(new FileNode('package.json', false, 768))
    .addChild(new FileNode('README.md', false, 1280));

// Analyze the file system
const analysis = analyzeFileSystem(rootDir);

// Display results
console.log('\nFile System Analysis:');
console.log('===================');
console.log(`Total Path Depth Sum: ${analysis.totalDepth}`);
console.log(`Maximum Nesting Level: ${analysis.maxDepth}`);
console.log(`Average Nesting Level: ${analysis.averageDepth}`);

console.log('\nDepth Distribution:');
Object.entries(analysis.depthDistribution)
    .sort(([a], [b]) => a - b)
    .forEach(([depth, count]) => {
        console.log(`  Level ${depth}: ${count} items`);
    });

console.log('\nDetailed Path Analysis:');
analysis.pathAnalysis.forEach(({path, depth, type, size}) => {
    console.log(`${path}`);
    console.log(`  Depth: ${depth}`);
    console.log(`  Type: ${type}`);
    if (size) console.log(`  Size: ${size} bytes`);
    console.log();
});