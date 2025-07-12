# Test IDs Documentation

This document outlines all the test IDs used in the application for end-to-end testing with Playwright.

## Naming Convention

- Use `data-testid` attribute for all test selectors
- Follow the pattern: `[component]-[element]-[purpose]`
- Use kebab-case for consistency
- Be descriptive but concise

## Test IDs by Component

### Proxy State Example

#### ComputedStateExample
- `computed-state-example` - Main container for the example
- `example-title` - Title of the example
- `explanation-section` - Section containing the explanation text
- `input-container` - Container for all input fields
- `name-input-container` - Container for the name input field
- `first-number-container` - Container for the first number input
- `second-number-container` - Container for the second number input

#### Input Component
- `input-name` - Name input field
- `input-firstNumber` - First number input field
- `input-secondNumber` - Second number input field

#### Result Component
- `result-display` - Container for the result display
- `result-value` - The numeric result value

## Best Practices

1. **Use test IDs instead of text or CSS selectors** when possible for more reliable tests
2. **Keep test IDs stable** - Don't change them without updating the tests
3. **Be specific** - Make sure each test ID uniquely identifies its element
4. **Document all test IDs** in this file when adding new ones

## Example Test

```typescript
test('should update result when numbers change', async ({ page }) => {
  await page.goto('/en/example-projects/proxy-state');
  
  // Get input fields
  const firstInput = page.getByTestId('input-firstNumber');
  const secondInput = page.getByTestId('input-secondNumber');
  const result = page.getByTestId('result-value');

  // Test initial state
  await expect(result).toHaveText('1');

  // Update values and test
  await firstInput.fill('5');
  await expect(result).toHaveText('6');

  await secondInput.fill('10');
  await expect(result).toHaveText('15');
});
```

## Adding New Test IDs

1. Add the `data-testid` attribute to the component
2. Document the new test ID in this file
3. Update any affected tests
4. Ensure the test ID follows the naming convention
