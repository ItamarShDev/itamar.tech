const fs = require('node:fs');
const path = require('node:path');

// Function to update import paths in a file
function updateTestFileImports(filePath) {
  const relativePath = path.relative(path.dirname(filePath), path.join(process.cwd(), 'lib'));
  const relativeImportPath = relativePath ? `${relativePath}/` : '';
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Update relative imports to use absolute paths from the lib directory
  const updatedContent = content.replace(
    /from ['"](?:\.\/|(\.\.\/)+)([^'"\/]+)['"]/g,
    (match, dots, moduleName) => {
      // Skip node_modules imports
      if (match.includes('node_modules')) {
        return match;
      }
      return `from 'lib/${moduleName}'`;
    }
  );
  
  fs.writeFileSync(filePath, updatedContent, 'utf8');
  console.log(`Updated imports in ${filePath}`);
}

// Find all test files and update their imports
function updateAllTestImports() {
  const testDir = path.join(process.cwd(), '__tests__');
  
  function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
      const fullPath = path.join(directory, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        processDirectory(fullPath);
      } else if (file.endsWith('.test.ts')) {
        updateTestFileImports(fullPath);
      }
    }
  }
  
  processDirectory(testDir);
  console.log('All test import paths have been updated!');
}

// Run the updater
updateAllTestImports();
