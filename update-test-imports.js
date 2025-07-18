const fs = require('fs');
const path = require('path');

// Function to update import paths in a file
function updateImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Update relative imports to point to the correct location
  // This regex looks for imports from the current directory (./module)
  const updatedContent = content.replace(
    /from ['"](?:\.\/|(\.\.\/)+)([^'"\/]+)['"]/g,
    (match, dots, moduleName) => {
      // If it's a relative import (starts with ./ or ../), adjust the path
      if (dots) {
        const depth = (dots.match(/\.\.\//g) || []).length;
        const newPath = '../'.repeat(depth + 1) + moduleName;
        return `from '${newPath}'`;
      }
      return match;
    }
  );
  
  fs.writeFileSync(filePath, updatedContent, 'utf8');
  console.log(`Updated imports in ${filePath}`);
}

// Find all test files and update their imports
function updateAllTestImports() {
  const testDir = path.join(__dirname, '__tests__');
  
  function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    
    files.forEach(file => {
      const fullPath = path.join(directory, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        processDirectory(fullPath);
      } else if (file.endsWith('.test.ts')) {
        updateImports(fullPath);
      }
    });
  }
  
  processDirectory(testDir);
}

// Run the updater
updateAllTestImports();
console.log('All test imports have been updated!');
