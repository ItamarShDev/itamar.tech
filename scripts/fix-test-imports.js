const fs = require('fs');
const path = require('path');

// Define test files and their import updates
const testFiles = [
  'lib/utils/array.test.ts',
  'lib/utils/chart-settings.test.ts',
  'lib/utils/chart.test.ts',
  'lib/utils/color.test.ts',
  'lib/utils/job.test.ts',
  'lib/utils/match.test.ts',
  'lib/utils/quote.test.ts',
  'lib/utils/routing.test.ts',
  'lib/utils/tags.test.ts',
  'lib/utils/theme.test.ts',
  'lib/hooks/useRandomEmoji.test.ts'
];

// Process each test file
testFiles.forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);
  
  try {
    // Read the file content
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Update import paths
    // This regex looks for imports from parent directory (../) and replaces them with current directory (./)
    const updatedContent = content.replace(
      /from ['"]\.\.\/([^'"]+)['"]/g, 
      (match, p1) => `from './${p1}'`
    );
    
    // Write the updated content back to the file
    if (content !== updatedContent) {
      fs.writeFileSync(fullPath, updatedContent, 'utf8');
      console.log(`Updated imports in ${filePath}`);
    } else {
      console.log(`No imports to update in ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
});

console.log('Done fixing test imports!');
