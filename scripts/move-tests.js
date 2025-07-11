const fs = require('fs');
const path = require('path');

// Define source directories with test files
const sourceDirs = [
  'lib/utils/__tests__',
  'lib/hooks/__tests__'
];

// Process each source directory
sourceDirs.forEach(sourceDir => {
  const fullSourcePath = path.join(process.cwd(), sourceDir);
  
  // Get all test files
  const testFiles = fs.readdirSync(fullSourcePath)
    .filter(file => file.endsWith('.test.ts') || file.endsWith('.test.tsx'));

  // Determine target directory (one level up from __tests__)
  const targetDir = path.dirname(sourceDir);
  const fullTargetPath = path.join(process.cwd(), targetDir);

  // Move each test file
  testFiles.forEach(testFile => {
    const sourceFile = path.join(fullSourcePath, testFile);
    const targetFile = path.join(fullTargetPath, testFile);
    
    // Check if target file already exists
    if (fs.existsSync(targetFile)) {
      console.log(`Skipping ${testFile} - already exists in target directory`);
      return;
    }

    // Move the file
    fs.renameSync(sourceFile, targetFile);
    console.log(`Moved ${testFile} to ${targetDir}/`);
  });

  // Remove the __tests__ directory if it's empty
  try {
    const remainingFiles = fs.readdirSync(fullSourcePath);
    if (remainingFiles.length === 0) {
      fs.rmdirSync(fullSourcePath);
      console.log(`Removed empty directory: ${sourceDir}`);
    }
  } catch (err) {
    console.error(`Error removing directory ${sourceDir}:`, err.message);
  }
});

console.log('Done moving test files!');
