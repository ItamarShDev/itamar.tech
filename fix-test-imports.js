const fs = require('node:fs');
const path = require('node:path');

// Function to update import paths in a file
function updateTestFileImports(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Get the relative path from the test file to the lib directory
    const relativePathToLib = path.relative(
      path.dirname(filePath), 
      path.join(process.cwd(), 'lib')
    ).replace(/\\/g, '/'); // Ensure forward slashes for imports
    
    // Update imports to use the correct relative paths
    const updatedContent = content
      // Update relative imports to use the correct path to lib
      .replace(
        /from ['"](?:\.\/|(\.\.\/)+)([^'"\/]+)['"]/g, 
        (match, dots, moduleName) => {
          // Skip node_modules imports and absolute imports
          if (match.includes('node_modules') || !match.startsWith('from ".')) {
            return match;
          }
          
          // If it's a relative import, update it to point to the correct location in lib
          if (dots) {
            const depth = (dots.match(/\.\.\//g) || []).length;
            const newPath = '../'.repeat(depth) + moduleName;
            return `from '${newPath}'`;
          }
          
          // For local imports, use the path to lib
          return `from '${relativePathToLib}/hooks/${moduleName}'`;
        }
      );
    
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`✅ Updated imports in ${path.relative(process.cwd(), filePath)}`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

// Find all test files and update their imports
function updateAllTestImports() {
  const testDir = path.join(process.cwd(), '__tests__');
  
  function processDirectory(directory) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      
      if (entry.isDirectory()) {
        processDirectory(fullPath);
      } else if (entry.name.endsWith('.test.ts')) {
        updateTestFileImports(fullPath);
      }
    }
  }
  
  processDirectory(testDir);
  console.log('✅ All test import paths have been updated!');
}

// Run the updater
updateAllTestImports();
