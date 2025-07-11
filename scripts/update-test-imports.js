const fs = require('fs');
const path = require('path');

// Define test files and their import updates
const testFiles = [
  { 
    path: 'lib/utils/array.test.ts',
    imports: [
      { from: '"../array"', to: '"./array"' }
    ]
  },
  { 
    path: 'lib/utils/chart-settings.test.ts',
    imports: [
      { from: '"../chart"', to: '"./chart"' },
      { from: '"../chart-settings"', to: '"./chart-settings"' }
    ]
  },
  { 
    path: 'lib/utils/chart.test.ts',
    imports: [
      { from: '"../chart"', to: '"./chart"' }
    ]
  },
  { 
    path: 'lib/utils/color.test.ts',
    imports: [
      { from: '"../color"', to: '"./color"' }
    ]
  },
  { 
    path: 'lib/utils/job.test.ts',
    imports: [
      { from: '"../job"', to: '"./job"' },
      { from: '"../job-utils"', to: '"./job-utils"' }
    ]
  },
  { 
    path: 'lib/utils/match.test.ts',
    imports: [
      { from: '"../match"', to: '"./match"' }
    ]
  },
  { 
    path: 'lib/utils/quote.test.ts',
    imports: [
      { from: '"../quote"', to: '"./quote"' }
    ]
  },
  { 
    path: 'lib/utils/routing.test.ts',
    imports: [
      { from: '"../routing"', to: '"./routing"' }
    ]
  },
  { 
    path: 'lib/utils/tags.test.ts',
    imports: [
      { from: '"../tags"', to: '"./tags"' }
    ]
  },
  { 
    path: 'lib/utils/theme.test.ts',
    imports: [
      { from: '"../theme"', to: '"./theme"' }
    ]
  },
  { 
    path: 'lib/hooks/useRandomEmoji.test.ts',
    imports: [
      { from: '"../useRandomEmoji"', to: '"./useRandomEmoji"' }
    ]
  }
];

// Process each test file
testFiles.forEach(({ path: filePath, imports }) => {
  const fullPath = path.join(process.cwd(), filePath);
  
  try {
    // Read the file content
    let content = fs.readFileSync(fullPath, 'utf8');
    let updated = false;
    
    // Update each import
    imports.forEach(({ from, to }) => {
      if (content.includes(from)) {
        content = content.replace(new RegExp(from, 'g'), to);
        updated = true;
      }
    });
    
    // Write the updated content back to the file
    if (updated) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Updated imports in ${filePath}`);
    } else {
      console.log(`No imports to update in ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
});

console.log('Done updating test imports!');
