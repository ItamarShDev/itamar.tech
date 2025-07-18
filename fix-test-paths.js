const fs = require('node:fs');
const path = require('node:path');

// Function to update import paths in a file
function updateTestFileImports(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Calculate the relative path from the test file to the lib directory
    const relativePathToLib = path.relative(
      path.dirname(filePath), 
      path.join(process.cwd(), 'lib')
    ).replace(/\\/g, '/'); // Ensure forward slashes for imports
    
    // Update imports to use the correct relative paths
    const updatedContent = content
      // Update imports to use the correct path to lib
      .replace(
        /from ['"]lib\/([^'"]+)['"]/g, 
        (match, modulePath) => {
          return `from '${relativePathToLib}/${modulePath}'`;
        }
      );
    
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`✅ Updated imports in ${path.relative(process.cwd(), filePath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

// Find all test files and update their imports
function updateAllTestImports() {
  const testDir = path.join(process.cwd(), '__tests__');
  let successCount = 0;
  let errorCount = 0;
  
  function processDirectory(directory) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      
      if (entry.isDirectory()) {
        processDirectory(fullPath);
      } else if (entry.name.endsWith('.test.ts')) {
        const success = updateTestFileImports(fullPath);
        if (success) successCount++;
        else errorCount++;
      }
    }
  }
  
  processDirectory(testDir);
  console.log(`\n✅ Successfully updated ${successCount} test files`);
  if (errorCount > 0) {
    console.error(`❌ Failed to update ${errorCount} test files`);
  }
}

// Run the updater
updateAllTestImports();
