#!/usr/bin/env node

/**
 * Simple test validation script
 * This script validates that the test infrastructure is properly set up
 * and that the website is accessible before running full E2E tests.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const baseUrl = 'http://localhost:3000';
const testPaths = [
  '/en',
  '/he', 
  '/en/blog',
  '/en/resume',
  '/en/example-projects'
];

async function checkUrl(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          hasTitle: data.includes('<title>'),
          hasNav: data.includes('<nav'),
          hasH1: data.includes('<h1'),
          dataLength: data.length
        });
      });
    });
    
    req.on('error', (err) => {
      reject({ url, error: err.message });
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      reject({ url, error: 'Timeout' });
    });
  });
}

async function validateTestSetup() {
  console.log('🧪 Validating E2E Test Setup...\n');
  
  // Check if test files exist
  const testDir = path.join(__dirname, 'e2e');
  if (!fs.existsSync(testDir)) {
    console.log('❌ E2E test directory not found');
    return false;
  }
  
  const testFiles = fs.readdirSync(testDir).filter(f => f.endsWith('.spec.ts'));
  console.log(`✅ Found ${testFiles.length} test files:`);
  testFiles.forEach(file => console.log(`   - ${file}`));
  console.log('');
  
  // Check if config files exist
  const configFiles = ['playwright.config.ts', 'vitest.config.ts'];
  configFiles.forEach(file => {
    if (fs.existsSync(path.join(__dirname, file))) {
      console.log(`✅ ${file} exists`);
    } else {
      console.log(`❌ ${file} missing`);
    }
  });
  console.log('');
  
  return true;
}

async function testWebsiteAccessibility() {
  console.log('🌐 Testing website accessibility...\n');
  
  for (const testPath of testPaths) {
    const url = `${baseUrl}${testPath}`;
    try {
      const result = await checkUrl(url);
      console.log(`✅ ${url}`);
      console.log(`   Status: ${result.status}`);
      console.log(`   Has title: ${result.hasTitle}`);
      console.log(`   Has navigation: ${result.hasNav}`);
      console.log(`   Has heading: ${result.hasH1}`);
      console.log(`   Response size: ${result.dataLength} bytes`);
      console.log('');
    } catch (error) {
      console.log(`❌ ${url}`);
      console.log(`   Error: ${error.error}`);
      console.log('');
    }
  }
}

async function main() {
  console.log('E2E Test Infrastructure Validation\n');
  console.log('=====================================\n');
  
  const setupValid = await validateTestSetup();
  if (!setupValid) {
    console.log('❌ Test setup validation failed');
    process.exit(1);
  }
  
  await testWebsiteAccessibility();
  
  console.log('🎉 Test infrastructure validation complete!');
  console.log('\nTo run actual E2E tests:');
  console.log('  npm run test:e2e');
  console.log('\nTo run with UI:');
  console.log('  npm run test:e2e:ui');
}

if (require.main === module) {
  main().catch(console.error);
}